'use strict'
const { state, repairActions } = input 

function makePayload( vehicle, destX, destY, canRepair ) {
    return {
        id: `${vehicle}/${destX}/${destY}#${new Date().valueOf()}`,
        vehicle: vehicle.id,
        vehicleType: vehicle.type.id,
        mapAndTiles: state.mapAndTiles,
        fromX: vehicle.x,
        fromY: vehicle.y,
        toX: destX,
        toY: destY,
        sim: state.sim.id,
        canRepair
    }
}

const canRepair = (status) =>
  status.id === "Disabled" ||
  status.id === "Idle" ||
  status.id === "Pending" ||
  status.id === "Arrived" ||
  status.id === "InTransit";


function findVehicle( id ) {
    console.log( `searching for vehicle ${id}`)
    return state.vehicles.find( x => x.id === id )
}

function findHub( id ) {
    console.log( `searching for hub ${id}`)
    return state.hubs.find( x => x.id === id )
}

function tryMakeOrder( repairAction ) {
    const vehicle = findVehicle(repairAction.vehicle)
    if (vehicle) {
        const oldStatus = vehicle.transitOrder.status;
        const hub     = findHub(vehicle.hub )
        if (hub) {
            return makePayload( vehicle, hub.x, hub.y, canRepair(oldStatus) )
        } else {
            return makePayload( vehicle, -1,-1, false )
        }
    } else {
        return {
        id: `unknownVehicle/unknownX/unknownY#${new Date().valueOf()}`,
        vehicle: "unknownVehicle",
        vehicleType: "Truck",
        mapAndTiles: state.mapAndTiles,
        fromX: -1,
        fromY: -1,
        toX: -10,
        toY: -10,
        sim: state.sim.id,
        canRepair: false
        }
    }
}

return  repairActions.map( tryMakeOrder )