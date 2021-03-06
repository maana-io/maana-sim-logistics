const { sim, type, facility, level, x, y } = input;

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

if (facility) {
  filters.push({
    fieldName: "facility",
    op: "==",
    value: { ID: facility },
  });
}

if (level) {
  filters.push({
    fieldName: "level",
    op: "==",
    value: { ID: level },
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
