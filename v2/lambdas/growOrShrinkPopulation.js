const { population, growthRate, declineRate, ok, city } = input;

return {
  id: city.id,
  population: ok
    ? population + growthRate * population
    : population - declineRate * population,
};
