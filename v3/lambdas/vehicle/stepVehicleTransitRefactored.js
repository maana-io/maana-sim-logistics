'use strict'
const { create, all } = require("mathjs");

// --- inputs

const { vehicle } = input;
const { transitOrder, fuel } = vehicle;



// --- prepare updates (returns)
vehicle.steps = vehicle.steps + 1


if ( !transitOrder  ) return vehicle
if ( fuel.quantity === 0 && transitOrder.status.id !== "Repair") {
  transitOrder.status.id = "Disabled"
  return vehicle
}

// --- seed the RNG for consistent simulation behavior

const config = { randomSeed: vehicle.steps };
const math = create(all, config);

const epsilon = 0.05;

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

const moveVehicle = (destX, destY) => {
  const deltaX = destX - vehicle.x;
  const deltaY = destY - vehicle.y;
  if (nearDest(deltaX, deltaY)) {
    vehicle.x = destX;
    vehicle.y = destY;
  } else {
    const efficiency = vehicle.efficiency
    const speed = vehicle.speed
    const fuelRequired = fuel ? speed/efficiency : 1
    const fuelRemaining = fuel ? fuel.quantity : 100

    const dist = (fuelRemaining > fuelRequired ) ? speed : speed * fuelRemaining / fuelRequired

    const pos = move(vehicle.x, vehicle.y, deltaX, deltaY, dist);
    vehicle.x = pos.x;
    vehicle.y = pos.y;
    if (fuel) {
      fuel.quantity = fuel.quantity - fuelRequired
    }
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

if (transitOrder.status.id === "Pending") {
  transitOrder.status.id = "InTransit";
}

if (transitOrder.status.id === "InTransit") {
  transitOrder.steps = transitOrder.steps + 1;

  // chance of vehicle becoming disabled
  if (isVehicleDisabled(vehicle)) {
    transitOrder.status.id = "Disabled";
  } else {
    // move the vehicle toward destination
    moveVehicle( transitOrder.destX, transitOrder.destY);
    if (
      atDest(
        vehicle.x,
        vehicle.y,
        transitOrder.destX,
        transitOrder.destY
      )
    ) {
      transitOrder.status.id = "Arrived";
    }
  }
} else if (transitOrder.status.id === "Repair") {
  transitOrder.steps = transitOrder.steps + 1;

  // move the vehicle toward the repair location (hub)
  if (
    !atDest(
      vehicle.x,
      vehicle.y,
      transitOrder.destX,
      transitOrder.destY
    )
  ) {
    moveVehicle(transitOrder.destX, transitOrder.destY);
  } else {
    // repair progress
    transitOrder.status.id = "Disabled";
  }
}
return vehicle