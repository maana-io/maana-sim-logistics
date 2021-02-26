const { cities, ids } = input;

const delta = cities.length - ids.length;
if (delta) {
  throw new Error(
    `Failed to persist ${delta} ${delta > 1 ? "cities" : "city"}.`
  );
}

return cities;
