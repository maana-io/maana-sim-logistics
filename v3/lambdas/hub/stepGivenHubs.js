function stepGivenHub(hub) {
    const { supplies } = hub
    
    hub.supplies = supplies.map( x => {
        const scarcity = 1 - x.quantity / x.capacity;
        x.adjustedPricePerUnit =
            x.basePricePerUnit + scarcity * x.scarcitySurchargeFactor;
        return x
        });
    return hub
    }

return input.hubs.map(stepGivenHub)