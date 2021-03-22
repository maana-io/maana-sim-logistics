const fs = require("fs");
const CKG = require("../CKG/ckg.js")
const maanaSimLogisticsResourceV3 = require('../Resource: SimLogistics (v3)/index.js')

/** 
  * @param producer 
  */
function stepProducer( input ) {
    const X0 = consume({producer: input.producer})
    const X1 = produce({materialUpdates: X0,producer: input.producer})
    const X2 = adjustProductsPricing({producer: input.producer,materialUpdates: X0,productsUpdates: X1})
    const X3 = adjustMaterialPricing({materialUpdates: X0,producer: input.producer,productsUpdates: X1})
    const X4 = maanaSimLogisticsResourceV3.updateResources({input: X2})
    const X5 = maanaSimLogisticsResourceV3.updateResources({input: X3})
    const X6 = sinkStepProducer({materialIds: X5,producer: input.producer,productsIds: X4,materialUpdates: X3,productsUpdates: X2})
    const X7 = updateProducer({input: X6})
    const X8 = producer({id: X7})
    return X8
}

/** 
  * @param sim 
  */
function stepProducers( input ) {
    const X0 = selectProducer({sim: input.sim})
    const X1 = stepGivenProducers({producers: X0})
    const X2 = persistProducers({producers: X1})
    const X3 = sinkProducersAndIds({ids: X2,producers: X1})
    return X3
}

/** 
  * @param producers 
  * @param sim 
  */
