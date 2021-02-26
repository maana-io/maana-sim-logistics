const { depots, sim } = input;

return depots.map((x) => ({
  ...x,
  sim,
}));
