'use strict'
/** This function performs several checks of the input data to ensure that the
 * current function is a valid persister for kind data.
 * @param args - a list of args for the persister function. The
 * function is only considered a persister when there is exactly one argument,
 * and that argument is either an input kind or a list of input kinds.
 * @param kindMap - a map object from kind name to kind definition. T
 * @returns On success this function returns nothing, otherwise it throws an
 * error that can be trapped by the caller.
 */
function sanityCheck(args, kindMap) {
	if (args.length != 1) {
		throw new Error('Could not persist. Wrong number of inputs')
	}
	const arg = args[0]
	if (kindMap[arg.kind] == null) {
		throw new Error(`Could not persist. Argument ${arg.name} is not a kind`)
	}
	if (!arg.kind.endsWith('Input')) {
		throw new Error(`Argument ${arg.name} is not an input kind`)
	}
	console.log('Passed the sanity checks')
}
/** Aggregate the instances of each of the kind valued fields into an
 * instance map. The instance map is a two tiered map where the keys of the
 * first tier are the kind names that are in scope for this function, and the
 * second tier are instances, keyed by their identifiers. The map is
 * initialized with an empty list of instances for each kind.
 * @param args - the list of args this persister function
 * @param kindMap - A map object which has as keys the names of kinds that are
 * in scope, and has as values the definitions of those kinds.
 * @param input - the input that was provided to this persister by the calling
 * function.
 *
 * This function performs a depth first traversal of the kind valued args
 * of the data being persisted, adding each distinct instance to the instanceMap.
 * If the instance data contains duplicates, only the first occurrence is added
 * to the instance map. */
function aggregateInstances(args, kindMap, input) {
	const arg = args[0]
	const argval = input[arg.name]
	// initialize the map
	const instanceMap = Object.fromEntries(
		Object.keys(kindMap).map((k) => [k, {}])
	)
	// create a queue of instances to process
	var queue = arg.modifiers.includes('LIST')
		? argval.map((x) => [arg.kind, x])
		: [[arg.kind, argval]]
	// perform the traversal
	do {
		// dequeue the first element, getting the kindname and value
		const [kindname, v] = queue.shift()
		const kind = kindMap[kindname]
		// if the instance has not already been collected, then proceed
		if (instanceMap[kindname] && !instanceMap[kindname][v.id]) {
			// for each field of this value that is kind valued, we will
			// need to replace the values with their ids, and queue those
			// instances for processing.
			var instance = { ...v }
			const kindvaluefields = kind.fields.filter((z) => kindMap[z.kind] != null)
			for (const fld of kindvaluefields) {
				// if the value of the field is not null than we have work
				// to do, otherwise, we can skip to the next field.
				if (v[fld.name] != null) {
					// if the field is a list, then we need to queue each
					// non-null instance in the list.
					if (fld.modifiers.includes('LIST')) {
						const nonnulls = v[fld.name].filter((z) => z != null)
						queue.push(...nonnulls.map((z) => [fld.kind, z]))
						instance[fld.name] = [...new Set(nonnulls.map((z) => z.id))]
						// otherwise, if the field is not a list, we need to
						// queue the instance
					} else {
						queue.push([fld.kind, v[fld.name]])
						instance[fld.name] = v[fld.name].id
					}
				}
			}
			// add the flattened version of the current instance to the instance map.
			instanceMap[kindname][v.id] = instance
		}
	} while (queue.length > 0)
	return instanceMap
}
/** Persist the instances of a single kind. This function performs the call
 * to the underlying crud operations to add all the given instances to a kind.
 * @param ckg - the ckg interface to use for asynchronously writing the instances
 * @param kindName - the name of the kind being written
 * @param svcRef - the service in which the kind is defined
 * @param instances - a list of instances to be written to the kind
 * @returns - a list (possibly empty) of errors encountered when writing the
 * instances */
