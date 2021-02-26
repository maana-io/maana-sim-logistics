const {
  storageAmount: { storage, amount: requestedAmount },
} = input;

const originalAmount = storage.amount;

let actualAmount = requestedAmount;
let ok = true;

if (storage.amount >= requestedAmount) {
  storage.amount -= requestedAmount;
} else {
  actualAmount = storage.amount;
  storage.amount = 0;
  ok = false;
}

return {
  id: `withdraw:${storage.id}:${storage.capacity}:${originalAmount}:${requestAmount}`,
  storage,
  originalAmount,
  requestedAmount,
  actualAmount,
  ok,
};
