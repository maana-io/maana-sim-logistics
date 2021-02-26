const { sim: id, transactions: producerReports } = input;

return {
  id,
  producerReports,
  ok: !producerReports.some((x) => !x.ok),
};
