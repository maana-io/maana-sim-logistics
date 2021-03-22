'use strict'
const { state } = input 
const { sim, vehicles, hubs } = state

/** Sometimes resources are drawn from a single pool (e.g. energy, warehouses) 
   * In order to ensure that the mutations performed in this function alter all 
   * the impacted objects, we need to ensure that there is only a single
   * resource instance for each identifier.   This function iterates over the 
   * resources in cities producers and hubs.   Any resource that occurs in
   * multiple places is replaced with a single instance so that mutations that
   * are performed in this lambda will act against that single pool.
  */
 function UnifyResourceReferences(state) {
    const { cities, producers, hubs } = state;
    const allResources = {}
    // Start by creating an object which maps resource identifiers to the single 
    // instance for that resource.
    cities.forEach( city => city.demand.forEach( x => allResources[x.id] = x ))
    producers.forEach( producer => { 
        producer.products.forEach( x => allResources[x.id] = x )
        producer.material.forEach( x => allResources[x.id] = x )
    })
    hubs.forEach( hub => { hub.supplies.forEach( x => allResources[x.id] = x ) })

    // Then perform a second traversal, replacing the instances that occur in the
    // cities, producers and hubs with the canonical instance.
    cities.forEach( city => { city.demand = city.demand.map( x => allResources[x.id]) })
    producers.forEach( producer => { 
        producer.products = producer.products.map( x => allResources[x.id])
        producer.material = producer.material.map( x => allResources[x.id] )
    })
    hubs.forEach( hub => { hub.supplies = hub.supplies.map( x => allResources[x.id])})
}
  UnifyResourceReferences(state)
// =========================================================
// HELPER FUNCTIONS
// =========================================================
const hubMap = Object.fromEntries(hubs.map( x => [x.id, x]))

// Find the hube belonging to a given vehicle
function findHub( vehicle ) { return hubMap[vehicle.hub] }

// find the the resource in the hub's supplies 
function findHubResource( hub, resourceTypeId ) {
  return hub.supplies.find( x => x.type.id === resourceTypeId )
}

// Test if a vehicle is at the hub
const isAtHub = (vehicle) => {
    const hub = findHub(vehicle)
    return hub!== null &&  hub.x === vehicle.x && hub.y === vehicle.y
}

function repairAndRefuel( vehicle ) {
    const hub = findHub(vehicle)
    const fuel = vehicle.fuel 
    const { transitOrder } = vehicle;

    // SANITY TESTS
    if (!transitOrder || !hub || !fuel ) return null
    
    // Check to see if service is required. exit if not.
    if (transitOrder.status.id !== "Disabled" && transitOrder.status.id !== "Arrived")
      return null

    const fuelTypeId = fuel.type.id
    const resource = findHubResource(hub, fuelTypeId )

    // If the hub does not have the required resource, then we can't repair.   Exit.
    if (!resource) return null 

    const quantity = fuel.capacity - fuel.quantity 
    const surcharge = (transitOrder.status.id === "Disabled") ? hub.repairSurcharge : 0
    const price = resource.adjustedPricePerUnit * quantity + surcharge

    if ( price > sim.balance || quantity > resource.quantity ) return null

    vehicle.lastServiceStep = sim.steps
    resource.quantity = resource.quantity - quantity 
    fuel.quantity = fuel.quantity + quantity 
    sim.expenses = sim.expenses + price 
    sim.balance = sim.balance - price
    transitOrder.status.id = "Idle"
    transitOrder.waypoints = []
    transitOrder.visited = []
    transitOrder.id = `${vehicle.id}/Idle`

    return {
        id: `${vehicle.id}/refuel#${new Date().valueOf()}`,
        sim: sim.id,
        transferType: { id: "Withdraw" },
        vehicle: vehicle.id,
        counterparty: hub.id,
        resourceType: { id: fuelTypeId},
        quantity,
        price,
        status: { id: "OK" }
    }
    
}

state.transfers = state.transfers.concat(vehicles.filter(isAtHub).map( repairAndRefuel ).filter( x => x!==null ))
return state
