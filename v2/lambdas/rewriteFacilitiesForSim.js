const { facilities, sim } = input;

return facilities.map((x) => ({
  ...x,
  sim,
}));
