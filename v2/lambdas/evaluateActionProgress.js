const { sim: id, progress } = input;

const failed = progress.filter((x) => x.status.id === "Failed");

const ok = failed.length === 0;

return {
  id,
  progress,
  ok,
};
