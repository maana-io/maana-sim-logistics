const { resources, sim } = input;

return resources.map((x) => ({
  ...x,
  id: `${sim}:${x.id}`,
  sim,
  type: x.type.id,
}));
