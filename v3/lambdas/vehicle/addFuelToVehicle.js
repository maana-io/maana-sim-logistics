const { vehicle } = input

vehicle.cargo = vehicle.cargo.map( x => x.id )
vehicle.type = vehicle.type.id
vehicle.fuel = `${vehicle.id}/fuel`
vehicle.transitOrder = (vehicle.transitOrder) ? vehicle.transitOrder.id :  "Idle"

return vehicle