function rewriteProducersForSim( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/rewriteProducersForSim.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param producers 
  * @param sim 
  */
function cloneProducersForSim( input ) {
    const X0 = cloneProducersResourcesForSim({producers: input.producers,sim: input.sim})
    const X1 = rewriteProducersForSim({producers: X0,sim: input.sim})
    const X2 = addProducers({input: X1})
    return X2
}

/** 
  * @param producers 
  * @param sim 
  */
function cloneProducersResourcesForSim( input ) {
    const X0 = zipSimProducers({producers: input.producers,sim: input.sim})
    const X1 = X0.map( x => cloneSimProducerResources({ simProducer: x}) )
    return X1
}

/** 
  * @param producer 
  * @param productsUpdates 
  * @param materialUpdates 
  */
function adjustProductsPricing( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/adjustProductsPricing.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param type 
  * @param x 
  * @param y 
  */
function selectProducer( input ) {
    const X0 = makeProducerFilters({type: input.type,x: input.x,y: input.y,sim: input.sim})
    const X1 = producerFilter({filters: X0})
    return X1
}

/** 
  * @param sim 
  * @param type 
  * @param x 
  * @param y 
  */
function makeProducerFilters( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/makeProducerFilters.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param scenario 
  * @param sim 
  */
function newSimProducers( input ) {
    const X0 = selectProducer({sim: input.scenario})
    const X1 = cloneProducersForSim({sim: input.sim,producers: X0})
    const X2 = producers({ids: X1})
    return X2
}

/** 
  * @param producers 
  * @param sim 
  */
function zipSimProducers( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/zipSimProducers.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param simProducer 
  */
function cloneSimProducerResources( input ) {
    const X0 = projectProducerFromSimProducer({simProducer: input.simProducer})
    const X1 = projectSimFromSimProducer({simProducer: input.simProducer})
    const X2 = projectProductsFromProducer({producer: X0})
    const X3 = projectMaterialFromProducer({producer: X0})
    const X4 = maanaSimLogisticsResourceV3.cloneResourcesForSim({resources: X2,sim: X1})
    const X5 = maanaSimLogisticsResourceV3.cloneResourcesForSim({sim: X1,resources: X3})
    const X6 = maanaSimLogisticsResourceV3.resources({ids: X4})
    const X7 = maanaSimLogisticsResourceV3.resources({ids: X5})
    const X8 = replaceProducerResources({material: X7,products: X6,producer: X0})
    return X8
}

/** 
  * @param sim 
  * @param type 
  * @param x 
  * @param y 
  */
function deleteProducerFilter( input ) {
    const X0 = selectProducer({sim: input.sim,type: input.type,x: input.x,y: input.y})
    const X1 = X0.map( x => projectIdFromProducer({ producer: x}) )
    const X2 = deleteProducers({ids: X1})
    return X2
}

/** 
  * @param producer 
  */
function projectIdFromProducer( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/projectIdFromProducer.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param producer 
  * @param materialUpdates 
  */
function produce( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/produce.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param producer 
  * @param materialUpdates 
  * @param productsUpdates 
  */
function adjustMaterialPricing( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/adjustMaterialPricing.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param producer 
  */
function consume( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/consume.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param producer 
  */
function projectMaterialFromProducer( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/projectMaterialFromProducer.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param producer 
  */
function projectProductsFromProducer( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/projectProductsFromProducer.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param producer 
  * @param material 
  * @param products 
  */
function replaceProducerResources( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/replaceProducerResources.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param producer 
  * @param materialIds 
  * @param productsIds 
  * @param materialUpdates 
  * @param productsUpdates 
  */
function sinkStepProducer( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/sinkStepProducer.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param simProducer 
  */
function projectProducerFromSimProducer( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/projectProducerFromSimProducer.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param simProducer 
  */
function projectSimFromSimProducer( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/projectSimFromSimProducer.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param producers 
  * @param ids 
  */
function sinkProducersAndIds( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/sinkProducersAndIds.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param producer 
  */
function consumeAndProduce( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/consumeAndProduce.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param producer 
  */
function adjustMaterialPricingRefactored( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/adjustMaterialPricingRefactored.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param producers 
  */
function stepGivenProducers( input ) {
    const X0 = producers.map( x => adjustProductsPricingRefactored({ producer: x}) )
    const X1 = X0.map( x => adjustMaterialPricingRefactored({ producer: x}) )
    return X1
}

/** 
  * @param producers 
  */
function persistProducers( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/persistProducers.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param producer 
  */
function adjustProductsPricingRefactored( input ) {
    const BODY = fs.readFileSync('./Producer: SimLogistics (v3)/adjustProductsPricingRefactored.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

const producerInputProxy = ( { id } ) => CKG.queryOne("9ca29dfa-5436-4ad8-9e9b-60fb557fb212",id,true)
const producerInputProxys = ( { ids } ) => CKG.queryMany("9ca29dfa-5436-4ad8-9e9b-60fb557fb212",ids,true)
const allProducerInputProxys = ( ) => CKG.queryAll("9ca29dfa-5436-4ad8-9e9b-60fb557fb212",true)
const producerInputProxyFilter = ( { filters } ) => CKG.filter("9ca29dfa-5436-4ad8-9e9b-60fb557fb212", filters )
const addProducerInputProxy = () => console.log('addProducerInputProxy not yet implemented')
const addProducerInputProxys = () => console.log('addProducerInputProxys not yet implemented')
const updateProducerInputProxy = () => console.log('updateProducerInputProxy not yet implemented')
const updateProducerInputProxys = () => console.log('updateProducerInputProxys not yet implemented')
const deleteProducerInputProxy = () => console.log('deleteProducerInputProxy not yet implemented')
const deleteProducerInputProxys = () => console.log('deleteProducerInputProxys not yet implemented')
const producer = ( { id } ) => CKG.queryOne("d6100380-6282-4a57-9a61-6076672b15d1",id,true)
const producers = ( { ids } ) => CKG.queryMany("d6100380-6282-4a57-9a61-6076672b15d1",ids,true)
const allProducers = ( ) => CKG.queryAll("d6100380-6282-4a57-9a61-6076672b15d1",true)
const producerFilter = ( { filters } ) => CKG.filter("d6100380-6282-4a57-9a61-6076672b15d1", filters )
const addProducer = () => console.log('addProducer not yet implemented')
const addProducers = () => console.log('addProducers not yet implemented')
const updateProducer = () => console.log('updateProducer not yet implemented')
const updateProducers = () => console.log('updateProducers not yet implemented')
const deleteProducer = () => console.log('deleteProducer not yet implemented')
const deleteProducers = () => console.log('deleteProducers not yet implemented')
const producerTypeEnum = ( { id } ) => CKG.queryOne("524eb095-ec48-41c9-b36c-8152f27e576c",id,true)
const producerTypeEnums = ( { ids } ) => CKG.queryMany("524eb095-ec48-41c9-b36c-8152f27e576c",ids,true)
const allProducerTypeEnums = ( ) => CKG.queryAll("524eb095-ec48-41c9-b36c-8152f27e576c",true)
const producerTypeEnumFilter = ( { filters } ) => CKG.filter("524eb095-ec48-41c9-b36c-8152f27e576c", filters )
const addProducerTypeEnum = () => console.log('addProducerTypeEnum not yet implemented')
const addProducerTypeEnums = () => console.log('addProducerTypeEnums not yet implemented')
const updateProducerTypeEnum = () => console.log('updateProducerTypeEnum not yet implemented')
const updateProducerTypeEnums = () => console.log('updateProducerTypeEnums not yet implemented')
const deleteProducerTypeEnum = () => console.log('deleteProducerTypeEnum not yet implemented')
const deleteProducerTypeEnums = () => console.log('deleteProducerTypeEnums not yet implemented')
const simProducer = ( { id } ) => CKG.queryOne("c11d6e25-899d-4225-b0ae-30c80148c35d",id,true)
const simProducers = ( { ids } ) => CKG.queryMany("c11d6e25-899d-4225-b0ae-30c80148c35d",ids,true)
const allSimProducers = ( ) => CKG.queryAll("c11d6e25-899d-4225-b0ae-30c80148c35d",true)
const simProducerFilter = ( { filters } ) => CKG.filter("c11d6e25-899d-4225-b0ae-30c80148c35d", filters )
const addSimProducer = () => console.log('addSimProducer not yet implemented')
const addSimProducers = () => console.log('addSimProducers not yet implemented')
const updateSimProducer = () => console.log('updateSimProducer not yet implemented')
const updateSimProducers = () => console.log('updateSimProducers not yet implemented')
const deleteSimProducer = () => console.log('deleteSimProducer not yet implemented')
const deleteSimProducers = () => console.log('deleteSimProducers not yet implemented')
const filterInputProxy = ( { id } ) => CKG.queryOne("1f11df6a-6915-42c0-bcd9-4e0025dde295",id,true)
const filterInputProxys = ( { ids } ) => CKG.queryMany("1f11df6a-6915-42c0-bcd9-4e0025dde295",ids,true)
const allFilterInputProxys = ( ) => CKG.queryAll("1f11df6a-6915-42c0-bcd9-4e0025dde295",true)
const filterInputProxyFilter = ( { filters } ) => CKG.filter("1f11df6a-6915-42c0-bcd9-4e0025dde295", filters )
const addFilterInputProxy = () => console.log('addFilterInputProxy not yet implemented')
const addFilterInputProxys = () => console.log('addFilterInputProxys not yet implemented')
const updateFilterInputProxy = () => console.log('updateFilterInputProxy not yet implemented')
const updateFilterInputProxys = () => console.log('updateFilterInputProxys not yet implemented')
const deleteFilterInputProxy = () => console.log('deleteFilterInputProxy not yet implemented')
const deleteFilterInputProxys = () => console.log('deleteFilterInputProxys not yet implemented')
const fieldValueProxy = ( { id } ) => CKG.queryOne("88560b7a-6b3b-4806-8fb8-60fcc34eb1f2",id,true)
const fieldValueProxys = ( { ids } ) => CKG.queryMany("88560b7a-6b3b-4806-8fb8-60fcc34eb1f2",ids,true)
const allFieldValueProxys = ( ) => CKG.queryAll("88560b7a-6b3b-4806-8fb8-60fcc34eb1f2",true)
const fieldValueProxyFilter = ( { filters } ) => CKG.filter("88560b7a-6b3b-4806-8fb8-60fcc34eb1f2", filters )
const addFieldValueProxy = () => console.log('addFieldValueProxy not yet implemented')
const addFieldValueProxys = () => console.log('addFieldValueProxys not yet implemented')
const updateFieldValueProxy = () => console.log('updateFieldValueProxy not yet implemented')
const updateFieldValueProxys = () => console.log('updateFieldValueProxys not yet implemented')
const deleteFieldValueProxy = () => console.log('deleteFieldValueProxy not yet implemented')
const deleteFieldValueProxys = () => console.log('deleteFieldValueProxys not yet implemented')

module.exports = {
    stepProducer,
    stepProducers,
    rewriteProducersForSim,
    cloneProducersForSim,
    cloneProducersResourcesForSim,
    adjustProductsPricing,
    selectProducer,
    makeProducerFilters,
    newSimProducers,
    zipSimProducers,
    cloneSimProducerResources,
    deleteProducerFilter,
    projectIdFromProducer,
    produce,
    adjustMaterialPricing,
    consume,
    projectMaterialFromProducer,
    projectProductsFromProducer,
    replaceProducerResources,
    sinkStepProducer,
    projectProducerFromSimProducer,
    projectSimFromSimProducer,
    sinkProducersAndIds,
    consumeAndProduce,
    adjustMaterialPricingRefactored,
    stepGivenProducers,
    persistProducers,
    adjustProductsPricingRefactored,
    producerInputProxy,
    producerInputProxys,
    allProducerInputProxys,
    producerInputProxyFilter,
    addProducerInputProxy,
    addProducerInputProxys,
    updateProducerInputProxy,
    updateProducerInputProxys,
    deleteProducerInputProxy,
    deleteProducerInputProxys,
    producer,
    producers,
    allProducers,
    producerFilter,
    addProducer,
    addProducers,
    updateProducer,
    updateProducers,
    deleteProducer,
    deleteProducers,
    producerTypeEnum,
    producerTypeEnums,
    allProducerTypeEnums,
    producerTypeEnumFilter,
    addProducerTypeEnum,
    addProducerTypeEnums,
    updateProducerTypeEnum,
    updateProducerTypeEnums,
    deleteProducerTypeEnum,
    deleteProducerTypeEnums,
    simProducer,
    simProducers,
    allSimProducers,
    simProducerFilter,
    addSimProducer,
    addSimProducers,
    updateSimProducer,
    updateSimProducers,
    deleteSimProducer,
    deleteSimProducers,
    filterInputProxy,
    filterInputProxys,
    allFilterInputProxys,
    filterInputProxyFilter,
    addFilterInputProxy,
    addFilterInputProxys,
    updateFilterInputProxy,
    updateFilterInputProxys,
    deleteFilterInputProxy,
    deleteFilterInputProxys,
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