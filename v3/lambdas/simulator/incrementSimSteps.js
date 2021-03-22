    const { state } = input
    const incr = x => {x.steps = x.steps + 1}
    incr( state.sim )
    state.cities.forEach( incr )
    state.producers.forEach( incr )
    state.hubs.forEach( incr )
    return state