async function persistKindInstances(ckg, kindName, svcRef, instances) {
	const baseKindName = kindName.slice(0, -5)
	// if there are no instances, then shortcut. No call to ckg is required.
	if (!instances || instances.length === 0) {
		console.log(`skipping call to Add${baseKindName}s. No instances to add.`)
		return []
	}
	// construct the query and args to be passed to ckg.

	const query = `mutation persist($input: [Add${baseKindName}Input!]!) { add${baseKindName}s(input: $input) }`
	const args = {
		svcRef,
		query,
		variables: { input: instances },
	}
	// return the call to ckg
	console.log(
		`Calling Add${baseKindName}s with ${instances.length} distinct instances`
	)
	return ckg(args).catch((err) => ({ errors: [err.message] }))
}
/** Asynchronously persist all the instances of each of the kinds that occur
 * in the structured data. At most one call to the underlying crud operation
 * will be performed for each kind.
 * @param input - the input that was provided to this persister
 * @param instanceMap - the instance map constructed by the aggregate instances
 * function
 * @returns A list of errors that occurred during persisting the instances
 * */
async function persistAllInstances(input, instanceMap) {
	const promises = Object.entries(instanceMap).map(([kindName, innerMap]) =>
		persistKindInstances(
			input.__requestCkg,
			kindName,
			input.__ownerSvcRef,
			Object.values(innerMap)
		)
	)
	return Promise.all(promises).then((results) => {
		const errors = results.map((res) =>
			res && res.errors != null ? res.errors : []
		)
		return errors.reduce((x, z) => x.concat(z))
	})
}
/** The entry point for persisting the provided instances. This function
 * performs the sanity checks, aggregates the instances and then calls the
 * persisters by invoking the functions defined above.
 * @input - the input provided to the persister function.
 * @returns a list of the identifiers for each instance of the "top level"
 * kind.
 * @throws If any errors are encountered in the sanity checking, aggregation
 * or persistence, this function will throw an error containing the details.
 * The error message can be viewed in the result payload of the graphql call.
 */
async function main(input) {
	// destructure the input and initialize the kindMap
	const { __lambda } = input
	const { input: args, kinds } = __lambda
	const kindMap = Object.fromEntries(kinds.map((x) => [x.name, x]))
	console.log(`Found ${Object.keys(kindMap).length} kinds in scope`)

	// perform the sanity checks
	sanityCheck(args, kindMap)
	// shortcut if no instances are provided.
	const rawInstances = input[args[0].name]
	if (
		!rawInstances ||
		(Array.isArray(rawInstances) && rawInstances.length === 0)
	) {
		console.log('Exiting because nothing was provided to persist')
		return null
	}
	//construct the instance map.
	const instanceMap = aggregateInstances(args, kindMap, input)
	console.log(
		Object.entries(instanceMap)
			.map(
				([k, vs]) =>
					`Found ${Object.values(vs).length} distinct instances of kind ${k}.`
			)
			.join('')
	)
	// shortcut if there are no instance of the "top level" kind. This can
	// occur if the input is an empty list.
	if (!Object.values(instanceMap[args[0].kind])) {
		console.log(
			'Exiting because the instance map contained no instances for the top level kind'
		)
		return null
	}
	return persistAllInstances(input, instanceMap)
		.then((result) => {
			if (result && result.length === 0) {
				// when there are no errors generated, then return the list of
				// identifiers for the instances of the top level kind.
				console.log(`successfully persisted the instances`)
				const ret = Object.values(instanceMap[args[0].kind]).map(
					(z) => z.id
				)
				console.log(ret)
				return input.__lambda.outputModifiers.includes('LIST') ? ret : ret[0]
			}
			//Otherwise, return the error messages from the call
			else console.log(`failed to persist instances.`)
			return Promise.reject(JSON.stringify(result, null, 2))
		})
		.catch((e) => {
			// if any errors occurred, then raise them to the caller.
			throw new Error(`Some write operations failed. DETAILS: ${e}`)
		})
}
return main(input)
