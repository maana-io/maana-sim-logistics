const { sim, type, x, y } = input;

const filters = []

if (sim){
  filters.push({
    fieldName: "sim",
    op: "==",
    value: { ID: sim },
  })
}

if (type){
  filters.push({
    fieldName: "type",
    op: "==",
    value: { ID: type },
  })
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
