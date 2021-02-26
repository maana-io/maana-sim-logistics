const { create, all } = require("mathjs");

// --- inputs

const { vehicle } = input;
const { transitOrder } = vehicle;

// --- seed the RNG for consistent simulation behavior

const config = { randomSeed: vehicle.steps };
const math = create(all, config);

const epsilon = 0.05;

// --- prepare updates (returns)

const vehicleUpdate = {
  ...vehicle,
  type: vehicle.type.id,
  cargo: vehicle.cargo.map((x) => x.id),
  transitOrder: transitOrder.id,
  steps: vehicle.steps + 1,
};

const oldOrderUpdate = { ...transitOrder, status: transitOrder.status.id };

// --- math helpers

const magnitude = (x, y) => Math.sqrt(x * x + y * y);

const normalize = (x, y) => {
  const mag = magnitude(x, y);
  return { x: x / mag, y: y / mag };
};

const absMin = (a, b) => (Math.abs(a) > Math.abs(b) ? b : a);

// --- vehicle helpers

const move = (x, y, deltaX, deltaY, speed) => {
  const dir = normalize(deltaX, deltaY);
  const stepX = dir.x * speed;
  const stepY = dir.y * speed;
  return {
    x: x + absMin(stepX, deltaX),
    y: y + absMin(stepY, deltaY),
  };
};

const atDest = (x, y, destX, destY) => x == destX && y == destY;

const nearDest = (deltaX, deltaY) =>
  Math.abs(deltaX) < epsilon && Math.abs(deltaY) < epsilon;

const moveVehicle = (vehicle, destX, destY) => {
  const deltaX = destX - vehicle.x;
  const deltaY = destY - vehicle.y;
  if (nearDest(deltaX, deltaY)) {
    vehicle.x = destX;
    vehicle.y = destY;
  } else {
    const pos = move(vehicle.x, vehicle.y, deltaX, deltaY, vehicle.speed);
    vehicle.x = pos.x;
    vehicle.y = pos.y;
  }
};

// breakdown, accident, bad weather, ...
const isVehicleDisabled = (vehicle) => {
  const {
    reliability,
    durability,
    steps,
    lastServiceStep,
    serviceInterval,
  } = vehicle;

  const rand = math.random();

  const stepsSinceService = steps - lastServiceStep;
  const duty = Math.min(1, stepsSinceService / serviceInterval);
  const serviceNeed = 1 - (1 - durability) * duty;

  return rand > serviceNeed || rand > reliability;
};

// --- main logic

if (oldOrderUpdate.status === "Pending") {
  oldOrderUpdate.status = "InTransit";
}

if (oldOrderUpdate.status === "InTransit") {
  oldOrderUpdate.steps = oldOrderUpdate.steps + 1;

  // chance of vehicle becoming disabled
  if (isVehicleDisabled(vehicleUpdate)) {
    oldOrderUpdate.status = "Disabled";
  } else {
    // move the vehicle toward destination
    moveVehicle(vehicleUpdate, oldOrderUpdate.destX, oldOrderUpdate.destY);
    if (
      atDest(
        vehicleUpdate.x,
        vehicleUpdate.y,
        oldOrderUpdate.destX,
        oldOrderUpdate.destY
      )
    ) {
      oldOrderUpdate.status = "Arrived";
    }
  }
} else if (oldOrderUpdate.status === "Repair") {
  oldOrderUpdate.steps = oldOrderUpdate.steps + 1;

  // move the vehicle toward the repair location (hub)
  if (
    !atDest(
      vehicleUpdate.x,
      vehicleUpdate.y,
      oldOrderUpdate.destX,
      oldOrderUpdate.destY
    )
  ) {
    moveVehicle(vehicleUpdate, oldOrderUpdate.destX, oldOrderUpdate.destY);
  } else {
    // repair progress
    oldOrderUpdate.status = "Arrived";
  }
}

return {
  id: vehicle.id,
  vehicleUpdate,
  oldOrderUpdate,
};
