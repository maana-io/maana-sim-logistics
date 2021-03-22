const {producers, sim} = input;
return producers.map(x => ({
    id: x.id,
    producer: x,
    sim: sim
}))