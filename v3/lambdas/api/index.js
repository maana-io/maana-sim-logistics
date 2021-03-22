const fs = require("fs");
const CKG = require("../CKG/ckg.js")
const maanaSimLogisticsSimulatorV3 = require('../Simulator: SimLogistics (v3)/index.js')
const maanaSimLogisticsMapV3 = require('../Map: SimLogistics (v3)/index.js')
const maanaSimLogisticsCityV3 = require('../City: SimLogistics (v3)/index.js')
const maanaSimLogisticsHubV3 = require('../Hub: SimLogistics (v3)/index.js')
const maanaSimLogisticsProducerV3 = require('../Producer: SimLogistics (v3)/index.js')
const maanaSimLogisticsVehicleV3 = require('../Vehicle: SimLogistics (v3)/index.js')

/** 
  * @param hub 
  */
function hubMapEntity( input ) {
    const BODY = fs.readFileSync('./API: SimLogistics (v3)/hubMapEntity.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicle 
  */
function vehicleMapVehicle( input ) {
    const BODY = fs.readFileSync('./API: SimLogistics (v3)/vehicleMapVehicle.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param producer 
  */
function producerMapEntity( input ) {
    const BODY = fs.readFileSync('./API: SimLogistics (v3)/producerMapEntity.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param city 
  */
function cityMapEntity( input ) {
    const BODY = fs.readFileSync('./API: SimLogistics (v3)/cityMapEntity.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param cities 
  * @param hubs 
  * @param producers 
  */
function mergeMapEntities( input ) {
    const BODY = fs.readFileSync('./API: SimLogistics (v3)/mergeMapEntities.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  */
function loadState( input ) {
    const X0 = maanaSimLogisticsSimulatorV3.loadState({id: input.sim})
    return X0
}

/** 
  * @param sim 
  * @param type 
  * @param x 
  * @param y 
  */
function selectProducer( input ) {
    const X0 = maanaSimLogisticsProducerV3.selectProducer({sim: input.sim,type: input.type,x: input.x,y: input.y})
    return X0
}

/** 
  * @param name 
  * @param agentEndpoint 
  */
function overwriteSimulation( input ) {
    const X0 = selectSimulation({name: input.name,agentEndpoint: input.agentEndpoint})
    const X1 = X0.map( x => maanaSimLogisticsSimulatorV3.maanaSimLogisticsSimulatorV3.projectIdFromSimulation({ simulation: x}) )
    const X2 = maanaSimLogisticsSimulatorV3.cascadeDeleteMany({ids: X1})
    const X3 = sinkOverwriteSimulation({states: X2,name: input.name})
    const X4 = maanaSimLogisticsSimulatorV3.newSim({name: X3,agentEndpoint: input.agentEndpoint})
    return X4
}

/** 
  * @param sim 
  * @param type 
  * @param hub 
  * @param x 
  * @param y 
  */
function selectVehicle( input ) {
    const X0 = maanaSimLogisticsVehicleV3.selectVehicle({sim: input.sim,type: input.type,hub: input.hub,x: input.x,y: input.y})
    return X0
}

/** 
  * @param sim 
  */
function stepSimulation( input ) {

}

/** 
  * @param orders 
  */
function projectTransitOrdersFromOrders( input ) {
    const BODY = fs.readFileSync('./API: SimLogistics (v3)/projectTransitOrdersFromOrders.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param orders 
  */
function projectRepairOrdersFromOrders( input ) {
    const BODY = fs.readFileSync('./API: SimLogistics (v3)/projectRepairOrdersFromOrders.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param orders 
  */
function projectTransferOrdersFromOrders( input ) {
    const BODY = fs.readFileSync('./API: SimLogistics (v3)/projectTransferOrdersFromOrders.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param x 
  * @param y 
  */
function selectCity( input ) {
    const X0 = maanaSimLogisticsCityV3.selectCity({y: input.y,sim: input.sim,x: input.x})
    return X0
}

/** 
  * @param name 
  * @param agentEndpoint 
  */
function newSimulation( input ) {
    const X0 = maanaSimLogisticsSimulatorV3.newSim({agentEndpoint: input.agentEndpoint,name: input.name})
    return X0
}

/** 
  * @param sim 
  * @param vehicle 
  * @param destX 
  * @param destY 
  */
function moveVehicleTo( input ) {
    const X0 = maanaSimLogisticsVehicleV3.moveVehicleTo({sim: input.sim,vehicle: input.vehicle,destX: input.destX,destY: input.destY})
    return X0
}

/** 
  * @param id 
  */
function deleteSimulation( input ) {
    const X0 = maanaSimLogisticsSimulatorV3.cascadeDelete({sim: input.id})
    const X1 = maanaSimLogisticsSimulatorV3.projectSimFromFullState({fullState: X0})
    return X1
}

/** 
  * @param name 
  * @param agentEndpoint 
  */
function selectSimulation( input ) {
    const X0 = maanaSimLogisticsSimulatorV3.selectSimulation({name: input.name,agentEndpoint: input.agentEndpoint})
    return X0
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
    const X0 = maanaSimLogisticsSimulatorV3.selectResourceTransfer({transferType: input.transferType,vehicle: input.vehicle,counterparty: input.counterparty,resourceType: input.resourceType,status: input.status,sim: input.sim})
    return X0
}

/** 
  * @param id 
  * @param sim 
  * @param cities 
  * @param producers 
  * @param hubs 
  * @param vehicles 
  * @param transfers 
  */
function constructState( input ) {
    const X0 = maanaSimLogisticsSimulatorV3.constructState({id: input.id,sim: input.sim,cities: input.cities,producers: input.producers,hubs: input.hubs,vehicles: input.vehicles,transfers: input.transfers})
    return X0
}

/** 
  * @param states 
  * @param name 
  */
function sinkOverwriteSimulation( input ) {
    const BODY = fs.readFileSync('./API: SimLogistics (v3)/sinkOverwriteSimulation.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param id 
  */
function testsim( input ) {
    const X0 = loadState({sim: input.id})
    const X1 = simulate({state: X0})
    return X1
}

/** 
  * @param actions 
  */
function issueActions_Copy( input ) {

    return X-1
}

/** 
  * @param actions 
  */
function issueActions( input ) {

}

/** 
  * @param state 
  * @param actions 
  */
function simulate( input ) {
    const X0 = maanaSimLogisticsSimulatorV3.simulate({state: input.state,actions: input.actions})
    return X0
}

/** 
  * @param state 
  */
function saveState( input ) {
    const X0 = maanaSimLogisticsSimulatorV3.saveState({state: input.state})
    return X0
}

/** 
  * @param map 
  */
function mapAndTiles( input ) {
    const X0 = maanaSimLogisticsMapV3.mapAndTiles({map: input.map})
    return X0
}

/** 
  * @param vehicleType 
  * @param fromX 
  * @param fromY 
  * @param toX 
  * @param toY 
  * @param mapAndTiles 
  */
function routeVehicle( input ) {
    const X0 = maanaSimLogisticsMapV3.routeVehicle({vehicleType: input.vehicleType,fromX: input.fromX,fromY: input.fromY,toX: input.toX,toY: input.toY,mapAndTiles: input.mapAndTiles})
    return X0
}

/** 
  * @param waypoint 
  */
function projectXFromWaypoint( input ) {
    const BODY = fs.readFileSync('./API: SimLogistics (v3)/projectXFromWaypoint.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param waypoint 
  */
function projectYFromWaypoint( input ) {
    const BODY = fs.readFileSync('./API: SimLogistics (v3)/projectYFromWaypoint.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicle 
  */
function projectTypeFromVehicle( input ) {
    const BODY = fs.readFileSync('./API: SimLogistics (v3)/projectTypeFromVehicle.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}



module.exports = {
    hubMapEntity,
    vehicleMapVehicle,
    producerMapEntity,
    cityMapEntity,
    mergeMapEntities,
    loadState,
    selectProducer,
    overwriteSimulation,
    selectVehicle,
    stepSimulation,
    projectTransitOrdersFromOrders,
    projectRepairOrdersFromOrders,
    projectTransferOrdersFromOrders,
    selectCity,
    newSimulation,
    moveVehicleTo,
    deleteSimulation,
    selectSimulation,
    selectResourceTransfer,
    constructState,
    sinkOverwriteSimulation,
    testsim,
    issueActions_Copy,
    issueActions,
    simulate,
    saveState,
    mapAndTiles,
    routeVehicle,
    projectXFromWaypoint,
    projectYFromWaypoint,
    projectTypeFromVehicle
}