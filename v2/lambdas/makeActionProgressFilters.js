const { sim, type, status } = input;

const filters = [
  {
    fieldName: "sim",
    op: "==",
    value: { ID: sim },
  },
];

if (type) {
  filters.push({
    fieldName: "type",
    op: "==",
    value: { ID: type.id },
  });
}

if (status) {
  filters.push({
    fieldName: "status",
    op: "==",
    value: { ID: status.id },
  });
}

return filters;
