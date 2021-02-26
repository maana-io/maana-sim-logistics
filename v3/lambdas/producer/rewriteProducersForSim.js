const { producers, sim } = input;

const newProducers = producers.map((x) => ({
  ...x,
  id: `${sim}/${x.id}`,
  sim,
  type: x.type.id,
  material: x.material.map((x) => x.id),
  products: x.products.map((x) => x.id),
}));

return newProducers;
