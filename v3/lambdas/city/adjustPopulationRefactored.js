const { city } = input;

return {
  ...city,
  steps: city.steps + 1,
  population: Math.floor(
    city.population +
      city.population *
        (city.demand.filter(x => x.quantity>0).length
          ? city.populationGrowthRate
          : -city.populationDeclineRate)
  ),
};
