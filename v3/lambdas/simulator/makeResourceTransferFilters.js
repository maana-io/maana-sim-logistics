const {
  sim,
  transferType,
  vehicle,
  counterparty,
  resourceType,
  status,
} = input;

const filters = [];

if (sim) {
  filters.push({
    fieldName: "sim",
    op: "==",
    value: { ID: sim },
  });
}

if (transferType) {
  filters.push({
    fieldName: "transferType",
    op: "==",
    value: { ID: transferType },
  });
}

if (vehicle) {
  filters.push({
    fieldName: "vehicle",
    op: "==",
    value: { ID: vehicle },
  });
}

if (counterparty) {
  filters.push({
    fieldName: "counterparty",
    op: "==",
    value: { ID: counterparty },
  });
}

if (resourceType) {
  filters.push({
    fieldName: "resourceType",
    op: "==",
    value: { ID: resourceType },
  });
}

if (status) {
  filters.push({
    fieldName: "status",
    op: "==",
    value: { ID: status },
  });
}

return filters;
