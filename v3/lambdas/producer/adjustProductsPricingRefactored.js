const { producer } = input;
const { material, products } = producer

const hasAvaialbleCapacity = products.every( x => x.capacity >= x.quantity + x.replenishRate )
const hasAvailableMatierials = material.every( x => x.quantity >= x.consumptionRate )
const isStopped = !(hasAvaialbleCapacity && hasAvailableMatierials)

if (!isStopped) {
  const productsUpdated  = products.map( x => {
    const scarcity = x.quantity / x.capacity;
    const adjustedPricePerUnit =
      x.basePricePerUnit + scarcity * x.scarcitySurchargeFactor;
    return {
      ...x,
      adjustedPricePerUnit,
    };
  })
  return { ... producer, products: productsUpdated }
} else {
  const productsUpdated = products.map( x => ({
    ...x,
    adjustedPricePerUnit:
      x.adjustedPricePerUnit +
      x.adjustedPricePerUnit * producer.stoppageSurchargeFactor,
  }));
  return { ... producer, products: productsUpdated}
}
