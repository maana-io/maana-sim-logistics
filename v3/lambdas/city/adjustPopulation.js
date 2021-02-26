const { city, demandUpdates } = input;

return {
  ...city,
  demand: city.demand.map((x) => x.id),
  population: Math.floor(
    city.population +
      city.population *
        (demandUpdates.length
          ? city.populationGrowthRate
          : -city.populationDeclineRate)
  ),
};
