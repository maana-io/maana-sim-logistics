const { sim, path, order, x, y } = input;

const filters = [
  {
    fieldName: "sim",
    op: "==",
    value: { ID: sim },
  },
];

if (path) {
  filters.push({
    fieldName: "path",
    op: "==",
    value: { ID: path },
  });
}

if (order !== undefined) {
  filters.push({
    fieldName: "order",
    op: "==",
    value: { INT: order },
  });
}

if (x !== undefined) {
  filters.push({
    fieldName: "x",
    op: "==",
    value: { INT: x },
  });
}

if (y !== undefined) {
  filters.push({
    fieldName: "y",
    op: "==",
    value: { INT: y },
  });
}

return filters;
