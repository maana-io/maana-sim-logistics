const { hubs, sim } = input;

const newHubs = hubs.map((x) => ({
  ...x,
  id: `${sim}/${x.id}`,
  sim,
  type: x.type.id,
  vehicleType: x.vehicleType.id,
  supplies: x.supplies.map((x) => x.id),
}));

return newHubs;
