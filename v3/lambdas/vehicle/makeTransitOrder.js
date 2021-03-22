const { vehicle, sim, destX, destY, status } = input;

return {
  ...input,
  id: `${vehicle}/${destX}/${destY}#${new Date().valueOf()}`,
  status: status || "Pending",
  steps: 0,
};
