const { vehicle, newOrder } = input;

const vehicleUpdate = {
  ...vehicle,
  cargo: vehicle.cargo.map((x) => x.id),
  type: vehicle.type.id,
};

const currentOrder = vehicle.transitOrder;
const currentStatus = currentOrder.status.id;

if (
  currentStatus !== "Disabled" &&
  currentStatus !== "Repair" &&
  currentOrder.destX !== newOrder.destX &&
  currentOrder.destY !== newOrder.destY
) {
  vehicleUpdate.transitOrder = newOrder.id;
} else {
  vehicleUpdate.transitOrder = vehicle.transitOrder.id;
}

return vehicleUpdate;
