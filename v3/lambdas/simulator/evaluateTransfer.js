const { transfer, vehicle, city, producer, sim } = input;

const simUpdate = sim;

const transferType = transfer.transferType.id;
const resourceType = transfer.resourceType.id;

const transferUpdate = {
  ...transfer,
  transferType,
  resourceType,
};

const error = (reason) => {
  transferUpdate.status = reason;
  return {
    id: transferUpdate.id,
    transferUpdate,
    resources: [],
    simUpdate,
  };
};

const counterparty = city || producer;
if (!!!counterparty) {
  return error("ErrCounterparty");
}

if (counterparty.x !== vehicle.x || counterparty.y !== vehicle.y) {
  return error("ErrLocation");
}

const findResource = (col, id) => col.filter((x) => x.type.id === id);

let resources;
if (counterparty === city) {
  if (transferType !== "Deposit") {
    return error("ErrTransferType");
  }
  resources = findResource(city.demand, resourceType);
} else {
  resources =
    transferType === "Deposit" ? producer.material : producer.products;
}

const cargo = findResource(vehicle.cargo, resourceType);

if (!!!resources.length || !!!cargo.length) {
  return error("ErrResource");
}

let source, target;

if (transferType === "Deposit") {
  source = cargo[0];
  target = resources[0];
} else {
  source = resources[0];
  target = cargo[0];
}

const capacity = target.capacity - target.quantity;
if (capacity < transfer.quantity) {
  return error("ErrCapacity");
}

if (source.quantity < transfer.quantity) {
  return error("ErrQuantity");
}

let price;
if (transferType === "Deposit") {
  price = target.adjustedPricePerUnit * transfer.quantity;
  simUpdate.income = simUpdate.income + price;
  simUpdate.balance = simUpdate.balance + price;
} else {
  price = source.adjustedPricePerUnit * transfer.quantity;
  if (price > simUpdate.balance) {
    return error("ErrFunds");
  }
  simUpdate.expenses = simUpdate.expenses + price;
  simUpdate.balance = simUpdate.balance - price;
}

transferUpdate.price = price;

source.quantity = source.quantity - transfer.quantity;
target.quantity = target.quantity + transfer.quantity;

const flattenResource = (resource) => ({
  ...resource,
  type: resource.type.id,
});

transferUpdate.status = "OK";
return {
  id: transferUpdate.id,
  transferUpdate,
  resources: [flattenResource(source), flattenResource(target)],
  simUpdate,
};
