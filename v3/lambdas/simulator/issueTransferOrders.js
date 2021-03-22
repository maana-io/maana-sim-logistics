const { state, transferActions } = input 


function makeTransferOrder( transferAction ) {
    const { vehicle, quantity, counterparty, resourceType, transferType } = transferAction;

    return {
        ... transferAction,
    id: `${vehicle}/${counterparty}/${transferType.id}/${
        resourceType.id
    }/${quantity}#${new Date().valueOf()}`,
    sim: state.sim.id,
    price: 0,
    status: { id: "Pending" },
    };
}

state.transfers = transferActions.map( makeTransferOrder )
return state