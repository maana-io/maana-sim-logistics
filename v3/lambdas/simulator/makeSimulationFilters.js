const { name, agentEndpoint } = input;

const filters = [];

if (name) {
  filters.push({
    fieldName: "name",
    op: "==",
    value: { STRING: name },
  });
}

if (agentEndpoint) {
  filters.push({
    fieldName: "agentEndpoint",
    op: "==",
    value: { ID: agentEndpoint },
  });
}

return filters;
