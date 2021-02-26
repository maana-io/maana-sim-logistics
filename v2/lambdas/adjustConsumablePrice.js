const { consumables, city } = input;
const { population } = city;

return consumables.map((consumable) => {
  const { storage } = consumable;
  const minPriceBasis = consumable.minPriceBasisPct * storage.capacity;
  return {
    id: consumable.id,
    price: population / Math.max(storage.amount, minPriceBasis),
  };
});
