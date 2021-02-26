const { sim, vehicle, status, destX, destY } = input;

const filters = [];

if (sim) {
  filters.push({
    fieldName: "sim",
    op: "==",
    value: { ID: sim },
  });
}

if (vehicle) {
  filters.push({
    fieldName: "vehicle",
    op: "==",
    value: { ID: vehicle },
  });
}

if (status) {
  filters.push({
    fieldName: "status",
    op: "==",
    value: { ID: status },
  });
}

if (destX !== undefined) {
  filters.push({
    fieldName: "destX",
    op: "==",
    value: { FLOAT: destX },
  });
}

if (destY !== undefined) {
  filters.push({
    fieldName: "destY",
    op: "==",
    value: { FLOAT: destY },
  });
}

return filters;
