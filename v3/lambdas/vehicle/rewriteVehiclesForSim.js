const { vehicles, sim } = input;

const newVehicles = vehicles.map((x) => ({
  ...x,
  id: `${sim}/${x.id}`,
  sim,
  hub: `${sim}/${x.hub}`,
  type: x.type.id,
  cargo: x.cargo.map((x) => x.id),
  transitOrder: x.transitOrder ? x.transitOrder.id : undefined,
  fuel: `${sim}/${x.fuel.id}`
}));

return newVehicles;
