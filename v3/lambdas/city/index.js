const fs = require("fs");
const CKG = require("../CKG/ckg.js")
const maanaSimLogisticsResourceV3 = require('../Resource: SimLogistics (v3)/index.js')

/** 
  * @param city 
  */
function consume( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/consume.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param city 
  * @param demandUpdates 
  */
function adjustPopulation( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/adjustPopulation.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param city 
  * @param demand 
  */
function replaceCityDemand( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/replaceCityDemand.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param x 
  * @param y 
  */
function selectCity( input ) {
    const X0 = makeCityFilters({sim: input.sim,x: input.x,y: input.y})
    const X1 = cityFilter({filters: X0})
    return X1
}

/** 
  * @param city 
  */
function projectDemandFromCity( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/projectDemandFromCity.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param city 
  * @param resources 
  */
function sinkStepCity( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/sinkStepCity.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param cities 
  * @param sim 
  */
function cloneCitiesForSim( input ) {
    const X0 = cloneCitiesResourcesForSim({cities: input.cities,sim: input.sim})
    const X1 = rewriteCitiesForSim({cities: X0,sim: input.sim})
    const X2 = addCitys({input: X1})
    return X2
}

/** 
  * @param simCity 
  */
function cloneSimCityResources( input ) {
    const X0 = projectCityFromSimCity({simCity: input.simCity})
    const X1 = projectSimFromSimCity({simCity: input.simCity})
    const X2 = projectDemandFromCity({city: X0})
    const X3 = maanaSimLogisticsResourceV3.cloneResourcesForSim({resources: X2,sim: X1})
    const X4 = maanaSimLogisticsResourceV3.resources({ids: X3})
    const X5 = replaceCityDemand({city: X0,demand: X4})
    return X5
}

/** 
  * @param cities 
  * @param sim 
  */
function zipSimCities( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/zipSimCities.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param simCity 
  */
function projectSimFromSimCity( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/projectSimFromSimCity.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param simCity 
  */
function projectCityFromSimCity( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/projectCityFromSimCity.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param city 
  */
function stepCity( input ) {
    const X0 = consume({city: input.city})
    const X1 = adjustPopulation({demandUpdates: X0,city: input.city})
    const X2 = adjustPricing({cityUpdate: X1,demandUpdates: X0,city: input.city})
    const X3 = maanaSimLogisticsResourceV3.updateResources({input: X2})
    const X4 = updateCity({input: X1})
    const X5 = sinkStepCity({city: X4,resources: X3})
    const X6 = city({id: X5})
    return X6
}

/** 
  * @param sim 
  * @param x 
  * @param y 
  */
function makeCityFilters( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/makeCityFilters.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param cities 
  * @param sim 
  */
function cloneCitiesResourcesForSim( input ) {
    const X0 = zipSimCities({cities: input.cities,sim: input.sim})
    const X1 = X0.map( x => cloneSimCityResources({ simCity: x}) )
    return X1
}

/** 
  * @param city 
  * @param cityUpdate 
  * @param demandUpdates 
  */
function adjustPricing( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/adjustPricing.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  */
function stepCities( input ) {
    const X0 = selectCity({sim: input.sim})
    const X1 = stepGivenCities({cities: X0})
    const X2 = persistCitys({citys: X1})
    const X3 = sinkCitiesAndIds({ids: X2,cities: X1})
    return X3
}

/** 
  * @param city 
  */
function projectIdFromCity( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/projectIdFromCity.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param cities 
  * @param sim 
  */
function rewriteCitiesForSim( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/rewriteCitiesForSim.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param x 
  * @param y 
  */
function deleteCityFilter( input ) {
    const X0 = selectCity({sim: input.sim})
    const X1 = X0.map( x => projectIdFromCity({ city: x}) )
    const X2 = deleteCitys({ids: X1})
    return X2
}

/** 
  * @param scenario 
  * @param sim 
  */
function newSimCities( input ) {
    const X0 = selectCity({sim: input.scenario})
    const X1 = cloneCitiesForSim({cities: X0,sim: input.sim})
    const X2 = citys({ids: X1})
    return X2
}

/** 
  * @param cities 
  * @param ids 
  */
function sinkCitiesAndIds( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/sinkCitiesAndIds.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param citys 
  */
function persistCitys( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/persistCitys.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param city 
  */
function adjustPricingRefactored( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/adjustPricingRefactored.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param city 
  */
function consumeGoodsAndAdjustPopulationRefactored( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/consumeGoodsAndAdjustPopulationRefactored.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param city 
  */
function adjustPopulationRefactored( input ) {
    const BODY = fs.readFileSync('./City: SimLogistics (v3)/adjustPopulationRefactored.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param cities 
  */
function stepGivenCities( input ) {
    const X0 = cities.map( x => adjustPricingRefactored({ city: x}) )
    return X0
}

const fieldFilterInputProxy = ( { id } ) => CKG.queryOne("d970fdbc-daec-43c4-ad61-29ff8946c3e6",id,true)
const fieldFilterInputProxys = ( { ids } ) => CKG.queryMany("d970fdbc-daec-43c4-ad61-29ff8946c3e6",ids,true)
const allFieldFilterInputProxys = ( ) => CKG.queryAll("d970fdbc-daec-43c4-ad61-29ff8946c3e6",true)
const fieldFilterInputProxyFilter = ( { filters } ) => CKG.filter("d970fdbc-daec-43c4-ad61-29ff8946c3e6", filters )
const addFieldFilterInputProxy = () => console.log('addFieldFilterInputProxy not yet implemented')
const addFieldFilterInputProxys = () => console.log('addFieldFilterInputProxys not yet implemented')
const updateFieldFilterInputProxy = () => console.log('updateFieldFilterInputProxy not yet implemented')
const updateFieldFilterInputProxys = () => console.log('updateFieldFilterInputProxys not yet implemented')
const deleteFieldFilterInputProxy = () => console.log('deleteFieldFilterInputProxy not yet implemented')
const deleteFieldFilterInputProxys = () => console.log('deleteFieldFilterInputProxys not yet implemented')
const simCity = ( { id } ) => CKG.queryOne("a8057f45-cb21-4c3f-abf7-2e68a90c2199",id,true)
const simCitys = ( { ids } ) => CKG.queryMany("a8057f45-cb21-4c3f-abf7-2e68a90c2199",ids,true)
const allSimCitys = ( ) => CKG.queryAll("a8057f45-cb21-4c3f-abf7-2e68a90c2199",true)
const simCityFilter = ( { filters } ) => CKG.filter("a8057f45-cb21-4c3f-abf7-2e68a90c2199", filters )
const addSimCity = () => console.log('addSimCity not yet implemented')
const addSimCitys = () => console.log('addSimCitys not yet implemented')
const updateSimCity = () => console.log('updateSimCity not yet implemented')
const updateSimCitys = () => console.log('updateSimCitys not yet implemented')
const deleteSimCity = () => console.log('deleteSimCity not yet implemented')
const deleteSimCitys = () => console.log('deleteSimCitys not yet implemented')
const city = ( { id } ) => CKG.queryOne("79b9dfc4-401c-42ac-94e9-2d4a5513b104",id,true)
const citys = ( { ids } ) => CKG.queryMany("79b9dfc4-401c-42ac-94e9-2d4a5513b104",ids,true)
const allCitys = ( ) => CKG.queryAll("79b9dfc4-401c-42ac-94e9-2d4a5513b104",true)
const cityFilter = ( { filters } ) => CKG.filter("79b9dfc4-401c-42ac-94e9-2d4a5513b104", filters )
const addCity = () => console.log('addCity not yet implemented')
const addCitys = () => console.log('addCitys not yet implemented')
const updateCity = () => console.log('updateCity not yet implemented')
const updateCitys = () => console.log('updateCitys not yet implemented')
const deleteCity = () => console.log('deleteCity not yet implemented')
const deleteCitys = () => console.log('deleteCitys not yet implemented')
const cityInputProxy = ( { id } ) => CKG.queryOne("76fa059c-4dff-40c9-af31-e6be86d36d63",id,true)
const cityInputProxys = ( { ids } ) => CKG.queryMany("76fa059c-4dff-40c9-af31-e6be86d36d63",ids,true)
const allCityInputProxys = ( ) => CKG.queryAll("76fa059c-4dff-40c9-af31-e6be86d36d63",true)
const cityInputProxyFilter = ( { filters } ) => CKG.filter("76fa059c-4dff-40c9-af31-e6be86d36d63", filters )
const addCityInputProxy = () => console.log('addCityInputProxy not yet implemented')
const addCityInputProxys = () => console.log('addCityInputProxys not yet implemented')
const updateCityInputProxy = () => console.log('updateCityInputProxy not yet implemented')
const updateCityInputProxys = () => console.log('updateCityInputProxys not yet implemented')
const deleteCityInputProxy = () => console.log('deleteCityInputProxy not yet implemented')
const deleteCityInputProxys = () => console.log('deleteCityInputProxys not yet implemented')
const fieldValueProxy = ( { id } ) => CKG.queryOne("cd66ba4c-ca13-4a61-828d-cdcc0a4bf13f",id,true)
const fieldValueProxys = ( { ids } ) => CKG.queryMany("cd66ba4c-ca13-4a61-828d-cdcc0a4bf13f",ids,true)
const allFieldValueProxys = ( ) => CKG.queryAll("cd66ba4c-ca13-4a61-828d-cdcc0a4bf13f",true)
const fieldValueProxyFilter = ( { filters } ) => CKG.filter("cd66ba4c-ca13-4a61-828d-cdcc0a4bf13f", filters )
const addFieldValueProxy = () => console.log('addFieldValueProxy not yet implemented')
const addFieldValueProxys = () => console.log('addFieldValueProxys not yet implemented')
const updateFieldValueProxy = () => console.log('updateFieldValueProxy not yet implemented')
const updateFieldValueProxys = () => console.log('updateFieldValueProxys not yet implemented')
const deleteFieldValueProxy = () => console.log('deleteFieldValueProxy not yet implemented')
const deleteFieldValueProxys = () => console.log('deleteFieldValueProxys not yet implemented')

module.exports = {
    consume,
    adjustPopulation,
    replaceCityDemand,
    selectCity,
    projectDemandFromCity,
    sinkStepCity,
    cloneCitiesForSim,
    cloneSimCityResources,
    zipSimCities,
    projectSimFromSimCity,
    projectCityFromSimCity,
    stepCity,
    makeCityFilters,
    cloneCitiesResourcesForSim,
    adjustPricing,
    stepCities,
    projectIdFromCity,
    rewriteCitiesForSim,
    deleteCityFilter,
    newSimCities,
    sinkCitiesAndIds,
    persistCitys,
    adjustPricingRefactored,
    consumeGoodsAndAdjustPopulationRefactored,
    adjustPopulationRefactored,
    stepGivenCities,
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
    simCity,
    simCitys,
    allSimCitys,
    simCityFilter,
    addSimCity,
    addSimCitys,
    updateSimCity,
    updateSimCitys,
    deleteSimCity,
    deleteSimCitys,
    city,
    citys,
    allCitys,
    cityFilter,
    addCity,
    addCitys,
    updateCity,
    updateCitys,
    deleteCity,
    deleteCitys,
    cityInputProxy,
    cityInputProxys,
    allCityInputProxys,
    cityInputProxyFilter,
    addCityInputProxy,
    addCityInputProxys,
    updateCityInputProxy,
    updateCityInputProxys,
    deleteCityInputProxy,
    deleteCityInputProxys,
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