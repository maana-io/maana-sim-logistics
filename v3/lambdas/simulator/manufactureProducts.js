const { state } = input 

// This helper function ensures that if two instances of a resource have the same 
  // ID, that they are the same object.   This allows us to mutate things more easily.
  function UnifyResourceReferences(state) {
    const { cities, producers, hubs } = state;
    const allResources = {}
    const findOrAdd = (x => {
        if (!(x.id in allResources)) allResources[x.id] = x
        return allResources[x.id]
    })
    cities.forEach( city => { 
        city.demand = city.demand.map( findOrAdd ) 
    })
    producers.forEach( producer => { 
        producer.products = producer.products.map( findOrAdd )
        producer.material = producer.material.map( findOrAdd )
    })
    hubs.forEach( hub => { 
        hub.supplies = hub.supplies.map( findOrAdd ) 
    })
  }
  UnifyResourceReferences(state)


function stepOneProducer( producer ) {
    const { material, products } = producer;
    
    producer.steps = producer.steps + 1
    // Sanity checks
    const hasEnoughMaterials = material.every( x => x.quantity >= x.consumptionRate )
    const hasEnoughCapacity  = products.every( x => x.capacity >= x.quantity + x.replenishRate )

    // atomically update the materials and products
    if ( hasEnoughMaterials && hasEnoughCapacity ) {
        material.forEach( x => {
            x.quantity = x.quantity - x.consumptionRate
        })
        products.forEach( x => {
          x.quantity = x.quantity + x.replenishRate
        })
    }
    return producer
}

state.producers = state.producers.map( stepOneProducer )
return state 