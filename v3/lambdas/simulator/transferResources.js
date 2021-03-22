'use strict'

  const { state } = input
  const { vehicles, cities, producers, sim, transfers } = state;

  // Ensure that if two instances of a resource have the same ID, that they are the same
  // object.   This allows us to mutate things more easily.
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

  function evaluateTransfer( transfer, sim, city, producer, vehicle, hub ) {
  
      const transferType = transfer.transferType.id;
      const resourceType = transfer.resourceType.id;
      const counterpartyType = ( city ) ? "City" : ( producer ) ? "Producer" : hub ? "Hub" : null
  
      function error( reason ) {
          transfer.status.id = reason
          return transfer 
      };
  
      const counterparty = city || producer || hub
      if (!!!counterparty) {
          return error( "ErrCounterparty");
      }
  
      if (!!!vehicle) { 
          return error( "ErrVehicle");
      }
     
      if (counterparty.x !== vehicle.x || counterparty.y !== vehicle.y) { 
          return error( "ErrLocation");
      }
      
      if (counterpartyType === "City" && transferType !== "Deposit") {
          return error( "ErrTransferType");
      }
  
      let resources
      switch (counterpartyType) {
          case "Producer": resources = transferType === "Deposit" ? counterparty.material : counterparty.products; break
          case "Hub": resources = counterparty.supplies; break
          case "City": resources = counterparty.demand; brean
          default: resources = []
      }
  
      if ( !!!resources.length ) {
          return error("ErrResource")
      }
  
      const resource = resources.find( x => x.type.id === resourceType)
      const cargo = vehicle.cargo.find( x => x.type.id == resourceType );
  
      if (!resource || !cargo ) {
          return error( "ErrResource");
      }
  
      let source, target, availableCapacity;
  
      if (transferType === "Deposit") {
          source = cargo;
          target = resource;
          availableCapacity = target.capacity - target.quantity
      } else {
          source = resource;
          target = cargo;
          if (vehicle.cargoModeAND) {
              const utilization = vehicle.cargo.reduce((acc,v) => acc + v.quantity / v.capacity, 0)
              availableCapacity = Math.floor( target.capacity*(1-utilization) )
          } else {
              availableCapacity = vehicle.cargo.some( x => x.type.id !== resourceType  && x.quantity > 0 )
                ? 0
                : target.capacity - target.quantity
          }
      }
      
      
  
      if (availableCapacity < transfer.quantity) { 
          return error( "ErrCapacity");
      }
      if (source.quantity < transfer.quantity) { 
          return error( "ErrQuantity");
      }
      
      let price
      if ( transferType === "Deposit") {
          price = target.adjustedPricePerUnit * transfer.quantity;
          sim.income = sim.income + price;
          sim.balance = sim.balance + price;
      } else {
          price = source.adjustedPricePerUnit * transfer.quantity;
          if (price > sim.balance) {
              return error( "ErrFunds");
          }
          sim.expenses = sim.expenses + price;
          sim.balance = sim.balance - price;
      }
      transfer.price = price;
      source.quantity = source.quantity - transfer.quantity;
      target.quantity = target.quantity + transfer.quantity;
      transfer.status.id = "OK";
      return transfer
  }
  
  const pendingTransfers = ( transfers || []).filter( x => x.status.id = "Pending")
  
  state.transfers = pendingTransfers.map( transfer => {
      const city = cities.find( x => x.id == transfer.counterparty ) 
      const producer = producers.find( x => x.id == transfer.counterparty ) 
      const vehicle = vehicles.find( x => x.id == transfer.vehicle)
      return evaluateTransfer( transfer, sim, city, producer, vehicle)
  })
  
  return state
  