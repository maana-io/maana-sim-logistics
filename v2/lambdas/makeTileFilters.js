const { map, type, x, y } = input;

const filters = [
  {
    fieldName: "map",
    op: "==",
    value: { ID: map },
  },
];

if (type) {
  filters.push({
    fieldName: "type",
    op: "==",
    value: { ID: type.id },
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
