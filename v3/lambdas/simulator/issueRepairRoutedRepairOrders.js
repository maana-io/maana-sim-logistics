'use strict'
const { state, repairOrders } = input 

const canCancel = (status) => status.id === "Pending" || status.id === "InTransit";

function findVehicle( id ) {
    console.log( `searching for vehicle ${id}`)
    return state.vehicles.find( x => x.id === id )
}

function applyOrder( repairOrder ) {
    const oldOrders = state.transferOrders || []
    const vehicle = findVehicle(repairOrder.vehicle)
    if (repairOrder.status.id !== "Repair" || !vehicle ) {
        repairOrder.status.id = "Cancelled"
        oldOrders.push(repairOrder)
    } else {
      const oldOrder = vehicle.transitOrder
      const oldStatus = oldOrder.status;
      const isAtDest = oldOrder.waypoints.length === 0 || (
        oldOrder.waypoints.length === 1 &&  oldOrder.waypoints[0].x === vehicle.x && oldOrder.waypoints[0].y === vehicle.y);
      if (canCancel(oldStatus) ) {
        oldOrder.status.id = "Cancelled"
      }
      if (isAtDest) {
        oldOrder.status.id = "Arrived"
        oldOrder.visited = [... oldOrder.visited, ... oldOrder.waypoints ]
        oldOrder.waypoints = []
      };
      oldOrders.push(oldOrder)
    }
    vehicle.transitOrder = repairOrder;
    state.transitOrders = oldOrders  
        
}

repairOrders.forEach( applyOrder )
return state



