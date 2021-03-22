const { city, demandUpdates } = input;

return {
  ...city,
  steps: city.steps + 1,
  demand: city.demand.map((x) => x.id),
  population: Math.floor(
    city.population +
      city.population *
        (demandUpdates.length
          ? city.populationGrowthRate
          : -city.populationDeclineRate)
  ),
};
