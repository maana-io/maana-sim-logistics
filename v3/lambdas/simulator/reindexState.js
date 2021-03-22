const { state, scenario, name, agentEndpoint } = input 

const simId = `${name}:${scenario}:${agentEndpoint || "interactive"}`;

function prefix( id ) {
    return `${simId}/${id}`
}

function reindexSim( sim ) {
   return { ... sim, id: simId, name, agentEndpoint }
}

function reindexCity( city ) {
  return { ...city, id: prefix(city.id), demand: city.demand.map( reindexResource ), sim: simId }
}

function reindexProducer( producer ) {
  return { ...producer, 
    id: prefix(producer.id), 
    material: producer.material.map( reindexResource ), 
    products: producer.products.map( reindexResource ), 
    sim: simId 
  }
}

function reindexHub( hub ) {
    return { ...hub, 
        id: prefix(hub.id), 
        supplies: hub.supplies.map( reindexResource ), 
        sim: simId 
    }
}

function reindexVehicle( vehicle ) {
    return { ...vehicle, 
        id: prefix(vehicle.id), 
        cargo: vehicle.cargo.map( reindexResource ), 
        hub: prefix(vehicle.hub),
        transitOrder: reindexTransitOrder(vehicle.transitOrder),
        fuel: reindexResource(vehicle.fuel),
        sim: simId 
    }
}

function reindexResource( resource ) {
    return { ... resource,
        id: prefix(resource.id),
        sim: simId 
    }
}

function reindexResourceTransfer( resourceTransfer ) {
    return { ... resourceTransfer,
        id: prefix(resourceTransfer.id),
        vehicle: prefix(resourceTransfer.vehicle),
        counterparty: prefix(resourceTransfer.counterparty),
        sim: simId 
    }
}

function reindexTransitOrder( transitOrder ) {
    return { ... transitOrder,
        id: prefix(transitOrder.id),
        vehicle: prefix(transitOrder.vehicle),
        sim: simId
    }
}

return { ... state, 
    id: simId,
    sim: reindexSim(state.sim),
    cities: state.cities.map(reindexCity),
    producers: state.producers.map(reindexProducer),
    hubs: state.hubs.map(reindexHub),
    vehicles: state.vehicles.map(reindexVehicle),
    transfers: state.transfers.map(reindexResourceTransfer),
    transitOrders: state.transitOrders.map(reindexTransitOrder)
}
