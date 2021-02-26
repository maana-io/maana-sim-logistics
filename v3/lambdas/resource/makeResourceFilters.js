const { sim, type } = input;

const filters = [];

if (sim) {
  filters.push({
    fieldName: "sim",
    op: "==",
    value: { ID: sim },
  });
}

if (type) {
  filters.push({
    fieldName: "type",
    op: "==",
    value: { ID: type },
  });
}

return filters;
