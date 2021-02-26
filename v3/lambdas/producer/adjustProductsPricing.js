const { producer, materialUpdates, productsUpdates } = input;

if (productsUpdates.length && materialUpdates.length) {
  return productsUpdates.map((x) => {
    const scarcity = x.quantity / x.capacity;
    const adjustedPricePerUnit =
      x.basePricePerUnit + scarcity * x.scarcitySurchargeFactor;
    return {
      ...x,
      adjustedPricePerUnit,
    };
  });
} else {
  return producer.products.map((x) => ({
    ...x,
    type: x.type.id,
    adjustedPricePerUnit:
      x.adjustedPricePerUnit +
      x.adjustedPricePerUnit * producer.stoppageSurchargeFactor,
  }));
}
