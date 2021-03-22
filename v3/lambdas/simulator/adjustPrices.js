const { state } = input 
const { cities, producers, hubs } = state 

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

  // A function that adjusts the goods pricing for a given city.
  function updateCityPrices( city ) {
    city.demand.forEach( x => {
      if (x.quantity>0) {
        const scarcity = city.population / x.quantity;
        x.adjustedPricePerUnit = x.basePricePerUnit + scarcity * x.scarcitySurchargeFactor;
      }
    })
  }

  // Mutate the price for a hub's supplies
  function updateHubPrices( hub ) {
    hub.supplies.forEach( x => {
      const scarcity = 1 - x.quantity / x.capacity;
      x.adjustedPricePerUnit = x.basePricePerUnit + scarcity * x.scarcitySurchargeFactor;
    })
  }
  
  // Mutate the price for a producer's materials
  function updateProducerPrices( producer ) {
    const { products, material } = producer
    const hasAvaialbleCapacity = products.every( x => x.capacity >= x.quantity + x.replenishRate )
    const hasAvailableMatierials = material.every( x => x.quantity >= x.consumptionRate )
    const isStopped = !(hasAvaialbleCapacity && hasAvailableMatierials)
    
    if (!isStopped) {
      material.forEach( x => {
        const scarcity = 1 - x.quantity / x.capacity;
        x.adjustedPricePerUnit = x.basePricePerUnit + scarcity * x.scarcitySurchargeFactor
      })
      products.forEach( x => {
        const scarcity = x.quantity / x.capacity;
        x.adjustedPricePerUnit = x.basePricePerUnit + scarcity * x.scarcitySurchargeFactor
      })
    } else {
      material.forEach( x => {
        x.adjustedPricePerUnit = (1 + producer.stoppageSurchargeFactor) * x.adjustedPricePerUnit
      });
      products.forEach( x => {
        x.adjustedPricePerUnit = (1 + producer.stoppageSurchargeFactor) * x.adjustedPricePerUnit
      });
    }
  }

  hubs.forEach( updateHubPrices )
  producers.forEach( updateProducerPrices )
  cities.forEach( updateCityPrices ) // note: By placing cities last, the energy prices will be determined by cities!
  return state
