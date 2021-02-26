const { hubs, sim } = input;

return hubs.map((x) => ({
  id: x.id,
  hub: x,
  sim: sim,
}));
