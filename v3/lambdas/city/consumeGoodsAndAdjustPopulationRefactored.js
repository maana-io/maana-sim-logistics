const { city } = input;
const { demand } = city;

const resourceUpdates = demand.map(x => {
  const res = { ...x };
  const requestedQty = city.population * x.consumptionRate;
  if (x.quantity >= requestedQty) {
    res.quantity = x.quantity - requestedQty;
    res.ok = true;
  } else {
    res.ok = false;
  }
  return res;
});

function reducePopulation(city) {
  return Math.floor(
    city.population - 
      city.population *
        city.populationDeclineRate
  )
}

function increasePopulation(city) {
  return Math.floor(
    city.population +
      city.population *
        city.populationGrowthRate
  )
}

city.steps = city.steps + 1

return resourceUpdates.some(x => !x.ok) 
  ? {... city, population: reducePopulation(city) }
  : {... city, population: increasePopulation(city), demand: resourceUpdates}
