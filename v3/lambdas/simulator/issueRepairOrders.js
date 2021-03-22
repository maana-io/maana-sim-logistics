'use strict'
const { state, repairActions } = input 

function makeTransitOrder( vehicle, destX, destY ) {
    return {
        id: `${vehicle.id}/${destX}/${destY}#${new Date().valueOf()}`,
        vehicle: vehicle.id,
        sim: state.sim.id,
        waypoints: [
          { id:`(${vehicle.x},${vehicle.y})`, x: vehicle.x, y: vehicle.y, order:1 },
          { id:`(${destX},${destY})`, x: destX, y: destY, order:1}],
        visited: [],
        status: {id: "Repair"},
        steps: 0,
    }
}


const canCancel = (status) => status.id === "Pending" || status.id === "InTransit";
const canRepair = (status) =>
  status.id === "Disabled" ||
  status.id === "Idle" ||
  status.id === "Pending" ||
  status.id === "InTransit";


function findVehicle( id ) {
    console.log( `searching for vehicle ${id}`)
    return state.vehicles.find( x => x.id === id )
}

function findHub( id ) {
    console.log( `searching for hub ${id}`)
    return state.hubs.find( x => x.id === id )
}

function applyAction( repairAction ) {
    //throw new Error(`UNEXPECTED REPAIR ACTION ${JSON.stringify(repairAction)}`)
    const vehicle = findVehicle(repairAction.vehicle)
    if (vehicle) {
        const hub     = findHub(vehicle.hub )
        if (hub) {
            const newOrder = makeTransitOrder( vehicle, hub.x, hub.y )
            const oldOrder = vehicle.transitOrder
            const oldStatus = oldOrder.status;
            const isAtDest = oldOrder.waypoints.length === 0 || (
                oldOrder.waypoints.length === 1 &&  oldOrder.waypoints[0].x === vehicle.x && oldOrder.waypoints[0].y === vehicle.y);
            const oldOrders = state.transferOrders || []
            if ( canRepair(oldStatus) )
             {
                state.transitOrders = state.transitOrders == null ? [] : state.transitOrders
                if (canCancel(oldStatus) ) {
                oldOrder.status.id = "Cancelled"
                if (isAtDest) {
                    oldOrder.status.id = "Arrived"
                    oldOrder.visited = [... oldOrder.visited, ... oldOrder.waypoints ]
                    oldOrder.waypoints = []
                };
                oldOrders.push(oldOrder)
                }
                vehicle.transitOrder = newOrder;
            }
            state.transitOrders = oldOrders  
        }
    }    
}

repairActions.forEach( applyAction )
return state



