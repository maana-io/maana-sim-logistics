const { vehicle, newOrder } = input;
const { transitOrder: oldOrder } = vehicle;

// --- prepare updates

const vehicleUpdate = {
  ...vehicle,
  cargo: vehicle.cargo.map((x) => x.id),
  type: vehicle.type.id,
  transitOrder: vehicle.transitOrder.id,
};

const oldOrderUpdate = {
  ...oldOrder,
  status: oldOrder.status.id,
};

const newOrderUpdate = { ...newOrder };

// --- convenience vars

const oldStatus = oldOrder.status.id;
const newStatus = newOrder.status;
const isAtDest =
  oldOrder.destX === newOrder.destX && oldOrder.destY === newOrder.destY;

// --- helpers

const canCancel = (status) => status === "Pending" || status === "InTransit";
const canRepair = (status) =>
  status === "Disabled" ||
  status === "Idle" ||
  status === "Pending" ||
  status === "InTransit";
const canTransit = (status) =>
  status === "Idle" ||
  status === "Pending" ||
  status === "InTransit" ||
  status == "Arrived";

// --- state transitition logic

if (
  (newStatus === "Pending" && canTransit(oldStatus)) ||
  (newStatus === "Repair" && canRepair(oldStatus))
) {
  if (canCancel(oldStatus)) {
    oldOrderUpdate.status = isAtDest ? "Arrived" : "Cancelled";
  }
  vehicleUpdate.transitOrder = newOrder.id;
}

// ---

return {
  id: vehicle.id,
  vehicleUpdate,
  oldOrderUpdate,
  newOrderUpdate,
};
