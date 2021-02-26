const { sim, type } = input;

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

return filters;
