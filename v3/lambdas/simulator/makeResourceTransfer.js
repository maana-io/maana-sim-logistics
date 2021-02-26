const { vehicle, quantity, counterparty, resourceType, transferType } = input;

return {
  ...input,
  id: `${vehicle}/${counterparty}/${transferType.id}/${
    resourceType.id
  }/${quantity}#${new Date().valueOf()}`,
  resourceType: resourceType.id,
  transferType: transferType.id,
  price: 0,
  status: "Pending",
};
