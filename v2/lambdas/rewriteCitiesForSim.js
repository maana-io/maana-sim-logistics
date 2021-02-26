const { cities, sim } = input;

return cities
  ? cities.map((x) => ({
      ...x,
      map: sim,
    }))
  : [];
