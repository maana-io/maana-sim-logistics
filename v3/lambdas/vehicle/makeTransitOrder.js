const { vehicle, sim, destX, destY } = input;

return {
  ...input,
  id: `${vehicle}/${destX}/${destY}#${new Date().valueOf()}`,
  status: "Pending",
  steps: 0,
};
