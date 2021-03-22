const { city, cityUpdate, demandUpdates } = input;

const demandUpdated = city.demand.map( x => {
  if (x.quantity>0) {
  const scarcity = city.population / x.quantity;
  const adjustedPricePerUnit =
    x.basePricePerUnit + scarcity * x.scarcitySurchargeFactor;
  return {
    ...x,
    adjustedPricePerUnit,
  };
  } 
  else {
    return x
  }
});

return {...city, demand: demandUpdated}
