const fs = require("fs");
const CKG = require("../CKG/ckg.js")
const maanaSimLogisticsResourceV3 = require('../Resource: SimLogistics (v3)/index.js')
const maanaSimLogisticsVehicleV3 = require('../Vehicle: SimLogistics (v3)/index.js')
const maanaSimLogisticsSimulatorV3 = require('../Simulator: SimLogistics (v3)/index.js')

/** 
  * @param simHub 
  */
function projectSimFromSimHub( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/projectSimFromSimHub.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param simHub 
  */
function projectHubFromSimHub( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/projectHubFromSimHub.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  */
function stepHubs( input ) {
    const X0 = selectHub({sim: input.sim})
    const X1 = stepGivenHubs({hubs: X0})
    return X1
}

/** 
  * @param hub 
  */
function stepHub( input ) {
    const X0 = _TODO_({hub: input.hub})
    return X0
}

/** 
  * @param scenario 
  * @param sim 
  */
function newSimHubs( input ) {
    const X0 = selectHub({sim: input.scenario})
    const X1 = cloneHubsForSim({hubs: X0,sim: input.sim})
    const X2 = hubs({ids: X1})
    return X2
}

/** 
  * @param sim 
  * @param type 
  * @param x 
  * @param y 
  * @param vehicleType 
  */
function selectHub( input ) {
    const X0 = makeHubFilters({sim: input.sim,type: input.type,x: input.x,y: input.y})
    const X1 = hubFilter({filters: X0})
    return X1
}

/** 
  * @param hubs 
  * @param sim 
  */
function cloneHubsForSim( input ) {
    const X0 = cloneHubsSuppliesForSim({hubs: input.hubs,sim: input.sim})
    const X1 = rewriteHubsForSim({hubs: X0,sim: input.sim})
    const X2 = addHubs({input: X1})
    return X2
}

/** 
  * @param sim 
  * @param vehicle 
  * @param hub 
  */
function repairVehicle( input ) {
    const X0 = hub({id: input.hub})
    const X1 = maanaSimLogisticsVehicleV3.transitStatusRepair()
    const X2 = projectYFromHub({hub: X0})
    const X3 = projectXFromHub({hub: X0})
    const X4 = maanaSimLogisticsVehicleV3.vehicle({id: input.vehicle})
    const X5 = maanaSimLogisticsVehicleV3.makeTransitOrder({destX: X3,destY: X2,status: X1,sim: input.sim,vehicle: input.vehicle})
    const X6 = validateRepairTransitOrder({repairTransitOrder: X5,vehicle: X4,hub: X0})
    const X7 = maanaSimLogisticsVehicleV3.applyAndSaveTransitOrder({newTransitOrder: X6,vehicle: X4})
    return X7
}

/** 
  * @param hubs 
  * @param sim 
  */
function cloneHubsSuppliesForSim( input ) {
    const X0 = zipSimHubs({hubs: input.hubs,sim: input.sim})
    const X1 = X0.map( x => cloneSimHubSupplies({ simHub: x}) )
    return X1
}

/** 
  * @param hub 
  */
function _TODO_( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/_TODO_.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param type 
  * @param x 
  * @param y 
  * @param vehicleType 
  */
function makeHubFilters( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/makeHubFilters.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicle 
  * @param hub 
  * @param repairTransitOrder 
  */
function validateRepairTransitOrder( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/validateRepairTransitOrder.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param hub 
  */
function projectVehicleTypeFromHub( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/projectVehicleTypeFromHub.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param hubs 
  * @param sim 
  */
function zipSimHubs( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/zipSimHubs.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param hub 
  * @param supplies 
  */
function replaceHubSupplies( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/replaceHubSupplies.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param type 
  * @param x 
  * @param y 
  * @param vehicleType 
  */
function deleteHubFilter( input ) {
    const X0 = selectHub({sim: input.sim,type: input.type,x: input.x,y: input.y,vehicleType: input.vehicleType})
    const X1 = X0.map( x => projectIdFromHub({ hub: x}) )
    const X2 = deleteHubs({ids: X1})
    return X2
}

/** 
  * @param hub 
  */
function projectIdFromHub( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/projectIdFromHub.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param hub 
  */
function projectTypeFromHub( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/projectTypeFromHub.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param hub 
  */
function projectXFromHub( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/projectXFromHub.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param hub 
  */
function projectYFromHub( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/projectYFromHub.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param hub 
  */
function projectSuppliesFromHub( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/projectSuppliesFromHub.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param hubs 
  * @param sim 
  */
function rewriteHubsForSim( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/rewriteHubsForSim.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param simHub 
  */
function cloneSimHubSupplies( input ) {
    const X0 = projectHubFromSimHub({simHub: input.simHub})
    const X1 = projectSimFromSimHub({simHub: input.simHub})
    const X2 = projectSuppliesFromHub({hub: X0})
    const X3 = maanaSimLogisticsResourceV3.cloneResourcesForSim({resources: X2,sim: X1})
    const X4 = maanaSimLogisticsResourceV3.resources({ids: X3})
    const X5 = replaceHubSupplies({supplies: X4,hub: X0})
    return X5
}

/** 
  * @param hubs 
  */
function stepGivenHubs( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/stepGivenHubs.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param hub 
  */
function addRepairSurchargeToHub( input ) {
    const BODY = fs.readFileSync('./Hub: SimLogistics (v3)/addRepairSurchargeToHub.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 

  */
function addRepairSurchargeToHubs( input ) {
    const X0 = allHubs()
    const X1 = X0.map( x => addRepairSurchargeToHub({ hub: x}) )
    const X2 = updateHubs({input: X1})
    return X2
}

const hub = ( { id } ) => CKG.queryOne("a5df0cbe-d572-4346-863c-fe47427cab02",id,true)
const hubs = ( { ids } ) => CKG.queryMany("a5df0cbe-d572-4346-863c-fe47427cab02",ids,true)
const allHubs = ( ) => CKG.queryAll("a5df0cbe-d572-4346-863c-fe47427cab02",true)
const hubFilter = ( { filters } ) => CKG.filter("a5df0cbe-d572-4346-863c-fe47427cab02", filters )
const addHub = () => console.log('addHub not yet implemented')
const addHubs = () => console.log('addHubs not yet implemented')
const updateHub = () => console.log('updateHub not yet implemented')
const updateHubs = () => console.log('updateHubs not yet implemented')
const deleteHub = () => console.log('deleteHub not yet implemented')
const deleteHubs = () => console.log('deleteHubs not yet implemented')
const hubInputProxy = ( { id } ) => CKG.queryOne("6d0b181c-3214-4820-8a02-9ef8a5519a8f",id,true)
const hubInputProxys = ( { ids } ) => CKG.queryMany("6d0b181c-3214-4820-8a02-9ef8a5519a8f",ids,true)
const allHubInputProxys = ( ) => CKG.queryAll("6d0b181c-3214-4820-8a02-9ef8a5519a8f",true)
const hubInputProxyFilter = ( { filters } ) => CKG.filter("6d0b181c-3214-4820-8a02-9ef8a5519a8f", filters )
const addHubInputProxy = () => console.log('addHubInputProxy not yet implemented')
const addHubInputProxys = () => console.log('addHubInputProxys not yet implemented')
const updateHubInputProxy = () => console.log('updateHubInputProxy not yet implemented')
const updateHubInputProxys = () => console.log('updateHubInputProxys not yet implemented')
const deleteHubInputProxy = () => console.log('deleteHubInputProxy not yet implemented')
const deleteHubInputProxys = () => console.log('deleteHubInputProxys not yet implemented')
const repairStatusEnum = ( { id } ) => CKG.queryOne("38d9a975-1567-4458-a5df-e8f0c7cfd8ac",id,true)
const repairStatusEnums = ( { ids } ) => CKG.queryMany("38d9a975-1567-4458-a5df-e8f0c7cfd8ac",ids,true)
const allRepairStatusEnums = ( ) => CKG.queryAll("38d9a975-1567-4458-a5df-e8f0c7cfd8ac",true)
const repairStatusEnumFilter = ( { filters } ) => CKG.filter("38d9a975-1567-4458-a5df-e8f0c7cfd8ac", filters )
const addRepairStatusEnum = () => console.log('addRepairStatusEnum not yet implemented')
const addRepairStatusEnums = () => console.log('addRepairStatusEnums not yet implemented')
const updateRepairStatusEnum = () => console.log('updateRepairStatusEnum not yet implemented')
const updateRepairStatusEnums = () => console.log('updateRepairStatusEnums not yet implemented')
const deleteRepairStatusEnum = () => console.log('deleteRepairStatusEnum not yet implemented')
const deleteRepairStatusEnums = () => console.log('deleteRepairStatusEnums not yet implemented')
const repairOrder = ( { id } ) => CKG.queryOne("5fea2cbe-0c80-4bf0-8588-1f71dd28c492",id,true)
const repairOrders = ( { ids } ) => CKG.queryMany("5fea2cbe-0c80-4bf0-8588-1f71dd28c492",ids,true)
const allRepairOrders = ( ) => CKG.queryAll("5fea2cbe-0c80-4bf0-8588-1f71dd28c492",true)
const repairOrderFilter = ( { filters } ) => CKG.filter("5fea2cbe-0c80-4bf0-8588-1f71dd28c492", filters )
const addRepairOrder = () => console.log('addRepairOrder not yet implemented')
const addRepairOrders = () => console.log('addRepairOrders not yet implemented')
const updateRepairOrder = () => console.log('updateRepairOrder not yet implemented')
const updateRepairOrders = () => console.log('updateRepairOrders not yet implemented')
const deleteRepairOrder = () => console.log('deleteRepairOrder not yet implemented')
const deleteRepairOrders = () => console.log('deleteRepairOrders not yet implemented')
const hubTypeEnum = ( { id } ) => CKG.queryOne("5ea2793b-e23d-4745-abc0-e7833597b07a",id,true)
const hubTypeEnums = ( { ids } ) => CKG.queryMany("5ea2793b-e23d-4745-abc0-e7833597b07a",ids,true)
const allHubTypeEnums = ( ) => CKG.queryAll("5ea2793b-e23d-4745-abc0-e7833597b07a",true)
const hubTypeEnumFilter = ( { filters } ) => CKG.filter("5ea2793b-e23d-4745-abc0-e7833597b07a", filters )
const addHubTypeEnum = () => console.log('addHubTypeEnum not yet implemented')
const addHubTypeEnums = () => console.log('addHubTypeEnums not yet implemented')
const updateHubTypeEnum = () => console.log('updateHubTypeEnum not yet implemented')
const updateHubTypeEnums = () => console.log('updateHubTypeEnums not yet implemented')
const deleteHubTypeEnum = () => console.log('deleteHubTypeEnum not yet implemented')
const deleteHubTypeEnums = () => console.log('deleteHubTypeEnums not yet implemented')
const fieldFilterInputProxy = ( { id } ) => CKG.queryOne("591a8694-0795-47d6-98ee-4d82910f6702",id,true)
const fieldFilterInputProxys = ( { ids } ) => CKG.queryMany("591a8694-0795-47d6-98ee-4d82910f6702",ids,true)
const allFieldFilterInputProxys = ( ) => CKG.queryAll("591a8694-0795-47d6-98ee-4d82910f6702",true)
const fieldFilterInputProxyFilter = ( { filters } ) => CKG.filter("591a8694-0795-47d6-98ee-4d82910f6702", filters )
const addFieldFilterInputProxy = () => console.log('addFieldFilterInputProxy not yet implemented')
const addFieldFilterInputProxys = () => console.log('addFieldFilterInputProxys not yet implemented')
const updateFieldFilterInputProxy = () => console.log('updateFieldFilterInputProxy not yet implemented')
const updateFieldFilterInputProxys = () => console.log('updateFieldFilterInputProxys not yet implemented')
const deleteFieldFilterInputProxy = () => console.log('deleteFieldFilterInputProxy not yet implemented')
const deleteFieldFilterInputProxys = () => console.log('deleteFieldFilterInputProxys not yet implemented')
const simHub = ( { id } ) => CKG.queryOne("97975196-69c4-4c57-859c-5a3d0fd7288c",id,true)
const simHubs = ( { ids } ) => CKG.queryMany("97975196-69c4-4c57-859c-5a3d0fd7288c",ids,true)
const allSimHubs = ( ) => CKG.queryAll("97975196-69c4-4c57-859c-5a3d0fd7288c",true)
const simHubFilter = ( { filters } ) => CKG.filter("97975196-69c4-4c57-859c-5a3d0fd7288c", filters )
const addSimHub = () => console.log('addSimHub not yet implemented')
const addSimHubs = () => console.log('addSimHubs not yet implemented')
const updateSimHub = () => console.log('updateSimHub not yet implemented')
const updateSimHubs = () => console.log('updateSimHubs not yet implemented')
const deleteSimHub = () => console.log('deleteSimHub not yet implemented')
const deleteSimHubs = () => console.log('deleteSimHubs not yet implemented')
const fieldValueProxy = ( { id } ) => CKG.queryOne("ef223595-4990-4c95-86cf-70c03af72a89",id,true)
const fieldValueProxys = ( { ids } ) => CKG.queryMany("ef223595-4990-4c95-86cf-70c03af72a89",ids,true)
const allFieldValueProxys = ( ) => CKG.queryAll("ef223595-4990-4c95-86cf-70c03af72a89",true)
const fieldValueProxyFilter = ( { filters } ) => CKG.filter("ef223595-4990-4c95-86cf-70c03af72a89", filters )
const addFieldValueProxy = () => console.log('addFieldValueProxy not yet implemented')
const addFieldValueProxys = () => console.log('addFieldValueProxys not yet implemented')
const updateFieldValueProxy = () => console.log('updateFieldValueProxy not yet implemented')
const updateFieldValueProxys = () => console.log('updateFieldValueProxys not yet implemented')
const deleteFieldValueProxy = () => console.log('deleteFieldValueProxy not yet implemented')
const deleteFieldValueProxys = () => console.log('deleteFieldValueProxys not yet implemented')

module.exports = {
    projectSimFromSimHub,
    projectHubFromSimHub,
    stepHubs,
    stepHub,
    newSimHubs,
    selectHub,
    cloneHubsForSim,
    repairVehicle,
    cloneHubsSuppliesForSim,
    _TODO_,
    makeHubFilters,
    validateRepairTransitOrder,
    projectVehicleTypeFromHub,
    zipSimHubs,
    replaceHubSupplies,
    deleteHubFilter,
    projectIdFromHub,
    projectTypeFromHub,
    projectXFromHub,
    projectYFromHub,
    projectSuppliesFromHub,
    rewriteHubsForSim,
    cloneSimHubSupplies,
    stepGivenHubs,
    addRepairSurchargeToHub,
    addRepairSurchargeToHubs,
    hub,
    hubs,
    allHubs,
    hubFilter,
    addHub,
    addHubs,
    updateHub,
    updateHubs,
    deleteHub,
    deleteHubs,
    hubInputProxy,
    hubInputProxys,
    allHubInputProxys,
    hubInputProxyFilter,
    addHubInputProxy,
    addHubInputProxys,
    updateHubInputProxy,
    updateHubInputProxys,
    deleteHubInputProxy,
    deleteHubInputProxys,
    repairStatusEnum,
    repairStatusEnums,
    allRepairStatusEnums,
    repairStatusEnumFilter,
    addRepairStatusEnum,
    addRepairStatusEnums,
    updateRepairStatusEnum,
    updateRepairStatusEnums,
    deleteRepairStatusEnum,
    deleteRepairStatusEnums,
    repairOrder,
    repairOrders,
    allRepairOrders,
    repairOrderFilter,
    addRepairOrder,
    addRepairOrders,
    updateRepairOrder,
    updateRepairOrders,
    deleteRepairOrder,
    deleteRepairOrders,
    hubTypeEnum,
    hubTypeEnums,
    allHubTypeEnums,
    hubTypeEnumFilter,
    addHubTypeEnum,
    addHubTypeEnums,
    updateHubTypeEnum,
    updateHubTypeEnums,
    deleteHubTypeEnum,
    deleteHubTypeEnums,
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
    simHub,
    simHubs,
    allSimHubs,
    simHubFilter,
    addSimHub,
    addSimHubs,
    updateSimHub,
    updateSimHubs,
    deleteSimHub,
    deleteSimHubs,
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