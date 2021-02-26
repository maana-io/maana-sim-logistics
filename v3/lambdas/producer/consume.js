const { producer } = input;
const { material } = producer;

const resourceUpdates = material.map((x) => {
  const res = { ...x, type: x.type.id };
  const requestedQty = x.consumptionRate;
  if (x.quantity >= requestedQty) {
    res.quantity = x.quantity - requestedQty;
    res.ok = true;
  } else {
    res.ok = false;
  }
  return res;
});

return resourceUpdates.some((x) => !x.ok) ? [] : resourceUpdates;
