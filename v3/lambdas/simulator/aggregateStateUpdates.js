'use strict'
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
function main(input) {
	// destructure the input and initialize the kindMap
	const { __lambda } = input
	const { input: args, kinds } = __lambda
	const kindMap = Object.fromEntries(kinds.map((x) => [x.name, x]))
	console.log(`Found ${Object.keys(kindMap).length} kinds in scope`)

	//construct the instance map.
	const instanceMap = aggregateInstances(args, kindMap, input)
	// shortcut if there are no instance of the "State" kind. This can
	// occur if the input is an empty list.
	if (!Object.values(instanceMap[args[0].kind])) {
		console.log(
			'Exiting because the instance map contained no instances for the top level kind'
		)
		return null
	}

    const sim = Object.values(instanceMap.SimulationInput)[0]
	var state = {... Object.values(instanceMap.StateInput )[0], id: sim.id, transitOrders: [] }
	state.resources = state.resources || []
	state.hubs = state.hubs || []
	state.transitOrders = state.transitOrders || [] 
	state.resourceTransfers = state.resourceTransfers || []

    //throw new Error(JSON.stringify(Object.entries(instanceMap).map( xy => { return [xy[0],Object.keys(xy[1]).length]})))
    const result = {
		id: input[args[0].name].id,
		simulation: sim ,
		cities: Object.values(instanceMap.CityInput) || [],
		producers: Object.values(instanceMap.ProducerInput) || [], 
		hubs: Object.values(instanceMap.HubInput) || [],
		vehicles: Object.values(instanceMap.VehicleInput) || [],
		resources: Object.values(instanceMap.ResourceInput) || [],
		transitOrders: Object.values(instanceMap.TransitOrderInput) || [],
		resourceTransfers: Object.values(instanceMap.ResourceTransferInput) || [],
        waypoints: Object.values(instanceMap.WaypointInput) || [],
		state: state
	}
    return result
}

return main(input)
