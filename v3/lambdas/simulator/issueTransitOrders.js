'use strict'


function makeTransitOrder( transitAction ) {
    const { vehicle, waypoints, status } = transitAction
    const path = waypoints.map( z => z.id ).join('-')
    return {
        ... transitAction, 
        id: `${vehicle}/${path}#${new Date().valueOf()}`,
        status: {id: "Pending"},
        visited: [],
        steps: 0,
    }
}


const canCancel = (status) => status.id === "Pending" || status.id === "InTransit";
const canRepair = (status) =>
  status.id === "Disabled" ||
  status.id === "Idle" ||
  status.id === "Pending" ||
  status.id === "InTransit";
const canTransit = (status) =>
  status.id === "Idle" ||
  status.id === "Pending" ||
  status.id === "InTransit" ||
  status.id === "Arrived";


function findVehicle( state, id ) {
    console.log( `searching for vehicle ${id}`)
    return state.vehicles.find( x => x.id === id )
}

function applyAction( state, transitAction ) {
    const vehicle = findVehicle(state, transitAction.vehicle)
    if (vehicle) {
        console.log("FOUND VEHICLE")
        const newOrder = makeTransitOrder( transitAction)
        const oldOrder = vehicle.transitOrder
        const oldStatus = oldOrder.status;
        const newStatus = newOrder.status;
        const isAtDest = (oldOrder.waypoints.length === 0 ) || ( oldOrder.waypoints.length === 1 && oldOrder.waypoints[0].x === vehicle.x && oldOrder.waypoints[0].y === vehicle.y);
        const oldOrders = state.transferOrders || []
        if (
            (newStatus.id === "Pending" && canTransit(oldStatus)) ||
            (newStatus.id === "Repair" && canRepair(oldStatus))
          ) {
              state.transitOrders = state.transitOrders == null ? [] : state.transitOrders
            if (canCancel(oldStatus) ) {
              oldOrder.status.id = "Cancelled"
              if (isAtDest) {
                oldOrder.status.id = "Arrived"
                oldOrder.visted = [ ... oldOrder.visited, ... oldOrder.waypoints ]
                oldOrder.waypoints = []
              }
              oldOrders.push(oldOrder)
            }
            vehicle.transitOrder = newOrder;
          }
        state.transitOrders = oldOrders  

    }    
}

function main(state, transitActions) {
    transitActions.forEach( x => applyAction( state, x) )
    return state
}

return main(input.state, input.transitActions)



