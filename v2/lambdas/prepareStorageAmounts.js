const do_it = (input) => {
  const { quantities, storages } = input;

  const found = [];
  const missing = [];

  quantities.forEach((qty) => {
    const res = storages.filter(
      (storage) => storage.product.id === qty.type.id
    );
    if (res) {
      if (res.length > 1) {
        throw new Error(`Multiple storages found for: ${qty.type.id}`);
      }
      found.push({ id: res[0].id, storage: res[0], amount: qty.quantity });
    } else {
      missing.push(qty.type.id);
    }
  });

  if (missing.length) {
    throw new Error(`Missing storage for: ${JSON.stringify(missing)}`);
  }
  return found;
};

// do_it({
//   quantities: [
//     { id: 0, type: { id: "Oil" }, quantity: 1 },
//     { id: 0, type: { id: "Wood" }, quantity: 1 },
//   ],
//   storages: [
//     { id: 0, product: { id: "Oil" } },
//     { id: 1, product: { id: "Wood" } },
//   ],
// });
