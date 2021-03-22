const fs = require("fs");
const CKG = require("../CKG/ckg.js")


/** 
  * @param resources 
  * @param sim 
  */
function cloneResourcesForSim( input ) {
    const X0 = rewriteResourcesForSim({resources: input.resources,sim: input.sim})
    const X1 = addResources({input: X0})
    return X1
}

/** 
  * @param sim 
  * @param type 
  */
function selectResource( input ) {
    const X0 = makeResourceFilters({sim: input.sim,type: input.type})
    const X1 = resourceFilter({filters: X0})
    return X1
}

/** 
  * @param sim 
  * @param type 
  */
function makeResourceFilters( input ) {
    const BODY = fs.readFileSync('./Resource: SimLogistics (v3)/makeResourceFilters.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param resources 
  * @param sim 
  */
function rewriteResourcesForSim( input ) {
    const BODY = fs.readFileSync('./Resource: SimLogistics (v3)/rewriteResourcesForSim.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param sim 
  * @param type 
  */
function deleteResourceFilter( input ) {
    const X0 = selectResource({sim: input.sim,type: input.type})
    const X1 = X0.map( x => projectIdFromResource({ resource: x}) )
    const X2 = deleteResources({ids: X1})
    return X2
}

/** 
  * @param resource 
  */
function projectIdFromResource( input ) {
    const BODY = fs.readFileSync('./Resource: SimLogistics (v3)/projectIdFromResource.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

const resourceInputProxy = ( { id } ) => CKG.queryOne("f264e086-e0c6-4aff-adab-3db3e762c32e",id,true)
const resourceInputProxys = ( { ids } ) => CKG.queryMany("f264e086-e0c6-4aff-adab-3db3e762c32e",ids,true)
const allResourceInputProxys = ( ) => CKG.queryAll("f264e086-e0c6-4aff-adab-3db3e762c32e",true)
const resourceInputProxyFilter = ( { filters } ) => CKG.filter("f264e086-e0c6-4aff-adab-3db3e762c32e", filters )
const addResourceInputProxy = () => console.log('addResourceInputProxy not yet implemented')
const addResourceInputProxys = () => console.log('addResourceInputProxys not yet implemented')
const updateResourceInputProxy = () => console.log('updateResourceInputProxy not yet implemented')
const updateResourceInputProxys = () => console.log('updateResourceInputProxys not yet implemented')
const deleteResourceInputProxy = () => console.log('deleteResourceInputProxy not yet implemented')
const deleteResourceInputProxys = () => console.log('deleteResourceInputProxys not yet implemented')
const resource = ( { id } ) => CKG.queryOne("9eceb426-ff8f-4f93-86a0-36a8092dd8d9",id,true)
const resources = ( { ids } ) => CKG.queryMany("9eceb426-ff8f-4f93-86a0-36a8092dd8d9",ids,true)
const allResources = ( ) => CKG.queryAll("9eceb426-ff8f-4f93-86a0-36a8092dd8d9",true)
const resourceFilter = ( { filters } ) => CKG.filter("9eceb426-ff8f-4f93-86a0-36a8092dd8d9", filters )
const addResource = () => console.log('addResource not yet implemented')
const addResources = () => console.log('addResources not yet implemented')
const updateResource = () => console.log('updateResource not yet implemented')
const updateResources = () => console.log('updateResources not yet implemented')
const deleteResource = () => console.log('deleteResource not yet implemented')
const deleteResources = () => console.log('deleteResources not yet implemented')
const fieldFilterInputProxy = ( { id } ) => CKG.queryOne("49f94542-96eb-45ad-bc93-9331a21a7e49",id,true)
const fieldFilterInputProxys = ( { ids } ) => CKG.queryMany("49f94542-96eb-45ad-bc93-9331a21a7e49",ids,true)
const allFieldFilterInputProxys = ( ) => CKG.queryAll("49f94542-96eb-45ad-bc93-9331a21a7e49",true)
const fieldFilterInputProxyFilter = ( { filters } ) => CKG.filter("49f94542-96eb-45ad-bc93-9331a21a7e49", filters )
const addFieldFilterInputProxy = () => console.log('addFieldFilterInputProxy not yet implemented')
const addFieldFilterInputProxys = () => console.log('addFieldFilterInputProxys not yet implemented')
const updateFieldFilterInputProxy = () => console.log('updateFieldFilterInputProxy not yet implemented')
const updateFieldFilterInputProxys = () => console.log('updateFieldFilterInputProxys not yet implemented')
const deleteFieldFilterInputProxy = () => console.log('deleteFieldFilterInputProxy not yet implemented')
const deleteFieldFilterInputProxys = () => console.log('deleteFieldFilterInputProxys not yet implemented')
const resourceTypeEnum = ( { id } ) => CKG.queryOne("82ff9bd3-d091-421d-80b4-ce93598b81dc",id,true)
const resourceTypeEnums = ( { ids } ) => CKG.queryMany("82ff9bd3-d091-421d-80b4-ce93598b81dc",ids,true)
const allResourceTypeEnums = ( ) => CKG.queryAll("82ff9bd3-d091-421d-80b4-ce93598b81dc",true)
const resourceTypeEnumFilter = ( { filters } ) => CKG.filter("82ff9bd3-d091-421d-80b4-ce93598b81dc", filters )
const addResourceTypeEnum = () => console.log('addResourceTypeEnum not yet implemented')
const addResourceTypeEnums = () => console.log('addResourceTypeEnums not yet implemented')
const updateResourceTypeEnum = () => console.log('updateResourceTypeEnum not yet implemented')
const updateResourceTypeEnums = () => console.log('updateResourceTypeEnums not yet implemented')
const deleteResourceTypeEnum = () => console.log('deleteResourceTypeEnum not yet implemented')
const deleteResourceTypeEnums = () => console.log('deleteResourceTypeEnums not yet implemented')
const fieldValueProxy = ( { id } ) => CKG.queryOne("90dd7aa3-c4c9-4fdc-8f2d-cd462d8f41f0",id,true)
const fieldValueProxys = ( { ids } ) => CKG.queryMany("90dd7aa3-c4c9-4fdc-8f2d-cd462d8f41f0",ids,true)
const allFieldValueProxys = ( ) => CKG.queryAll("90dd7aa3-c4c9-4fdc-8f2d-cd462d8f41f0",true)
const fieldValueProxyFilter = ( { filters } ) => CKG.filter("90dd7aa3-c4c9-4fdc-8f2d-cd462d8f41f0", filters )
const addFieldValueProxy = () => console.log('addFieldValueProxy not yet implemented')
const addFieldValueProxys = () => console.log('addFieldValueProxys not yet implemented')
const updateFieldValueProxy = () => console.log('updateFieldValueProxy not yet implemented')
const updateFieldValueProxys = () => console.log('updateFieldValueProxys not yet implemented')
const deleteFieldValueProxy = () => console.log('deleteFieldValueProxy not yet implemented')
const deleteFieldValueProxys = () => console.log('deleteFieldValueProxys not yet implemented')

module.exports = {
    cloneResourcesForSim,
    selectResource,
    makeResourceFilters,
    rewriteResourcesForSim,
    deleteResourceFilter,
    projectIdFromResource,
    resourceInputProxy,
    resourceInputProxys,
    allResourceInputProxys,
    resourceInputProxyFilter,
    addResourceInputProxy,
    addResourceInputProxys,
    updateResourceInputProxy,
    updateResourceInputProxys,
    deleteResourceInputProxy,
    deleteResourceInputProxys,
    resource,
    resources,
    allResources,
    resourceFilter,
    addResource,
    addResources,
    updateResource,
    updateResources,
    deleteResource,
    deleteResources,
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
    resourceTypeEnum,
    resourceTypeEnums,
    allResourceTypeEnums,
    resourceTypeEnumFilter,
    addResourceTypeEnum,
    addResourceTypeEnums,
    updateResourceTypeEnum,
    updateResourceTypeEnums,
    deleteResourceTypeEnum,
    deleteResourceTypeEnums,
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