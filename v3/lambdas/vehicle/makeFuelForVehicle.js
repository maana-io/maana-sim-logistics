const { vehicle } = input 

return {
    id: `${vehicle.id}/fuel`,
    type: "Petrochemicals",
    capacity: 20,
    quantity: 20,
    basePricePerUnit: 0,
    adjustedPricePerUnit: 0,
    scarcitySurchargeFactor: 0,
    replenishRate: 0,
    sim: vehicle.sim,
    consumptionRate: 0
}