const { city, cityUpdate, consumablesUpdates, withdrawals, ok };

return {
  id: city.id,
  city,
  withdrawals,
  newPopulation: cityUpdate.population,
  newPrices: consumablesUpdates,
  ok,
};
