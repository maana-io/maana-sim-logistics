const { producers, sim } = input;

return producers.map((x) => ({
  ...x,
  sim,
}));
