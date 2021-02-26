const { city, cityUpdate, demandUpdates } = input;

const useMap = demandUpdates.length
  ? demandUpdates
  : city.demand.map((x) => ({
      ...x,
      type: x.type.id,
    }));

return useMap.map((x) => {
  const scarcity = cityUpdate.population / x.quantity;
  const adjustedPricePerUnit =
    x.basePricePerUnit + scarcity * x.scarcitySurchargeFactor;
  return {
    ...x,
    adjustedPricePerUnit,
  };
});
