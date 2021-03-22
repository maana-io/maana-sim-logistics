    /** This function simulates each city in current worldstate by one clock tick.
     * each city will consume resources, and adjust their population in response to
     * resource availability.
     */

    const { state } = input 
    const { cities } = state     

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

  // mutate the a city to reduce its population
  function decreasePopulation(city) {
    return Math.floor(
        city.population * (1 - city.populationDeclineRate ))
    }

  //mutate 
  function increasePopulation(city) {
  return Math.floor(
      city.population * ( 1 + city.populationGrowthRate )
  )
}

  //This function steps a single city forward by a single clock tick.   It will 
  //consume resources and adjust the population in response to scarcity.
  function stepCity( city ){    
    const { demand } = city;
    console.log(JSON.stringify(city.demand))
    const hasEnoughResources = demand.every( x => {
      const requestedQty = city.population * x.consumptionRate * ( x.type.id === "Energy" ? 0.01 : 1)
      return x.quantity >= requestedQty
    })
      
    if (hasEnoughResources) {
        city.demand.forEach( x => {

            x.quantity = x.quantity - city.population * x.consumptionRate * ( x.type.id === "Energy" ? 0.01 : 1)
        })
        city.population = increasePopulation(city)
        // Consume the resources and grow the population.
    } else {
        city.population = decreasePopulation(city)
    }
    city.steps = city.steps + 1
    return city
  }

  state.cities = cities.map(stepCity)
  return state

 