const { map, x, y } = input;

return [
  {
    fieldName: "map",
    op: "==",
    value: { ID: map },
  },
  {
    fieldName: "x",
    op: "==",
    value: { INT: x },
  },
  {
    fieldName: "y",
    op: "==",
    value: { INT: y },
  },
];
