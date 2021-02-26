const { producer } = input;
const { products } = producer;

const resourceUpdates = products.map((x) => {
  const res = { ...x, type: x.type.id };
  const requestedQty = x.quantity + x.replenishRate;
  if (requestedQty <= x.capacity) {
    res.quantity = requestedQty;
    res.ok = true;
  } else {
    res.ok = false;
  }
  return res;
});

return resourceUpdates.some((x) => !x.ok) ? [] : resourceUpdates;
