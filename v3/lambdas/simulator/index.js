const fs = require("fs");
const CKG = require("../CKG/ckg.js")
const maanaSimLogisticsResourceV3 = require('../Resource: SimLogistics (v3)/index.js')
const maanaSimLogisticsCityV3 = require('../City: SimLogistics (v3)/index.js')
const maanaSimLogisticsProducerV3 = require('../Producer: SimLogistics (v3)/index.js')
const maanaSimLogisticsVehicleV3 = require('../Vehicle: SimLogistics (v3)/index.js')
const maanaQScalarsV2 = require('../Scalars (v2)/index.js')
const maanaSimLogisticsHubV3 = require('../Hub: SimLogistics (v3)/index.js')
const maanaSimLogisticsMapV3 = require('../Map: SimLogistics (v3)/index.js')

/** 
  * @param sim 
  * @param id 
  * @param agentEndpoint 
  * @param name 
  */
function rewriteID( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/rewriteID.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  */
function cascadeDelete( input ) {
    const X0 = maanaSimLogisticsVehicleV3.deleteVehicleFilter({sim: input.sim})
    const X1 = maanaSimLogisticsHubV3.deleteHubFilter({sim: input.sim})
    const X2 = deleteResourceTransferFilter({sim: input.sim})
    const X3 = maanaSimLogisticsResourceV3.deleteResourceFilter({sim: input.sim})
    const X4 = maanaSimLogisticsProducerV3.deleteProducerFilter({sim: input.sim})
    const X5 = maanaSimLogisticsCityV3.deleteCityFilter({sim: input.sim})
    const X6 = deleteSimulation({id: input.sim})
    const X7 = deleteVehicleTransitOrderSync({vehicles: X0,sim: input.sim})
    const X8 = constructFullState({transitOrders: X7,sim: X6,id: input.sim,cities: X5,producers: X4,vehicles: X0,resources: X3,transfers: X2,hubs: X1})
    return X8
}

/** 
  * @param name 
  * @param agentEndpoint 
  */
function newSim( input ) {
    const X0 = defaultScenario()
    const X1 = loadState({id: X0})
    const X2 = reindexState({state: X1,name: input.name,agentEndpoint: input.agentEndpoint,scenario: X0})
    const X3 = saveState({state: X2})
    return X3
}

/** 

  */
function defaultScenario( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/defaultScenario.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param name 
  * @param scenario 
  * @param agentEndpoint 
  */
function makeSimID( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/makeSimID.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param id 
  * @param sim 
  * @param cities 
  * @param producers 
  * @param hubs 
  * @param vehicles 
  * @param transfers 
  * @param transitOrders 
  * @param mapAndTiles 
  */
function constructState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/constructState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param resourceTransferUpdates 
  */
function projectTransferUpdateFromResourceTransferUpdates( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectTransferUpdateFromResourceTransferUpdates.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param resourceTransferUpdates 
  */
function projectResourcesFromResourceTransferUpdates( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectResourcesFromResourceTransferUpdates.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param transferType 
  * @param vehicle 
  * @param counterparty 
  * @param resourceType 
  * @param status 
  */
function selectResourceTransfer( input ) {
    const X0 = makeResourceTransferFilters({sim: input.sim,transferType: input.transferType,vehicle: input.vehicle,counterparty: input.counterparty,resourceType: input.resourceType,status: input.status})
    const X1 = resourceTransferFilter({filters: X0})
    return X1
}

/** 
  * @param sim 
  * @param vehicle 
  * @param counterparty 
  * @param resourceType 
  * @param quantity 
  * @param transferType 
  */
function makeResourceTransfer( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/makeResourceTransfer.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 

  */
function pending( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/pending.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param transferType 
  * @param vehicle 
  * @param counterparty 
  * @param resourceType 
  * @param status 
  */
function deleteResourceTransferFilter( input ) {
    const X0 = selectResourceTransfer({sim: input.sim,transferType: input.transferType,vehicle: input.vehicle,counterparty: input.counterparty,resourceType: input.resourceType,status: input.status})
    const X1 = X0.map( x => projectIdFromResourceTransfer({ resourceTransfer: x}) )
    const X2 = deleteResourceTransfers({ids: X1})
    return X2
}

/** 
  * @param sim 
  * @param transferType 
  * @param vehicle 
  * @param counterparty 
  * @param resourceType 
  * @param status 
  */
function makeResourceTransferFilters( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/makeResourceTransferFilters.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param resourceTransfer 
  */
function projectIdFromResourceTransfer( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectIdFromResourceTransfer.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param transferUpdate 
  * @param resourceUpdates 
  * @param simUpdate 
  * @param transfer 
  */
function sinkStepResourceTransfer( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/sinkStepResourceTransfer.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param id 
  * @param sim 
  * @param cities 
  * @param producers 
  * @param hubs 
  * @param vehicles 
  * @param transfers 
  * @param transitOrders 
  * @param resources 
  */
function constructFullState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/constructFullState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param resourceTransfer 
  */
function projectVehicleFromResourceTransfer( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectVehicleFromResourceTransfer.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param resourceTransfer 
  */
function projectCounterpartyFromResourceTransfer( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectCounterpartyFromResourceTransfer.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param resourceTransfer 
  */
function projectSimFromResourceTransfer( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectSimFromResourceTransfer.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param resourceTransferUpdates 
  */
function projectSimUpdateFromResourceTransferUpdates( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectSimUpdateFromResourceTransferUpdates.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param transfers 
  */
function sinkEvaluateState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/sinkEvaluateState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicles 
  * @param sim 
  */
function deleteVehicleTransitOrderSync( input ) {
    const X0 = maanaSimLogisticsVehicleV3.deleteTransitOrderFilter({sim: input.sim})
    return X0
}

/** 
  * @param id 
  */
function loadState( input ) {
    const X0 = loadStateFromSelections({id: input.id})
    return X0
}

/** 
  * @param transferAction 
  */
function projectSimFromTransferAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectSimFromTransferAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param transferAction 
  */
function projectVehicleFromTransferAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectVehicleFromTransferAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param transferAction 
  */
function projectCounterpartyFromTransferAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectCounterpartyFromTransferAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param transferAction 
  */
function projectResourceTypeFromTransferAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectResourceTypeFromTransferAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param transferAction 
  */
function projectQuantityFromTransferAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectQuantityFromTransferAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param transferAction 
  */
function projectTransferTypeFromTransferAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectTransferTypeFromTransferAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param agentEndpoint 
  * @param name 
  */
function makeSimulationFilters( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/makeSimulationFilters.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function projectSimFromState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectSimFromState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param transitAction 
  */
function projectIdFromTransitAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectIdFromTransitAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param transitAction 
  */
function projectSimFromTransitAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectSimFromTransitAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param transitAction 
  */
function projectVehicleFromTransitAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectVehicleFromTransitAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param transitAction 
  */
function projectDestXFromTransitAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectDestXFromTransitAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param transitAction 
  */
function projectDestYFromTransitAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectDestYFromTransitAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param simulation 
  */
function projectIdFromSimulation( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectIdFromSimulation.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param fullState 
  */
function projectIdFromFullState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectIdFromFullState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param scenario 
  * @param sim 
  */
function newSimResourceTransfers( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/newSimResourceTransfers.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param repairAction 
  */
function projectSimFromRepairAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectSimFromRepairAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param repairAction 
  */
function projectVehicleFromRepairAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectVehicleFromRepairAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param repairAction 
  */
function projectHubFromRepairAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectHubFromRepairAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param ids 
  */
function cascadeDeleteMany( input ) {
    const X0 = ids.map( x => cascadeDelete({ sim: x}) )
    return X0
}

/** 
  * @param agentEndpoint 
  * @param name 
  */
function selectSimulation( input ) {
    const X0 = makeSimulationFilters({agentEndpoint: input.agentEndpoint,name: input.name})
    const X1 = simulationFilter({filters: X0})
    return X1
}

/** 
  * @param fullState 
  */
function projectSimFromFullState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectSimFromFullState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param id 
  * @param sim 
  * @param vehicle 
  * @param hub 
  */
function constructRepairAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/constructRepairAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function stepState( input ) {
    const X0 = incrementSimSteps({state: input.state})
    const X1 = stepCities({state: X0})
    const X2 = manufactureProducts({state: X1})
    const X3 = moveVehicles({state: X2})
    const X4 = transferResources({state: X3})
    const X5 = repairVehicles({state: X4})
    const X6 = adjustPrices({state: X5})
    return X6
}

/** 
  * @param state 
  */
function projectCitiesFromState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectCitiesFromState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function projectProducersFromState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectProducersFromState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function projectHubsFromState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectHubsFromState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function projectVehiclesFromState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectVehiclesFromState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function projectTransfersFromState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectTransfersFromState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param id 
  * @param sim 
  * @param vehicle 
  * @param destX 
  * @param destY 
  */
function constructTransitAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/constructTransitAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param agentEndpoint 
  * @param name 
  */
function deleteSimulationFilter( input ) {
    const X0 = selectSimulation({name: input.name,agentEndpoint: input.agentEndpoint})
    const X1 = X0.map( x => projectIdFromSimulation({ simulation: x}) )
    const X2 = X1.map( x => deleteSimulation({ id: x}) )
    return X2
}

/** 
  * @param id 
  * @param transitActions 
  * @param repairActions 
  * @param transferActions 
  */
function constructActions( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/constructActions.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param id 
  * @param sim 
  * @param vehicle 
  * @param counterparty 
  * @param resourceType 
  * @param quantity 
  * @param transferType 
  */
function constructTransferAction( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/constructTransferAction.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param actions 
  */
function projectTransitActionsFromActions( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectTransitActionsFromActions.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param actions 
  */
function projectRepairActionsFromActions( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectRepairActionsFromActions.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param actions 
  */
function projectTransferActionsFromActions( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectTransferActionsFromActions.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function aggregateStateUpdates( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/aggregateStateUpdates.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function projectTransitOrdersFromState_Copy( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectTransitOrdersFromState_Copy.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param cities 
  * @param producers 
  * @param hubs 
  * @param vehicles 
  * @param resources 
  * @param transitOrders 
  * @param resourceTransferOrders 
  * @param state 
  * @param stateupdate 
  * @param waypointIds 
  */
function sinkSaveState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/sinkSaveState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param stateUpdates 
  */
function projectSimulationFromStateUpdates( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectSimulationFromStateUpdates.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param stateUpdates 
  */
function projectCitiesFromStateUpdates( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectCitiesFromStateUpdates.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param stateUpdates 
  */
function projectProducersFromStateUpdates( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectProducersFromStateUpdates.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param stateUpdates 
  */
function projectHubsFromStateUpdates( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectHubsFromStateUpdates.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param stateUpdates 
  */
function projectVehiclesFromStateUpdates( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectVehiclesFromStateUpdates.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param stateUpdates 
  */
function projectResourcesFromStateUpdates( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectResourcesFromStateUpdates.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param stateUpdates 
  */
function projectTransitOrdersFromStateUpdates( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectTransitOrdersFromStateUpdates.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param stateUpdates 
  */
function projectResourceTransfersFromStateUpdates( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectResourceTransfersFromStateUpdates.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function stepCities( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/stepCities.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param stateUpdates 
  */
function projectStateFromStateUpdates( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectStateFromStateUpdates.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 

  */
function emptyTransitOrders( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/emptyTransitOrders.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  * @param transferActions 
  */
function issueTransferOrders( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/issueTransferOrders.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  * @param transitActions 
  */
function issueTransitOrders( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/issueTransitOrders.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function saveState( input ) {
    const X0 = aggregateStateUpdates({state: input.state})
    const X1 = projectWaypointsForStateUpdates({stateUpdates: X0})
    const X2 = projectStateFromStateUpdates({stateUpdates: X0})
    const X3 = projectResourcesFromStateUpdates({stateUpdates: X0})
    const X4 = projectResourceTransfersFromStateUpdates({stateUpdates: X0})
    const X5 = projectTransitOrdersFromStateUpdates({stateUpdates: X0})
    const X6 = projectVehiclesFromStateUpdates({stateUpdates: X0})
    const X7 = projectHubsFromStateUpdates({stateUpdates: X0})
    const X8 = projectProducersFromStateUpdates({stateUpdates: X0})
    const X9 = projectCitiesFromStateUpdates({stateUpdates: X0})
    const X10 = projectSimulationFromStateUpdates({stateUpdates: X0})
    const X11 = maanaSimLogisticsMapV3.addWaypoints({input: X1})
    const X12 = addState({input: X2})
    const X13 = maanaSimLogisticsResourceV3.addResources({input: X3})
    const X14 = addResourceTransfers({input: X4})
    const X15 = maanaSimLogisticsVehicleV3.addTransitOrders({input: X5})
    const X16 = maanaSimLogisticsVehicleV3.addVehicles({input: X6})
    const X17 = maanaSimLogisticsHubV3.addHubs({input: X7})
    const X18 = maanaSimLogisticsProducerV3.addProducers({input: X8})
    const X19 = maanaSimLogisticsCityV3.addCitys({input: X9})
    const X20 = addSimulation({input: X10})
    const X21 = sinkSaveState({sim: X20,cities: X19,producers: X18,hubs: X17,vehicles: X16,state: input.state,transitOrders: X15,resourceTransferOrders: X14,resources: X13,stateupdate: X12,waypointIds: X11})
    return X21
}

/** 
  * @param actions 
  */
function pickActions( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/pickActions.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param id 
  */
function loadStateFromSelections( input ) {
    const X0 = defaultScenario()
    const X1 = maanaSimLogisticsMapV3.mapAndTiles({map: X0})
    const X2 = maanaSimLogisticsVehicleV3.selectTransitOrder({sim: input.id})
    const X3 = maanaSimLogisticsCityV3.selectCity({sim: input.id})
    const X4 = maanaSimLogisticsProducerV3.selectProducer({sim: input.id})
    const X5 = maanaSimLogisticsHubV3.selectHub({sim: input.id})
    const X6 = maanaSimLogisticsVehicleV3.selectVehicle({sim: input.id})
    const X7 = selectResourceTransfer({sim: input.id})
    const X8 = simulation({id: input.id})
    const X9 = constructState({sim: X8,id: input.id,transfers: X7,vehicles: X6,hubs: X5,producers: X4,cities: X3,transitOrders: X2,mapAndTiles: X1})
    return X9
}

/** 
  * @param state 
  */
function transferResources( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/transferResources.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  * @param actions 
  */
function simulate( input ) {
    const X0 = pickActions({actions: input.actions})
    const X1 = issueOrders({actions: X0,state: input.state})
    const X2 = stepState({state: X1})
    return X2
}

/** 
  * @param state 
  * @param repairActions 
  */
function issueRepairOrders( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/issueRepairOrders.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function projectTransitOrdersFromState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectTransitOrdersFromState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function repairVehicles( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/repairVehicles.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  * @param actions 
  */
function issueOrders( input ) {
    const X0 = projectTransitActionsFromActions({actions: input.actions})
    const X1 = projectTransferActionsFromActions({actions: input.actions})
    const X2 = issueTransitOrders({transitActions: X0,state: input.state})
    const X3 = projectRepairActionsFromActions({actions: input.actions})
    const X4 = issueTransferOrders({state: X2,transferActions: X1})
    const X5 = routeRepairActions({state: X4,repairAction: X3})
    const X6 = issueRepairRoutedRepairOrders({repairOrders: X5,state: X4})
    return X6
}

/** 
  * @param state 
  */
function adjustPrices( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/adjustPrices.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param provided 
  * @param alternate 
  */
function pickState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/pickState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function incrementSimSteps( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/incrementSimSteps.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param scenario 
  * @param state 
  * @param name 
  * @param agentEndpoint 
  */
function reindexState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/reindexState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function manufactureProducts( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/manufactureProducts.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param id 
  * @param actions 
  */
function testSim( input ) {
    const X0 = loadState({id: input.id})
    const X1 = simulate({state: X0,actions: input.actions})
    return X1
}

/** 
  * @param state 
  * @param actions 
  */
function dumpInputs( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/dumpInputs.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param payload 
  */
function projectfromXFromRoutingPayload( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectfromXFromRoutingPayload.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function projectMapAndTilesFromState( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectMapAndTilesFromState.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param payload 
  */
function projectVehicleTypeFromRoutingPayload( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectVehicleTypeFromRoutingPayload.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param payload 
  */
function projectToYFromRoutingPayload( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectToYFromRoutingPayload.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param repairAction 
  * @param state 
  */
function routeRepairActions( input ) {
    const X0 = makeRepairRoutingPayloads({repairActions: input.repairAction,state: input.state})
    const X1 = X0.map( x => routeRepairOrders({ payload: x}) )
    return X1
}

/** 
  * @param repairActions 
  * @param state 
  */
function makeRepairRoutingPayloads( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/makeRepairRoutingPayloads.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param payload 
  */
function projectMapAndTilesFromRoutingPayload( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectMapAndTilesFromRoutingPayload.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function moveVehicles( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/moveVehicles.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  * @param repairOrders 
  */
function issueRepairRoutedRepairOrders( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/issueRepairRoutedRepairOrders.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param stateUpdates 
  */
function projectWaypointsForStateUpdates( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectWaypointsForStateUpdates.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param payload 
  */
function projectFromYFromRoutingPayload( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectFromYFromRoutingPayload.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param payload 
  */
function projectToXFromRoutingPayload( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/projectToXFromRoutingPayload.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param payload 
  */
function routeRepairOrders( input ) {
    const X0 = projectMapAndTilesFromRoutingPayload({payload: input.payload})
    const X1 = projectToYFromRoutingPayload({payload: input.payload})
    const X2 = projectFromYFromRoutingPayload({payload: input.payload})
    const X3 = projectfromXFromRoutingPayload({payload: input.payload})
    const X4 = projectToXFromRoutingPayload({payload: input.payload})
    const X5 = projectVehicleTypeFromRoutingPayload({payload: input.payload})
    const X6 = maanaSimLogisticsMapV3.routeVehicle({vehicleType: X5,toX: X4,fromX: X3,fromY: X2,toY: X1,mapAndTiles: X0})
    const X7 = makeTransitOrderFromPayloadAndRoute({waypoints: X6,payload: input.payload})
    return X7
}

/** 
  * @param payload 
  * @param waypoints 
  */
function makeTransitOrderFromPayloadAndRoute( input ) {
    const BODY = fs.readFileSync('./Simulator: SimLogistics (v3)/makeTransitOrderFromPayloadAndRoute.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

const fieldFilterInputProxy = ( { id } ) => CKG.queryOne("2031a569-003d-4999-a904-0389266ac41a",id,true)
const fieldFilterInputProxys = ( { ids } ) => CKG.queryMany("2031a569-003d-4999-a904-0389266ac41a",ids,true)
const allFieldFilterInputProxys = ( ) => CKG.queryAll("2031a569-003d-4999-a904-0389266ac41a",true)
const fieldFilterInputProxyFilter = ( { filters } ) => CKG.filter("2031a569-003d-4999-a904-0389266ac41a", filters )
const addFieldFilterInputProxy = () => console.log('addFieldFilterInputProxy not yet implemented')
const addFieldFilterInputProxys = () => console.log('addFieldFilterInputProxys not yet implemented')
const updateFieldFilterInputProxy = () => console.log('updateFieldFilterInputProxy not yet implemented')
const updateFieldFilterInputProxys = () => console.log('updateFieldFilterInputProxys not yet implemented')
const deleteFieldFilterInputProxy = () => console.log('deleteFieldFilterInputProxy not yet implemented')
const deleteFieldFilterInputProxys = () => console.log('deleteFieldFilterInputProxys not yet implemented')
const simulation = ( { id } ) => CKG.queryOne("a4717e67-a026-400c-a459-8661465769cd",id,true)
const simulations = ( { ids } ) => CKG.queryMany("a4717e67-a026-400c-a459-8661465769cd",ids,true)
const allSimulations = ( ) => CKG.queryAll("a4717e67-a026-400c-a459-8661465769cd",true)
const simulationFilter = ( { filters } ) => CKG.filter("a4717e67-a026-400c-a459-8661465769cd", filters )
const addSimulation = () => console.log('addSimulation not yet implemented')
const addSimulations = () => console.log('addSimulations not yet implemented')
const updateSimulation = () => console.log('updateSimulation not yet implemented')
const updateSimulations = () => console.log('updateSimulations not yet implemented')
const deleteSimulation = () => console.log('deleteSimulation not yet implemented')
const deleteSimulations = () => console.log('deleteSimulations not yet implemented')
const state = ( { id } ) => CKG.queryOne("3221e674-147c-48aa-b199-d9fa674eaa43",id,true)
const states = ( { ids } ) => CKG.queryMany("3221e674-147c-48aa-b199-d9fa674eaa43",ids,true)
const allStates = ( ) => CKG.queryAll("3221e674-147c-48aa-b199-d9fa674eaa43",true)
const stateFilter = ( { filters } ) => CKG.filter("3221e674-147c-48aa-b199-d9fa674eaa43", filters )
const addState = () => console.log('addState not yet implemented')
const addStates = () => console.log('addStates not yet implemented')
const updateState = () => console.log('updateState not yet implemented')
const updateStates = () => console.log('updateStates not yet implemented')
const deleteState = () => console.log('deleteState not yet implemented')
const deleteStates = () => console.log('deleteStates not yet implemented')
const location = ( { id } ) => CKG.queryOne("b040cdd9-6e82-4963-9002-4e7c42161414",id,true)
const locations = ( { ids } ) => CKG.queryMany("b040cdd9-6e82-4963-9002-4e7c42161414",ids,true)
const allLocations = ( ) => CKG.queryAll("b040cdd9-6e82-4963-9002-4e7c42161414",true)
const locationFilter = ( { filters } ) => CKG.filter("b040cdd9-6e82-4963-9002-4e7c42161414", filters )
const addLocation = () => console.log('addLocation not yet implemented')
const addLocations = () => console.log('addLocations not yet implemented')
const updateLocation = () => console.log('updateLocation not yet implemented')
const updateLocations = () => console.log('updateLocations not yet implemented')
const deleteLocation = () => console.log('deleteLocation not yet implemented')
const deleteLocations = () => console.log('deleteLocations not yet implemented')
const counterpartyUnion = ( { id } ) => CKG.queryOne("398febd1-1460-4fe2-abc8-58a4f0d57698",id,true)
const counterpartyUnions = ( { ids } ) => CKG.queryMany("398febd1-1460-4fe2-abc8-58a4f0d57698",ids,true)
const allCounterpartyUnions = ( ) => CKG.queryAll("398febd1-1460-4fe2-abc8-58a4f0d57698",true)
const counterpartyUnionFilter = ( { filters } ) => CKG.filter("398febd1-1460-4fe2-abc8-58a4f0d57698", filters )
const addCounterpartyUnion = () => console.log('addCounterpartyUnion not yet implemented')
const addCounterpartyUnions = () => console.log('addCounterpartyUnions not yet implemented')
const updateCounterpartyUnion = () => console.log('updateCounterpartyUnion not yet implemented')
const updateCounterpartyUnions = () => console.log('updateCounterpartyUnions not yet implemented')
const deleteCounterpartyUnion = () => console.log('deleteCounterpartyUnion not yet implemented')
const deleteCounterpartyUnions = () => console.log('deleteCounterpartyUnions not yet implemented')
const resourceTransferInputProxy = ( { id } ) => CKG.queryOne("22a236b2-26d5-4f13-b5fb-6e5bb9fb364c",id,true)
const resourceTransferInputProxys = ( { ids } ) => CKG.queryMany("22a236b2-26d5-4f13-b5fb-6e5bb9fb364c",ids,true)
const allResourceTransferInputProxys = ( ) => CKG.queryAll("22a236b2-26d5-4f13-b5fb-6e5bb9fb364c",true)
const resourceTransferInputProxyFilter = ( { filters } ) => CKG.filter("22a236b2-26d5-4f13-b5fb-6e5bb9fb364c", filters )
const addResourceTransferInputProxy = () => console.log('addResourceTransferInputProxy not yet implemented')
const addResourceTransferInputProxys = () => console.log('addResourceTransferInputProxys not yet implemented')
const updateResourceTransferInputProxy = () => console.log('updateResourceTransferInputProxy not yet implemented')
const updateResourceTransferInputProxys = () => console.log('updateResourceTransferInputProxys not yet implemented')
const deleteResourceTransferInputProxy = () => console.log('deleteResourceTransferInputProxy not yet implemented')
const deleteResourceTransferInputProxys = () => console.log('deleteResourceTransferInputProxys not yet implemented')
const resourceTransferUpdates = ( { id } ) => CKG.queryOne("d243197d-f7e3-4728-959b-fd7dcbd0febe",id,true)
const resourceTransferUpdatess = ( { ids } ) => CKG.queryMany("d243197d-f7e3-4728-959b-fd7dcbd0febe",ids,true)
const allResourceTransferUpdatess = ( ) => CKG.queryAll("d243197d-f7e3-4728-959b-fd7dcbd0febe",true)
const resourceTransferUpdatesFilter = ( { filters } ) => CKG.filter("d243197d-f7e3-4728-959b-fd7dcbd0febe", filters )
const addResourceTransferUpdates = () => console.log('addResourceTransferUpdates not yet implemented')
const addResourceTransferUpdatess = () => console.log('addResourceTransferUpdatess not yet implemented')
const updateResourceTransferUpdates = () => console.log('updateResourceTransferUpdates not yet implemented')
const updateResourceTransferUpdatess = () => console.log('updateResourceTransferUpdatess not yet implemented')
const deleteResourceTransferUpdates = () => console.log('deleteResourceTransferUpdates not yet implemented')
const deleteResourceTransferUpdatess = () => console.log('deleteResourceTransferUpdatess not yet implemented')
const fullState = ( { id } ) => CKG.queryOne("08145ff1-6f06-4d77-b98b-df5c34ec1df8",id,true)
const fullStates = ( { ids } ) => CKG.queryMany("08145ff1-6f06-4d77-b98b-df5c34ec1df8",ids,true)
const allFullStates = ( ) => CKG.queryAll("08145ff1-6f06-4d77-b98b-df5c34ec1df8",true)
const fullStateFilter = ( { filters } ) => CKG.filter("08145ff1-6f06-4d77-b98b-df5c34ec1df8", filters )
const addFullState = () => console.log('addFullState not yet implemented')
const addFullStates = () => console.log('addFullStates not yet implemented')
const updateFullState = () => console.log('updateFullState not yet implemented')
const updateFullStates = () => console.log('updateFullStates not yet implemented')
const deleteFullState = () => console.log('deleteFullState not yet implemented')
const deleteFullStates = () => console.log('deleteFullStates not yet implemented')
const simulationInputProxy = ( { id } ) => CKG.queryOne("cc416214-48a8-4609-a9fa-eb26cbec925a",id,true)
const simulationInputProxys = ( { ids } ) => CKG.queryMany("cc416214-48a8-4609-a9fa-eb26cbec925a",ids,true)
const allSimulationInputProxys = ( ) => CKG.queryAll("cc416214-48a8-4609-a9fa-eb26cbec925a",true)
const simulationInputProxyFilter = ( { filters } ) => CKG.filter("cc416214-48a8-4609-a9fa-eb26cbec925a", filters )
const addSimulationInputProxy = () => console.log('addSimulationInputProxy not yet implemented')
const addSimulationInputProxys = () => console.log('addSimulationInputProxys not yet implemented')
const updateSimulationInputProxy = () => console.log('updateSimulationInputProxy not yet implemented')
const updateSimulationInputProxys = () => console.log('updateSimulationInputProxys not yet implemented')
const deleteSimulationInputProxy = () => console.log('deleteSimulationInputProxy not yet implemented')
const deleteSimulationInputProxys = () => console.log('deleteSimulationInputProxys not yet implemented')
const resourceTransfer = ( { id } ) => CKG.queryOne("0b141264-abec-41ac-8978-7e7577f45a83",id,true)
const resourceTransfers = ( { ids } ) => CKG.queryMany("0b141264-abec-41ac-8978-7e7577f45a83",ids,true)
const allResourceTransfers = ( ) => CKG.queryAll("0b141264-abec-41ac-8978-7e7577f45a83",true)
const resourceTransferFilter = ( { filters } ) => CKG.filter("0b141264-abec-41ac-8978-7e7577f45a83", filters )
const addResourceTransfer = () => console.log('addResourceTransfer not yet implemented')
const addResourceTransfers = () => console.log('addResourceTransfers not yet implemented')
const updateResourceTransfer = () => console.log('updateResourceTransfer not yet implemented')
const updateResourceTransfers = () => console.log('updateResourceTransfers not yet implemented')
const deleteResourceTransfer = () => console.log('deleteResourceTransfer not yet implemented')
const deleteResourceTransfers = () => console.log('deleteResourceTransfers not yet implemented')
const resourceTransferTypeEnum = ( { id } ) => CKG.queryOne("cf9cb5f6-da85-45c0-84cc-78655372188c",id,true)
const resourceTransferTypeEnums = ( { ids } ) => CKG.queryMany("cf9cb5f6-da85-45c0-84cc-78655372188c",ids,true)
const allResourceTransferTypeEnums = ( ) => CKG.queryAll("cf9cb5f6-da85-45c0-84cc-78655372188c",true)
const resourceTransferTypeEnumFilter = ( { filters } ) => CKG.filter("cf9cb5f6-da85-45c0-84cc-78655372188c", filters )
const addResourceTransferTypeEnum = () => console.log('addResourceTransferTypeEnum not yet implemented')
const addResourceTransferTypeEnums = () => console.log('addResourceTransferTypeEnums not yet implemented')
const updateResourceTransferTypeEnum = () => console.log('updateResourceTransferTypeEnum not yet implemented')
const updateResourceTransferTypeEnums = () => console.log('updateResourceTransferTypeEnums not yet implemented')
const deleteResourceTransferTypeEnum = () => console.log('deleteResourceTransferTypeEnum not yet implemented')
const deleteResourceTransferTypeEnums = () => console.log('deleteResourceTransferTypeEnums not yet implemented')
const resourceTransferStatusEnum = ( { id } ) => CKG.queryOne("98c33f74-cd99-43b5-94eb-e6f801704259",id,true)
const resourceTransferStatusEnums = ( { ids } ) => CKG.queryMany("98c33f74-cd99-43b5-94eb-e6f801704259",ids,true)
const allResourceTransferStatusEnums = ( ) => CKG.queryAll("98c33f74-cd99-43b5-94eb-e6f801704259",true)
const resourceTransferStatusEnumFilter = ( { filters } ) => CKG.filter("98c33f74-cd99-43b5-94eb-e6f801704259", filters )
const addResourceTransferStatusEnum = () => console.log('addResourceTransferStatusEnum not yet implemented')
const addResourceTransferStatusEnums = () => console.log('addResourceTransferStatusEnums not yet implemented')
const updateResourceTransferStatusEnum = () => console.log('updateResourceTransferStatusEnum not yet implemented')
const updateResourceTransferStatusEnums = () => console.log('updateResourceTransferStatusEnums not yet implemented')
const deleteResourceTransferStatusEnum = () => console.log('deleteResourceTransferStatusEnum not yet implemented')
const deleteResourceTransferStatusEnums = () => console.log('deleteResourceTransferStatusEnums not yet implemented')
const actions = ( { id } ) => CKG.queryOne("9a29189a-ac6c-4939-bd20-536b8b73ce0c",id,true)
const actionss = ( { ids } ) => CKG.queryMany("9a29189a-ac6c-4939-bd20-536b8b73ce0c",ids,true)
const allActionss = ( ) => CKG.queryAll("9a29189a-ac6c-4939-bd20-536b8b73ce0c",true)
const actionsFilter = ( { filters } ) => CKG.filter("9a29189a-ac6c-4939-bd20-536b8b73ce0c", filters )
const addActions = () => console.log('addActions not yet implemented')
const addActionss = () => console.log('addActionss not yet implemented')
const updateActions = () => console.log('updateActions not yet implemented')
const updateActionss = () => console.log('updateActionss not yet implemented')
const deleteActions = () => console.log('deleteActions not yet implemented')
const deleteActionss = () => console.log('deleteActionss not yet implemented')
const repairAction = ( { id } ) => CKG.queryOne("9436b782-4302-411a-ad33-9190838ed470",id,true)
const repairActions = ( { ids } ) => CKG.queryMany("9436b782-4302-411a-ad33-9190838ed470",ids,true)
const allRepairActions = ( ) => CKG.queryAll("9436b782-4302-411a-ad33-9190838ed470",true)
const repairActionFilter = ( { filters } ) => CKG.filter("9436b782-4302-411a-ad33-9190838ed470", filters )
const addRepairAction = () => console.log('addRepairAction not yet implemented')
const addRepairActions = () => console.log('addRepairActions not yet implemented')
const updateRepairAction = () => console.log('updateRepairAction not yet implemented')
const updateRepairActions = () => console.log('updateRepairActions not yet implemented')
const deleteRepairAction = () => console.log('deleteRepairAction not yet implemented')
const deleteRepairActions = () => console.log('deleteRepairActions not yet implemented')
const transitAction = ( { id } ) => CKG.queryOne("90957fa0-0270-4c8b-a324-badd3e7255a8",id,true)
const transitActions = ( { ids } ) => CKG.queryMany("90957fa0-0270-4c8b-a324-badd3e7255a8",ids,true)
const allTransitActions = ( ) => CKG.queryAll("90957fa0-0270-4c8b-a324-badd3e7255a8",true)
const transitActionFilter = ( { filters } ) => CKG.filter("90957fa0-0270-4c8b-a324-badd3e7255a8", filters )
const addTransitAction = () => console.log('addTransitAction not yet implemented')
const addTransitActions = () => console.log('addTransitActions not yet implemented')
const updateTransitAction = () => console.log('updateTransitAction not yet implemented')
const updateTransitActions = () => console.log('updateTransitActions not yet implemented')
const deleteTransitAction = () => console.log('deleteTransitAction not yet implemented')
const deleteTransitActions = () => console.log('deleteTransitActions not yet implemented')
const transferAction = ( { id } ) => CKG.queryOne("ae83ceab-5a40-4360-8126-977e49d8229b",id,true)
const transferActions = ( { ids } ) => CKG.queryMany("ae83ceab-5a40-4360-8126-977e49d8229b",ids,true)
const allTransferActions = ( ) => CKG.queryAll("ae83ceab-5a40-4360-8126-977e49d8229b",true)
const transferActionFilter = ( { filters } ) => CKG.filter("ae83ceab-5a40-4360-8126-977e49d8229b", filters )
const addTransferAction = () => console.log('addTransferAction not yet implemented')
const addTransferActions = () => console.log('addTransferActions not yet implemented')
const updateTransferAction = () => console.log('updateTransferAction not yet implemented')
const updateTransferActions = () => console.log('updateTransferActions not yet implemented')
const deleteTransferAction = () => console.log('deleteTransferAction not yet implemented')
const deleteTransferActions = () => console.log('deleteTransferActions not yet implemented')
const stateUpdateProxy = ( { id } ) => CKG.queryOne("f7f10fcc-464c-435d-8d09-7cb3d61d0b93",id,true)
const stateUpdateProxys = ( { ids } ) => CKG.queryMany("f7f10fcc-464c-435d-8d09-7cb3d61d0b93",ids,true)
const allStateUpdateProxys = ( ) => CKG.queryAll("f7f10fcc-464c-435d-8d09-7cb3d61d0b93",true)
const stateUpdateProxyFilter = ( { filters } ) => CKG.filter("f7f10fcc-464c-435d-8d09-7cb3d61d0b93", filters )
const addStateUpdateProxy = () => console.log('addStateUpdateProxy not yet implemented')
const addStateUpdateProxys = () => console.log('addStateUpdateProxys not yet implemented')
const updateStateUpdateProxy = () => console.log('updateStateUpdateProxy not yet implemented')
const updateStateUpdateProxys = () => console.log('updateStateUpdateProxys not yet implemented')
const deleteStateUpdateProxy = () => console.log('deleteStateUpdateProxy not yet implemented')
const deleteStateUpdateProxys = () => console.log('deleteStateUpdateProxys not yet implemented')
const stateUpdates = ( { id } ) => CKG.queryOne("10baf86e-1109-4f89-8549-4a94b0709e1c",id,true)
const stateUpdatess = ( { ids } ) => CKG.queryMany("10baf86e-1109-4f89-8549-4a94b0709e1c",ids,true)
const allStateUpdatess = ( ) => CKG.queryAll("10baf86e-1109-4f89-8549-4a94b0709e1c",true)
const stateUpdatesFilter = ( { filters } ) => CKG.filter("10baf86e-1109-4f89-8549-4a94b0709e1c", filters )
const addStateUpdates = () => console.log('addStateUpdates not yet implemented')
const addStateUpdatess = () => console.log('addStateUpdatess not yet implemented')
const updateStateUpdates = () => console.log('updateStateUpdates not yet implemented')
const updateStateUpdatess = () => console.log('updateStateUpdatess not yet implemented')
const deleteStateUpdates = () => console.log('deleteStateUpdates not yet implemented')
const deleteStateUpdatess = () => console.log('deleteStateUpdatess not yet implemented')
const routingPayload = ( { id } ) => CKG.queryOne("b401123d-a006-4afe-9027-336cd3557f6e",id,true)
const routingPayloads = ( { ids } ) => CKG.queryMany("b401123d-a006-4afe-9027-336cd3557f6e",ids,true)
const allRoutingPayloads = ( ) => CKG.queryAll("b401123d-a006-4afe-9027-336cd3557f6e",true)
const routingPayloadFilter = ( { filters } ) => CKG.filter("b401123d-a006-4afe-9027-336cd3557f6e", filters )
const addRoutingPayload = () => console.log('addRoutingPayload not yet implemented')
const addRoutingPayloads = () => console.log('addRoutingPayloads not yet implemented')
const updateRoutingPayload = () => console.log('updateRoutingPayload not yet implemented')
const updateRoutingPayloads = () => console.log('updateRoutingPayloads not yet implemented')
const deleteRoutingPayload = () => console.log('deleteRoutingPayload not yet implemented')
const deleteRoutingPayloads = () => console.log('deleteRoutingPayloads not yet implemented')
const fieldValueProxy = ( { id } ) => CKG.queryOne("3d93a75c-cde4-4bd5-95cf-39ad31fae353",id,true)
const fieldValueProxys = ( { ids } ) => CKG.queryMany("3d93a75c-cde4-4bd5-95cf-39ad31fae353",ids,true)
const allFieldValueProxys = ( ) => CKG.queryAll("3d93a75c-cde4-4bd5-95cf-39ad31fae353",true)
const fieldValueProxyFilter = ( { filters } ) => CKG.filter("3d93a75c-cde4-4bd5-95cf-39ad31fae353", filters )
const addFieldValueProxy = () => console.log('addFieldValueProxy not yet implemented')
const addFieldValueProxys = () => console.log('addFieldValueProxys not yet implemented')
const updateFieldValueProxy = () => console.log('updateFieldValueProxy not yet implemented')
const updateFieldValueProxys = () => console.log('updateFieldValueProxys not yet implemented')
const deleteFieldValueProxy = () => console.log('deleteFieldValueProxy not yet implemented')
const deleteFieldValueProxys = () => console.log('deleteFieldValueProxys not yet implemented')

module.exports = {
    rewriteID,
    cascadeDelete,
    newSim,
    defaultScenario,
    makeSimID,
    constructState,
    projectTransferUpdateFromResourceTransferUpdates,
    projectResourcesFromResourceTransferUpdates,
    selectResourceTransfer,
    makeResourceTransfer,
    pending,
    deleteResourceTransferFilter,
    makeResourceTransferFilters,
    projectIdFromResourceTransfer,
    sinkStepResourceTransfer,
    constructFullState,
    projectVehicleFromResourceTransfer,
    projectCounterpartyFromResourceTransfer,
    projectSimFromResourceTransfer,
    projectSimUpdateFromResourceTransferUpdates,
    sinkEvaluateState,
    deleteVehicleTransitOrderSync,
    loadState,
    projectSimFromTransferAction,
    projectVehicleFromTransferAction,
    projectCounterpartyFromTransferAction,
    projectResourceTypeFromTransferAction,
    projectQuantityFromTransferAction,
    projectTransferTypeFromTransferAction,
    makeSimulationFilters,
    projectSimFromState,
    projectIdFromTransitAction,
    projectSimFromTransitAction,
    projectVehicleFromTransitAction,
    projectDestXFromTransitAction,
    projectDestYFromTransitAction,
    projectIdFromSimulation,
    projectIdFromFullState,
    newSimResourceTransfers,
    projectSimFromRepairAction,
    projectVehicleFromRepairAction,
    projectHubFromRepairAction,
    cascadeDeleteMany,
    selectSimulation,
    projectSimFromFullState,
    constructRepairAction,
    stepState,
    projectCitiesFromState,
    projectProducersFromState,
    projectHubsFromState,
    projectVehiclesFromState,
    projectTransfersFromState,
    constructTransitAction,
    deleteSimulationFilter,
    constructActions,
    constructTransferAction,
    projectTransitActionsFromActions,
    projectRepairActionsFromActions,
    projectTransferActionsFromActions,
    aggregateStateUpdates,
    projectTransitOrdersFromState_Copy,
    sinkSaveState,
    projectSimulationFromStateUpdates,
    projectCitiesFromStateUpdates,
    projectProducersFromStateUpdates,
    projectHubsFromStateUpdates,
    projectVehiclesFromStateUpdates,
    projectResourcesFromStateUpdates,
    projectTransitOrdersFromStateUpdates,
    projectResourceTransfersFromStateUpdates,
    stepCities,
    projectStateFromStateUpdates,
    emptyTransitOrders,
    issueTransferOrders,
    issueTransitOrders,
    saveState,
    pickActions,
    loadStateFromSelections,
    transferResources,
    simulate,
    issueRepairOrders,
    projectTransitOrdersFromState,
    repairVehicles,
    issueOrders,
    adjustPrices,
    pickState,
    incrementSimSteps,
    reindexState,
    manufactureProducts,
    testSim,
    dumpInputs,
    projectfromXFromRoutingPayload,
    projectMapAndTilesFromState,
    projectVehicleTypeFromRoutingPayload,
    projectToYFromRoutingPayload,
    routeRepairActions,
    makeRepairRoutingPayloads,
    projectMapAndTilesFromRoutingPayload,
    moveVehicles,
    issueRepairRoutedRepairOrders,
    projectWaypointsForStateUpdates,
    projectFromYFromRoutingPayload,
    projectToXFromRoutingPayload,
    routeRepairOrders,
    makeTransitOrderFromPayloadAndRoute,
    fieldFilterInputProxy,
    fieldFilterInputProxys,
    allFieldFilterInputProxys,
    fieldFilterInputProxyFilter,
    addFieldFilterInputProxy,
    addFieldFilterInputProxys,
    updateFieldFilterInputProxy,
    updateFieldFilterInputProxys,
    deleteFieldFilterInputProxy,
    deleteFieldFilterInputProxys,
    simulation,
    simulations,
    allSimulations,
    simulationFilter,
    addSimulation,
    addSimulations,
    updateSimulation,
    updateSimulations,
    deleteSimulation,
    deleteSimulations,
    state,
    states,
    allStates,
    stateFilter,
    addState,
    addStates,
    updateState,
    updateStates,
    deleteState,
    deleteStates,
    location,
    locations,
    allLocations,
    locationFilter,
    addLocation,
    addLocations,
    updateLocation,
    updateLocations,
    deleteLocation,
    deleteLocations,
    counterpartyUnion,
    counterpartyUnions,
    allCounterpartyUnions,
    counterpartyUnionFilter,
    addCounterpartyUnion,
    addCounterpartyUnions,
    updateCounterpartyUnion,
    updateCounterpartyUnions,
    deleteCounterpartyUnion,
    deleteCounterpartyUnions,
    resourceTransferInputProxy,
    resourceTransferInputProxys,
    allResourceTransferInputProxys,
    resourceTransferInputProxyFilter,
    addResourceTransferInputProxy,
    addResourceTransferInputProxys,
    updateResourceTransferInputProxy,
    updateResourceTransferInputProxys,
    deleteResourceTransferInputProxy,
    deleteResourceTransferInputProxys,
    resourceTransferUpdates,
    resourceTransferUpdatess,
    allResourceTransferUpdatess,
    resourceTransferUpdatesFilter,
    addResourceTransferUpdates,
    addResourceTransferUpdatess,
    updateResourceTransferUpdates,
    updateResourceTransferUpdatess,
    deleteResourceTransferUpdates,
    deleteResourceTransferUpdatess,
    fullState,
    fullStates,
    allFullStates,
    fullStateFilter,
    addFullState,
    addFullStates,
    updateFullState,
    updateFullStates,
    deleteFullState,
    deleteFullStates,
    simulationInputProxy,
    simulationInputProxys,
    allSimulationInputProxys,
    simulationInputProxyFilter,
    addSimulationInputProxy,
    addSimulationInputProxys,
    updateSimulationInputProxy,
    updateSimulationInputProxys,
    deleteSimulationInputProxy,
    deleteSimulationInputProxys,
    resourceTransfer,
    resourceTransfers,
    allResourceTransfers,
    resourceTransferFilter,
    addResourceTransfer,
    addResourceTransfers,
    updateResourceTransfer,
    updateResourceTransfers,
    deleteResourceTransfer,
    deleteResourceTransfers,
    resourceTransferTypeEnum,
    resourceTransferTypeEnums,
    allResourceTransferTypeEnums,
    resourceTransferTypeEnumFilter,
    addResourceTransferTypeEnum,
    addResourceTransferTypeEnums,
    updateResourceTransferTypeEnum,
    updateResourceTransferTypeEnums,
    deleteResourceTransferTypeEnum,
    deleteResourceTransferTypeEnums,
    resourceTransferStatusEnum,
    resourceTransferStatusEnums,
    allResourceTransferStatusEnums,
    resourceTransferStatusEnumFilter,
    addResourceTransferStatusEnum,
    addResourceTransferStatusEnums,
    updateResourceTransferStatusEnum,
    updateResourceTransferStatusEnums,
    deleteResourceTransferStatusEnum,
    deleteResourceTransferStatusEnums,
    actions,
    actionss,
    allActionss,
    actionsFilter,
    addActions,
    addActionss,
    updateActions,
    updateActionss,
    deleteActions,
    deleteActionss,
    repairAction,
    repairActions,
    allRepairActions,
    repairActionFilter,
    addRepairAction,
    addRepairActions,
    updateRepairAction,
    updateRepairActions,
    deleteRepairAction,
    deleteRepairActions,
    transitAction,
    transitActions,
    allTransitActions,
    transitActionFilter,
    addTransitAction,
    addTransitActions,
    updateTransitAction,
    updateTransitActions,
    deleteTransitAction,
    deleteTransitActions,
    transferAction,
    transferActions,
    allTransferActions,
    transferActionFilter,
    addTransferAction,
    addTransferActions,
    updateTransferAction,
    updateTransferActions,
    deleteTransferAction,
    deleteTransferActions,
    stateUpdateProxy,
    stateUpdateProxys,
    allStateUpdateProxys,
    stateUpdateProxyFilter,
    addStateUpdateProxy,
    addStateUpdateProxys,
    updateStateUpdateProxy,
    updateStateUpdateProxys,
    deleteStateUpdateProxy,
    deleteStateUpdateProxys,
    stateUpdates,
    stateUpdatess,
    allStateUpdatess,
    stateUpdatesFilter,
    addStateUpdates,
    addStateUpdatess,
    updateStateUpdates,
    updateStateUpdatess,
    deleteStateUpdates,
    deleteStateUpdatess,
    routingPayload,
    routingPayloads,
    allRoutingPayloads,
    routingPayloadFilter,
    addRoutingPayload,
    addRoutingPayloads,
    updateRoutingPayload,
    updateRoutingPayloads,
    deleteRoutingPayload,
    deleteRoutingPayloads,
    fieldValueProxy,
    fieldValueProxys,
    allFieldValueProxys,
    fieldValueProxyFilter,
    addFieldValueProxy,
    addFieldValueProxys,
    updateFieldValueProxy,
    updateFieldValueProxys,
    deleteFieldValueProxy,
    deleteFieldValueProxys
}