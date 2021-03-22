const {cities, sim} = input;
return cities.map(x => ({
    id: x.id,
    city: x,
    sim: sim
}))