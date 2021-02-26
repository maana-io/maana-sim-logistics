const {
  storageAmount: { storage, amount: requestedAmount },
} = input;

const originalAmount = storage.amount;

let actualAmount = requestedAmount;
let ok = true;

const newAmount = originalAmount + requestedAmount;

if (newAmount <= storage.capacity) {
  storage.amount = newAmount;
} else {
  storage.amount = storage.capacity;
  actualAmount = actualAmount - (newAmount - storage.capacity);
  ok = false;
}

return {
  id: `deposit:${storage.id}:${storage.capacity}:${originalAmount}:${requestAmount}`,
  storage,
  originalAmount,
  requestedAmount,
  actualAmount,
  ok,
};
