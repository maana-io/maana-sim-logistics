const { hub } = input 

hub.repairSurcharge = 100
hub.type = hub.type.id 
hub.supplies = hub.supplies.map( x => x.id )
hub.vehicleType = hub.vehicleType.id
hub.steps = hub.steps || 0

return hub