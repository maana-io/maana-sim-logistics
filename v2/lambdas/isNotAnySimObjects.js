const {
  simObjects: { cities, producers, facilities, paths, vehicles, supplyDepots },
} = input;

return !(
  cities.length ||
  producers.length ||
  facilities.length ||
  paths.length ||
  vehicles.length ||
  supplyDepots.length
);
