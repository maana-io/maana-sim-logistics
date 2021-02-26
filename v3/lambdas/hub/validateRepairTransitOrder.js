const { vehicle, hub, repairTransitOrder } = input;

const flattenTransitOrder = (transitOrder) => ({
  ...transitOrder,
  status: transitOrder.status.id,
});

if (vehicle.hub !== hub.id) {
  return flattenTransitOrder(vehicle.transitOrder);
}

return repairTransitOrder;
