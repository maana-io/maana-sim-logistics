const { observation, belief } = input

const { id } = observation

return { 
    id,
    observation,
    belief,
    actions: [{
        id: id,
        transitActions:[],
        repairActions:[],
        transferActions: []
    }]
}