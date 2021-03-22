const {vehicles, sim} = input;
return vehicles.map(x => ({
    id: x.id,
    vehicle: x,
    sim: sim
}))