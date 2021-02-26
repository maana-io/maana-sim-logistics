const { producer, materialUpdates, productsUpdates } = input;

if (productsUpdates.length && materialUpdates.length) {
  return materialUpdates.map((x) => {
    const scarcity = 1 - x.quantity / x.capacity;
    const adjustedPricePerUnit =
      x.basePricePerUnit + scarcity * x.scarcitySurchargeFactor;
    return {
      ...x,
      adjustedPricePerUnit,
    };
  });
} else {
  return producer.material.map((x) => ({
    ...x,
    type: x.type.id,
    adjustedPricePerUnit:
      x.adjustedPricePerUnit +
      x.adjustedPricePerUnit * producer.stoppageSurchargeFactor,
  }));
}
