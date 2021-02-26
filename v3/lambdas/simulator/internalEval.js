const { state } = input;
const { sim, transfers } = state;

sim.steps = sim.steps + 1;

transfers
  .filter((x) => x.status.id === "OK")
  .forEach((x) => {
    if (x.transferType.id === "Deposit") {
      sim.income = sim.income + x.price;
      sim.balance = sim.balance + x.price;
    } else {
      sim.expenses = sim.expenses + x.price;
      sim.balance = sim.balance - x.price;
    }
  });

return sim;
