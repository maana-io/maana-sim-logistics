const {vehicle} = input;
return {
    id: vehicle.id,
    kind: vehicle.type.id,
    x: vehicle.x,
    y: vehicle.y,
    status: vehicle.transitOrder.status.id
}