const { sim: id, cityReports } = input;

return {
  id,
  cityReports,
  ok: !cityReports.some((x) => !x.ok),
};
