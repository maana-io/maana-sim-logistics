const { cities, sim } = input;

const newCities = cities.map((x) => ({
  ...x,
  id: `${sim}/${x.id}`,
  sim,
  demand: x.demand.map((x) => x.id),
}));

return newCities;
