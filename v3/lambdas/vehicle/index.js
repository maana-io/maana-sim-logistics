const fs = require("fs");
const CKG = require("../CKG/ckg.js")
const maanaSimLogisticsResourceV3 = require('../Resource: SimLogistics (v3)/index.js')
const maanaSimLogisticsMapV3 = require('../Map: SimLogistics (v3)/index.js')

/** 
  * @param vehicles 
  * @param sim 
  */
function rewriteVehiclesForSim( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/rewriteVehiclesForSim.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicle 
  * @param cargo 
  */
function replaceVehicleCargo( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/replaceVehicleCargo.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicles 
  * @param sim 
  */
function cloneVehiclesForSim( input ) {
    const X0 = cloneVehiclesCargoForSim({vehicles: input.vehicles,sim: input.sim})
    const X1 = rewriteVehiclesForSim({vehicles: X0,sim: input.sim})
    const X2 = addVehicles({input: X1})
    return X2
}

/** 
  * @param vehicle 
  */
function projectIdFromVehicle( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/projectIdFromVehicle.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicle 
  */
function projectCargoFromVehicle( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/projectCargoFromVehicle.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  */
function stepVehicles( input ) {
    const X0 = selectVehicle({sim: input.sim})
    const X1 = stepGivenVehicles({vehicles: X0})
    const X2 = persistVehicles({vehicles: X1})
    const X3 = sinkVehiclesAndIDs({ids: X2})
    return X3
}

/** 
  * @param vehicle 
  */
function stepVehicle( input ) {
    const X0 = stepVehicleTransit({vehicle: input.vehicle})
    const X1 = projectOldTransitOrderUpdateFromVehicleTransitUpdate({vehicleTransitUpdate: X0})
    const X2 = projectVehicleUpdateFromVehicleTransitUpdate({vehicleTransitUpdate: X0})
    const X3 = updateTransitOrder({input: X1})
    const X4 = updateVehicle({input: X2})
    const X5 = sinkStepVehicle({vehicleUpdate: X4,transitOrderUpdate: X3})
    const X6 = vehicle({id: X5})
    return X6
}

/** 
  * @param vehicle 
  */
function projectTransitOrderFromVehicle( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/projectTransitOrderFromVehicle.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicleUpdate 
  * @param oldOrderUpdate 
  * @param newOrderUpdate 
  * @param vehicle 
  */
function sinkApplyAndSaveTransitOrder( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/sinkApplyAndSaveTransitOrder.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicle 
  */
function stepVehicleTransit( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/stepVehicleTransit.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param scenario 
  * @param sim 
  */
function newSimVehicles( input ) {
    const X0 = selectVehicle({sim: input.scenario})
    const X1 = cloneVehiclesForSim({sim: input.sim,vehicles: X0})
    const X2 = vehicles({ids: X1})
    return X2
}

/** 
  * @param sim 
  * @param type 
  * @param hub 
  * @param x 
  * @param y 
  */
function makeVehicleFilters( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/makeVehicleFilters.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param vehicle 
  * @param destX 
  * @param destY 
  * @param status 
  */
function makeTransitOrder( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/makeTransitOrder.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param type 
  * @param hub 
  * @param x 
  * @param y 
  */
function deleteVehicleFilter( input ) {
    const X0 = selectVehicle({sim: input.sim,type: input.type,hub: input.hub,x: input.x,y: input.y})
    const X1 = X0.map( x => projectIdFromVehicle({ vehicle: x}) )
    const X2 = deleteVehicles({ids: X1})
    return X2
}

/** 
  * @param sim 
  * @param vehicle 
  * @param state 
  * @param destX 
  * @param destY 
  */
function deleteTransitOrderFilter( input ) {
    const X0 = selectTransitOrder({sim: input.sim,vehicle: input.vehicle,state: input.state,destX: input.destX,destY: input.destY})
    const X1 = X0.map( x => projectIdFromTransitOrder({ transitOrder: x}) )
    const X2 = deleteTransitOrders({ids: X1})
    return X2
}

/** 
  * @param sim 
  * @param vehicle 
  * @param status 
  * @param destX 
  * @param destY 
  */
function makeTransitOrderFilters( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/makeTransitOrderFilters.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param transitOrder 
  */
function projectIdFromTransitOrder( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/projectIdFromTransitOrder.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param simVehicle 
  */
function cloneSimVehicleCargo( input ) {
    const X0 = projectVehicleFromSimVehicle({simVehicle: input.simVehicle})
    const X1 = projectCargoFromVehicle({vehicle: X0})
    const X2 = projectFuelFromVehicle({vehicle: X0})
    const X3 = consResources({resource: X2,resources: X1})
    const X4 = projectSimFromSimVehicle({simVehicle: input.simVehicle})
    const X5 = maanaSimLogisticsResourceV3.cloneResourcesForSim({sim: X4,resources: X3})
    const X6 = X5.map( x => maanaSimLogisticsResourceV3.maanaSimLogisticsResourceV3.resource({ id: x}) )
    const X7 = replaceVehicleCargo({cargo: X6,vehicle: X0})
    return X7
}

/** 
  * @param sim 
  * @param vehicle 
  * @param destX 
  * @param destY 
  */
function moveVehicleTo( input ) {
    const X0 = vehicle({id: input.vehicle})
    const X1 = makeTransitOrder({sim: input.sim,vehicle: input.vehicle,destX: input.destX,destY: input.destY})
    const X2 = applyAndSaveTransitOrder({newTransitOrder: X1,vehicle: X0})
    return X2
}

/** 
  * @param sim 
  * @param type 
  * @param hub 
  * @param x 
  * @param y 
  */
function selectVehicle( input ) {
    const X0 = makeVehicleFilters({sim: input.sim,type: input.type,hub: input.hub,x: input.x,y: input.y})
    const X1 = vehicleFilter({filters: X0})
    return X1
}

/** 
  * @param vehicles 
  * @param sim 
  */
function cloneVehiclesCargoForSim( input ) {
    const X0 = zipSimVehicles({sim: input.sim,vehicles: input.vehicles})
    const X1 = X0.map( x => cloneSimVehicleCargo({ simVehicle: x}) )
    return X1
}

/** 
  * @param simVehicle 
  */
function projectSimFromSimVehicle( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/projectSimFromSimVehicle.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param simVehicle 
  */
function projectVehicleFromSimVehicle( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/projectVehicleFromSimVehicle.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicles 
  * @param sim 
  */
function zipSimVehicles( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/zipSimVehicles.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param vehicle 
  * @param state 
  * @param destX 
  * @param destY 
  */
function selectTransitOrder( input ) {
    const X0 = makeTransitOrderFilters({sim: input.sim,vehicle: input.vehicle,status: input.state,destY: input.destY,destX: input.destX})
    const X1 = transitOrderFilter({filters: X0})
    return X1
}

/** 
  * @param vehicle 
  * @param newOrder 
  */
function transitionTransitOrder( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/transitionTransitOrder.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicleTransitUpdate 
  */
function projectVehicleUpdateFromVehicleTransitUpdate( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/projectVehicleUpdateFromVehicleTransitUpdate.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicleTransitUpdate 
  */
function projectOldTransitOrderUpdateFromVehicleTransitUpdate( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/projectOldTransitOrderUpdateFromVehicleTransitUpdate.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicle 
  * @param newTransitOrder 
  */
function applyAndSaveTransitOrder( input ) {
    const X0 = transitionTransitOrder({vehicle: input.vehicle,newOrder: input.newTransitOrder})
    const X1 = projectNewTransitOrderUpdateFromVehicleTransitUpdate({vehicleTransitUpdate: X0})
    const X2 = projectOldTransitOrderUpdateFromVehicleTransitUpdate({vehicleTransitUpdate: X0})
    const X3 = projectVehicleUpdateFromVehicleTransitUpdate({vehicleTransitUpdate: X0})
    const X4 = addTransitOrder({input: X1})
    const X5 = updateTransitOrder({input: X2})
    const X6 = updateVehicle({input: X3})
    const X7 = sinkApplyAndSaveTransitOrder({vehicleUpdate: X6,oldOrderUpdate: X5,vehicle: input.vehicle,newOrderUpdate: X4})
    const X8 = vehicle({id: X7})
    return X8
}

/** 

  */
function transitStatusRepair( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/transitStatusRepair.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicleTransitUpdate 
  */
function projectNewTransitOrderUpdateFromVehicleTransitUpdate( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/projectNewTransitOrderUpdateFromVehicleTransitUpdate.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicleUpdate 
  * @param transitOrderUpdate 
  */
function sinkStepVehicle( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/sinkStepVehicle.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param vehicle 
  * @param destX 
  * @param destY 
  * @param status 
  */
function makeAndSaveTransitOrder( input ) {
    const X0 = makeTransitOrder({sim: input.sim,vehicle: input.vehicle,destX: input.destX,destY: input.destY,status: input.status})
    const X1 = addTransitOrder({input: X0})
    const X2 = transitOrder({id: X1})
    return X2
}

/** 
  * @param vehicle 
  */
function persistVehicle( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/persistVehicle.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicles 
  */
function persistVehicles( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/persistVehicles.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicles 
  */
function stepGivenVehicles( input ) {
    const X0 = vehicles.map( x => stepVehicleTransitRefactored({ vehicle: x}) )
    return X0
}

/** 
  * @param vehicle 
  */
function projectFuelFromVehicle( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/projectFuelFromVehicle.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicles 
  * @param ids 
  */
function sinkVehiclesAndIDs( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/sinkVehiclesAndIDs.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param type 
  * @param hub 
  * @param x 
  * @param y 
  * @param vehicles 
  */
function filterVehiclesInMemory( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/filterVehiclesInMemory.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicle 
  */
function stepVehicleTransitRefactored( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/stepVehicleTransitRefactored.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicle 
  */
function addFuelToVehicle( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/addFuelToVehicle.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 

  */
function newFunction( input ) {

}

/** 
  * @param a 
  * @param b 
  */
function sinkIDs( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/sinkIDs.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicle 
  */
function makeFuelForVehicle( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/makeFuelForVehicle.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param resource 
  * @param resources 
  */
function consResources( input ) {
    const BODY = fs.readFileSync('./Vehicle: SimLogistics (v3)/consResources.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

const vehicleTypeEnum = ( { id } ) => CKG.queryOne("4529f4ce-e21e-434d-983a-6b7c451ad1bf",id,true)
const vehicleTypeEnums = ( { ids } ) => CKG.queryMany("4529f4ce-e21e-434d-983a-6b7c451ad1bf",ids,true)
const allVehicleTypeEnums = ( ) => CKG.queryAll("4529f4ce-e21e-434d-983a-6b7c451ad1bf",true)
const vehicleTypeEnumFilter = ( { filters } ) => CKG.filter("4529f4ce-e21e-434d-983a-6b7c451ad1bf", filters )
const addVehicleTypeEnum = () => console.log('addVehicleTypeEnum not yet implemented')
const addVehicleTypeEnums = () => console.log('addVehicleTypeEnums not yet implemented')
const updateVehicleTypeEnum = () => console.log('updateVehicleTypeEnum not yet implemented')
const updateVehicleTypeEnums = () => console.log('updateVehicleTypeEnums not yet implemented')
const deleteVehicleTypeEnum = () => console.log('deleteVehicleTypeEnum not yet implemented')
const deleteVehicleTypeEnums = () => console.log('deleteVehicleTypeEnums not yet implemented')
const vehicle = ( { id } ) => CKG.queryOne("4d504fa3-82b8-4b6f-bc06-69652a150e05",id,true)
const vehicles = ( { ids } ) => CKG.queryMany("4d504fa3-82b8-4b6f-bc06-69652a150e05",ids,true)
const allVehicles = ( ) => CKG.queryAll("4d504fa3-82b8-4b6f-bc06-69652a150e05",true)
const vehicleFilter = ( { filters } ) => CKG.filter("4d504fa3-82b8-4b6f-bc06-69652a150e05", filters )
const addVehicle = () => console.log('addVehicle not yet implemented')
const addVehicles = () => console.log('addVehicles not yet implemented')
const updateVehicle = () => console.log('updateVehicle not yet implemented')
const updateVehicles = () => console.log('updateVehicles not yet implemented')
const deleteVehicle = () => console.log('deleteVehicle not yet implemented')
const deleteVehicles = () => console.log('deleteVehicles not yet implemented')
const transitOrder = ( { id } ) => CKG.queryOne("c688839a-853a-435e-8982-224158ed8c76",id,true)
const transitOrders = ( { ids } ) => CKG.queryMany("c688839a-853a-435e-8982-224158ed8c76",ids,true)
const allTransitOrders = ( ) => CKG.queryAll("c688839a-853a-435e-8982-224158ed8c76",true)
const transitOrderFilter = ( { filters } ) => CKG.filter("c688839a-853a-435e-8982-224158ed8c76", filters )
const addTransitOrder = () => console.log('addTransitOrder not yet implemented')
const addTransitOrders = () => console.log('addTransitOrders not yet implemented')
const updateTransitOrder = () => console.log('updateTransitOrder not yet implemented')
const updateTransitOrders = () => console.log('updateTransitOrders not yet implemented')
const deleteTransitOrder = () => console.log('deleteTransitOrder not yet implemented')
const deleteTransitOrders = () => console.log('deleteTransitOrders not yet implemented')
const simVehicle = ( { id } ) => CKG.queryOne("05dc56ea-0a8d-47e8-a94c-e1e6f2730c36",id,true)
const simVehicles = ( { ids } ) => CKG.queryMany("05dc56ea-0a8d-47e8-a94c-e1e6f2730c36",ids,true)
const allSimVehicles = ( ) => CKG.queryAll("05dc56ea-0a8d-47e8-a94c-e1e6f2730c36",true)
const simVehicleFilter = ( { filters } ) => CKG.filter("05dc56ea-0a8d-47e8-a94c-e1e6f2730c36", filters )
const addSimVehicle = () => console.log('addSimVehicle not yet implemented')
const addSimVehicles = () => console.log('addSimVehicles not yet implemented')
const updateSimVehicle = () => console.log('updateSimVehicle not yet implemented')
const updateSimVehicles = () => console.log('updateSimVehicles not yet implemented')
const deleteSimVehicle = () => console.log('deleteSimVehicle not yet implemented')
const deleteSimVehicles = () => console.log('deleteSimVehicles not yet implemented')
const transitStatusEnum = ( { id } ) => CKG.queryOne("ef6ace7f-8536-4591-9155-8f857468f0d5",id,true)
const transitStatusEnums = ( { ids } ) => CKG.queryMany("ef6ace7f-8536-4591-9155-8f857468f0d5",ids,true)
const allTransitStatusEnums = ( ) => CKG.queryAll("ef6ace7f-8536-4591-9155-8f857468f0d5",true)
const transitStatusEnumFilter = ( { filters } ) => CKG.filter("ef6ace7f-8536-4591-9155-8f857468f0d5", filters )
const addTransitStatusEnum = () => console.log('addTransitStatusEnum not yet implemented')
const addTransitStatusEnums = () => console.log('addTransitStatusEnums not yet implemented')
const updateTransitStatusEnum = () => console.log('updateTransitStatusEnum not yet implemented')
const updateTransitStatusEnums = () => console.log('updateTransitStatusEnums not yet implemented')
const deleteTransitStatusEnum = () => console.log('deleteTransitStatusEnum not yet implemented')
const deleteTransitStatusEnums = () => console.log('deleteTransitStatusEnums not yet implemented')
const fieldFilterInputProxy = ( { id } ) => CKG.queryOne("c65f1222-5d04-4e87-9312-386faa98bca5",id,true)
const fieldFilterInputProxys = ( { ids } ) => CKG.queryMany("c65f1222-5d04-4e87-9312-386faa98bca5",ids,true)
const allFieldFilterInputProxys = ( ) => CKG.queryAll("c65f1222-5d04-4e87-9312-386faa98bca5",true)
const fieldFilterInputProxyFilter = ( { filters } ) => CKG.filter("c65f1222-5d04-4e87-9312-386faa98bca5", filters )
const addFieldFilterInputProxy = () => console.log('addFieldFilterInputProxy not yet implemented')
const addFieldFilterInputProxys = () => console.log('addFieldFilterInputProxys not yet implemented')
const updateFieldFilterInputProxy = () => console.log('updateFieldFilterInputProxy not yet implemented')
const updateFieldFilterInputProxys = () => console.log('updateFieldFilterInputProxys not yet implemented')
const deleteFieldFilterInputProxy = () => console.log('deleteFieldFilterInputProxy not yet implemented')
const deleteFieldFilterInputProxys = () => console.log('deleteFieldFilterInputProxys not yet implemented')
const transitOrderInputProxy = ( { id } ) => CKG.queryOne("6eb2b7ed-f2d2-4e02-b89d-f19bbf01a057",id,true)
const transitOrderInputProxys = ( { ids } ) => CKG.queryMany("6eb2b7ed-f2d2-4e02-b89d-f19bbf01a057",ids,true)
const allTransitOrderInputProxys = ( ) => CKG.queryAll("6eb2b7ed-f2d2-4e02-b89d-f19bbf01a057",true)
const transitOrderInputProxyFilter = ( { filters } ) => CKG.filter("6eb2b7ed-f2d2-4e02-b89d-f19bbf01a057", filters )
const addTransitOrderInputProxy = () => console.log('addTransitOrderInputProxy not yet implemented')
const addTransitOrderInputProxys = () => console.log('addTransitOrderInputProxys not yet implemented')
const updateTransitOrderInputProxy = () => console.log('updateTransitOrderInputProxy not yet implemented')
const updateTransitOrderInputProxys = () => console.log('updateTransitOrderInputProxys not yet implemented')
const deleteTransitOrderInputProxy = () => console.log('deleteTransitOrderInputProxy not yet implemented')
const deleteTransitOrderInputProxys = () => console.log('deleteTransitOrderInputProxys not yet implemented')
const vehicleInputProxy = ( { id } ) => CKG.queryOne("52af1014-639f-48e8-bae8-5854495576d6",id,true)
const vehicleInputProxys = ( { ids } ) => CKG.queryMany("52af1014-639f-48e8-bae8-5854495576d6",ids,true)
const allVehicleInputProxys = ( ) => CKG.queryAll("52af1014-639f-48e8-bae8-5854495576d6",true)
const vehicleInputProxyFilter = ( { filters } ) => CKG.filter("52af1014-639f-48e8-bae8-5854495576d6", filters )
const addVehicleInputProxy = () => console.log('addVehicleInputProxy not yet implemented')
const addVehicleInputProxys = () => console.log('addVehicleInputProxys not yet implemented')
const updateVehicleInputProxy = () => console.log('updateVehicleInputProxy not yet implemented')
const updateVehicleInputProxys = () => console.log('updateVehicleInputProxys not yet implemented')
const deleteVehicleInputProxy = () => console.log('deleteVehicleInputProxy not yet implemented')
const deleteVehicleInputProxys = () => console.log('deleteVehicleInputProxys not yet implemented')
const vehicleTransitUpdate = ( { id } ) => CKG.queryOne("13ada0b7-bcd1-4592-a172-3a0d775c4b74",id,true)
const vehicleTransitUpdates = ( { ids } ) => CKG.queryMany("13ada0b7-bcd1-4592-a172-3a0d775c4b74",ids,true)
const allVehicleTransitUpdates = ( ) => CKG.queryAll("13ada0b7-bcd1-4592-a172-3a0d775c4b74",true)
const vehicleTransitUpdateFilter = ( { filters } ) => CKG.filter("13ada0b7-bcd1-4592-a172-3a0d775c4b74", filters )
const addVehicleTransitUpdate = () => console.log('addVehicleTransitUpdate not yet implemented')
const addVehicleTransitUpdates = () => console.log('addVehicleTransitUpdates not yet implemented')
const updateVehicleTransitUpdate = () => console.log('updateVehicleTransitUpdate not yet implemented')
const updateVehicleTransitUpdates = () => console.log('updateVehicleTransitUpdates not yet implemented')
const deleteVehicleTransitUpdate = () => console.log('deleteVehicleTransitUpdate not yet implemented')
const deleteVehicleTransitUpdates = () => console.log('deleteVehicleTransitUpdates not yet implemented')
const fieldValueProxy = ( { id } ) => CKG.queryOne("9e1bc7f3-98f5-4181-838e-863277e4c8d1",id,true)
const fieldValueProxys = ( { ids } ) => CKG.queryMany("9e1bc7f3-98f5-4181-838e-863277e4c8d1",ids,true)
const allFieldValueProxys = ( ) => CKG.queryAll("9e1bc7f3-98f5-4181-838e-863277e4c8d1",true)
const fieldValueProxyFilter = ( { filters } ) => CKG.filter("9e1bc7f3-98f5-4181-838e-863277e4c8d1", filters )
const addFieldValueProxy = () => console.log('addFieldValueProxy not yet implemented')
const addFieldValueProxys = () => console.log('addFieldValueProxys not yet implemented')
const updateFieldValueProxy = () => console.log('updateFieldValueProxy not yet implemented')
const updateFieldValueProxys = () => console.log('updateFieldValueProxys not yet implemented')
const deleteFieldValueProxy = () => console.log('deleteFieldValueProxy not yet implemented')
const deleteFieldValueProxys = () => console.log('deleteFieldValueProxys not yet implemented')

module.exports = {
    rewriteVehiclesForSim,
    replaceVehicleCargo,
    cloneVehiclesForSim,
    projectIdFromVehicle,
    projectCargoFromVehicle,
    stepVehicles,
    stepVehicle,
    projectTransitOrderFromVehicle,
    sinkApplyAndSaveTransitOrder,
    stepVehicleTransit,
    newSimVehicles,
    makeVehicleFilters,
    makeTransitOrder,
    deleteVehicleFilter,
    deleteTransitOrderFilter,
    makeTransitOrderFilters,
    projectIdFromTransitOrder,
    cloneSimVehicleCargo,
    moveVehicleTo,
    selectVehicle,
    cloneVehiclesCargoForSim,
    projectSimFromSimVehicle,
    projectVehicleFromSimVehicle,
    zipSimVehicles,
    selectTransitOrder,
    transitionTransitOrder,
    projectVehicleUpdateFromVehicleTransitUpdate,
    projectOldTransitOrderUpdateFromVehicleTransitUpdate,
    applyAndSaveTransitOrder,
    transitStatusRepair,
    projectNewTransitOrderUpdateFromVehicleTransitUpdate,
    sinkStepVehicle,
    makeAndSaveTransitOrder,
    persistVehicle,
    persistVehicles,
    stepGivenVehicles,
    projectFuelFromVehicle,
    sinkVehiclesAndIDs,
    filterVehiclesInMemory,
    stepVehicleTransitRefactored,
    addFuelToVehicle,
    newFunction,
    sinkIDs,
    makeFuelForVehicle,
    consResources,
    vehicleTypeEnum,
    vehicleTypeEnums,
    allVehicleTypeEnums,
    vehicleTypeEnumFilter,
    addVehicleTypeEnum,
    addVehicleTypeEnums,
    updateVehicleTypeEnum,
    updateVehicleTypeEnums,
    deleteVehicleTypeEnum,
    deleteVehicleTypeEnums,
    vehicle,
    vehicles,
    allVehicles,
    vehicleFilter,
    addVehicle,
    addVehicles,
    updateVehicle,
    updateVehicles,
    deleteVehicle,
    deleteVehicles,
    transitOrder,
    transitOrders,
    allTransitOrders,
    transitOrderFilter,
    addTransitOrder,
    addTransitOrders,
    updateTransitOrder,
    updateTransitOrders,
    deleteTransitOrder,
    deleteTransitOrders,
    simVehicle,
    simVehicles,
    allSimVehicles,
    simVehicleFilter,
    addSimVehicle,
    addSimVehicles,
    updateSimVehicle,
    updateSimVehicles,
    deleteSimVehicle,
    deleteSimVehicles,
    transitStatusEnum,
    transitStatusEnums,
    allTransitStatusEnums,
    transitStatusEnumFilter,
    addTransitStatusEnum,
    addTransitStatusEnums,
    updateTransitStatusEnum,
    updateTransitStatusEnums,
    deleteTransitStatusEnum,
    deleteTransitStatusEnums,
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
    transitOrderInputProxy,
    transitOrderInputProxys,
    allTransitOrderInputProxys,
    transitOrderInputProxyFilter,
    addTransitOrderInputProxy,
    addTransitOrderInputProxys,
    updateTransitOrderInputProxy,
    updateTransitOrderInputProxys,
    deleteTransitOrderInputProxy,
    deleteTransitOrderInputProxys,
    vehicleInputProxy,
    vehicleInputProxys,
    allVehicleInputProxys,
    vehicleInputProxyFilter,
    addVehicleInputProxy,
    addVehicleInputProxys,
    updateVehicleInputProxy,
    updateVehicleInputProxys,
    deleteVehicleInputProxy,
    deleteVehicleInputProxys,
    vehicleTransitUpdate,
    vehicleTransitUpdates,
    allVehicleTransitUpdates,
    vehicleTransitUpdateFilter,
    addVehicleTransitUpdate,
    addVehicleTransitUpdates,
    updateVehicleTransitUpdate,
    updateVehicleTransitUpdates,
    deleteVehicleTransitUpdate,
    deleteVehicleTransitUpdates,
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