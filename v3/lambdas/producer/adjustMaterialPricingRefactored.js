const { producer } = input;
const { material, products } = producer

const hasAvaialbleCapacity = products.every( x => x.capacity >= x.quantity + x.replenishRate )
const hasAvailableMatierials = material.every( x => x.quantity >= x.consumptionRate )
const isStopped = !(hasAvaialbleCapacity && hasAvailableMatierials)

if (!isStopped) {
  const materialUpdates = material.map( x => {
    const scarcity = 1 - x.quantity / x.capacity;
    const adjustedPricePerUnit =
      x.basePricePerUnit + scarcity * x.scarcitySurchargeFactor;
    return {
      ...x,
      adjustedPricePerUnit,
    };
  });
  return { ... producer, material: materialUpdates }
} else {
  const materialUpdates = material.map( x => ({
    ...x,
    adjustedPricePerUnit:
      x.adjustedPricePerUnit +
      x.adjustedPricePerUnit * producer.stoppageSurchargeFactor,
  }));
  return { ... producer, material: materialUpdates }
}
