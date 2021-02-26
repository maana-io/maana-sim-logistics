const { transactions, ok } = input;

if (!ok) {
  return [];
}

return transactions.map((x) => ({
  ...x.storage,
  product: x.storage.product.id,
}));
