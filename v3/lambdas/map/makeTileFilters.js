const { map, type, x, y } = input;

const filters = [];

if (map) {
  filters.push({
    fieldName: "map",
    op: "==",
    value: { ID: map },
  });
}

if (type) {
  filters.push({
    fieldName: "type",
    op: "==",
    value: { ID: type },
  });
}

if (x !== undefined) {
  filters.push({
    fieldName: "x",
    op: "==",
    value: { FLOAT: x },
  });
}

if (y !== undefined) {
  filters.push({
    fieldName: "y",
    op: "==",
    value: { FLOAT: y },
  });
}

return filters;
