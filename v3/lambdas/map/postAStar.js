const { path } = input;
return path.locations.map((oloc) => ({
  id: oloc.id,
  ...oloc.location,
  order: oloc.order,
}));
