const { transactions } = input;

return transactions.reduce((res, cur) => {
  if (!res) return false;
  return cur.ok;
}, true);
