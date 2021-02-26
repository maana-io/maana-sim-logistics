const { paths, sim } = input;

return paths.map((x) => {
  return {
    ...x,
    sim,
    orderedLocations: x.orderedLocations.map((y) => ({
      ...y,
      path: x.id,
      sim,
    })),
  };
});
