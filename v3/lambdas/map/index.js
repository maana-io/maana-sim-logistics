const fs = require("fs");
const CKG = require("../CKG/ckg.js")
const maanaAiPathfinding = require('../Maana AI Pathfinding/index.js')

/** 
  * @param map 
  * @param type 
  * @param x 
  * @param y 
  */
function makeTileFilters( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/makeTileFilters.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param map 
  */
function mapTiles( input ) {

}

/** 
  * @param map 
  */
function mapAndTiles( input ) {
    const X0 = selectTile({map: input.map})
    const X1 = map({id: input.map})
    const X2 = constructMapAndTiles({map: X1,tiles: X0,id: input.map})
    return X2
}

/** 
  * @param map 
  * @param type 
  * @param x 
  * @param y 
  */
function selectTile( input ) {
    const X0 = makeTileFilters({map: input.map,type: input.type,x: input.x,y: input.y})
    const X1 = tileFilter({filters: X0})
    return X1
}

/** 
  * @param id 
  * @param map 
  * @param tiles 
  */
function constructMapAndTiles( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/constructMapAndTiles.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
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
    const X0 = preAStar({vehicleType: input.vehicleType,fromX: input.fromX,fromY: input.fromY,toX: input.toX,toY: input.toY,mapAndTiles: input.mapAndTiles})
    const X1 = projectDontCrossCornersFromAStarFinderArgs({aStarFinderArgs: X0})
    const X2 = projectAllowDiagonalFromAStarFinderArgs({aStarFinderArgs: X0})
    const X3 = projectTargetFromAStarFinderArgs({aStarFinderArgs: X0})
    const X4 = projectOriginFromAStarFinderArgs({aStarFinderArgs: X0})
    const X5 = projectUnwalkableLocationsFromAStarFinderArgs({aStarFinderArgs: X0})
    const X6 = projectNumColumnsFromAStarFinderArgs({aStarFinderArgs: X0})
    const X7 = projectNumRowsFromAStarFinderArgs({aStarFinderArgs: X0})
    const X8 = maanaAiPathfinding.astarFinder({numRows: X7,numColumns: X6,unwalkableLocations: X5,origin: X4,target: X3,allowDiagonal: X2,dontCrossCorners: X1})
    const X9 = postAStar({path: X8})
    return X9
}

/** 
  * @param vehicleType 
  * @param fromX 
  * @param fromY 
  * @param toX 
  * @param toY 
  */
function testRouting( input ) {
    const X0 = defaultScenario()
    const X1 = mapAndTiles({map: X0})
    const X2 = routeVehicle({vehicleType: input.vehicleType,fromX: input.fromX,fromY: input.fromY,toX: input.toX,toY: input.toY,mapAndTiles: X1})
    return X2
}

/** 
  * @param aStarFinderArgs 
  */
function projectIdFromAStarFinderArgs( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/projectIdFromAStarFinderArgs.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param aStarFinderArgs 
  */
function projectNumRowsFromAStarFinderArgs( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/projectNumRowsFromAStarFinderArgs.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param aStarFinderArgs 
  */
function projectNumColumnsFromAStarFinderArgs( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/projectNumColumnsFromAStarFinderArgs.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param aStarFinderArgs 
  */
function projectOriginFromAStarFinderArgs( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/projectOriginFromAStarFinderArgs.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param aStarFinderArgs 
  */
function projectTargetFromAStarFinderArgs( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/projectTargetFromAStarFinderArgs.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param aStarFinderArgs 
  */
function projectAllowDiagonalFromAStarFinderArgs( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/projectAllowDiagonalFromAStarFinderArgs.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param aStarFinderArgs 
  */
function projectDontCrossCornersFromAStarFinderArgs( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/projectDontCrossCornersFromAStarFinderArgs.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param aStarFinderArgs 
  */
function projectUnwalkableLocationsFromAStarFinderArgs( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/projectUnwalkableLocationsFromAStarFinderArgs.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param vehicleType 
  * @param fromX 
  * @param fromY 
  * @param toX 
  * @param toY 
  * @param mapAndTiles 
  */
function preAStar( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/preAStar.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 

  */
function defaultScenario( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/defaultScenario.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param path 
  */
function postAStar( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/postAStar.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param waypoint 
  */
function projectXFromWaypoint( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/projectXFromWaypoint.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param waypoint 
  */
function projectYFromWaypoint( input ) {
    const BODY = fs.readFileSync('./Map: SimLogistics (v3)/projectYFromWaypoint.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

const map = ( { id } ) => CKG.queryOne("6aa316bd-7f9c-4ab1-952f-67c8bc67c4e5",id,true)
const maps = ( { ids } ) => CKG.queryMany("6aa316bd-7f9c-4ab1-952f-67c8bc67c4e5",ids,true)
const allMaps = ( ) => CKG.queryAll("6aa316bd-7f9c-4ab1-952f-67c8bc67c4e5",true)
const mapFilter = ( { filters } ) => CKG.filter("6aa316bd-7f9c-4ab1-952f-67c8bc67c4e5", filters )
const addMap = () => console.log('addMap not yet implemented')
const addMaps = () => console.log('addMaps not yet implemented')
const updateMap = () => console.log('updateMap not yet implemented')
const updateMaps = () => console.log('updateMaps not yet implemented')
const deleteMap = () => console.log('deleteMap not yet implemented')
const deleteMaps = () => console.log('deleteMaps not yet implemented')
const tile = ( { id } ) => CKG.queryOne("7db7c8a4-f575-4151-ab7c-c625cbea14f4",id,true)
const tiles = ( { ids } ) => CKG.queryMany("7db7c8a4-f575-4151-ab7c-c625cbea14f4",ids,true)
const allTiles = ( ) => CKG.queryAll("7db7c8a4-f575-4151-ab7c-c625cbea14f4",true)
const tileFilter = ( { filters } ) => CKG.filter("7db7c8a4-f575-4151-ab7c-c625cbea14f4", filters )
const addTile = () => console.log('addTile not yet implemented')
const addTiles = () => console.log('addTiles not yet implemented')
const updateTile = () => console.log('updateTile not yet implemented')
const updateTiles = () => console.log('updateTiles not yet implemented')
const deleteTile = () => console.log('deleteTile not yet implemented')
const deleteTiles = () => console.log('deleteTiles not yet implemented')
const tileDescriptor = ( { id } ) => CKG.queryOne("ad0bdf53-e244-4d55-8c0f-3f41f80d5824",id,true)
const tileDescriptors = ( { ids } ) => CKG.queryMany("ad0bdf53-e244-4d55-8c0f-3f41f80d5824",ids,true)
const allTileDescriptors = ( ) => CKG.queryAll("ad0bdf53-e244-4d55-8c0f-3f41f80d5824",true)
const tileDescriptorFilter = ( { filters } ) => CKG.filter("ad0bdf53-e244-4d55-8c0f-3f41f80d5824", filters )
const addTileDescriptor = () => console.log('addTileDescriptor not yet implemented')
const addTileDescriptors = () => console.log('addTileDescriptors not yet implemented')
const updateTileDescriptor = () => console.log('updateTileDescriptor not yet implemented')
const updateTileDescriptors = () => console.log('updateTileDescriptors not yet implemented')
const deleteTileDescriptor = () => console.log('deleteTileDescriptor not yet implemented')
const deleteTileDescriptors = () => console.log('deleteTileDescriptors not yet implemented')
const fieldFilterInputProxy = ( { id } ) => CKG.queryOne("fc091ed5-9253-4a1b-ba40-51f814e25033",id,true)
const fieldFilterInputProxys = ( { ids } ) => CKG.queryMany("fc091ed5-9253-4a1b-ba40-51f814e25033",ids,true)
const allFieldFilterInputProxys = ( ) => CKG.queryAll("fc091ed5-9253-4a1b-ba40-51f814e25033",true)
const fieldFilterInputProxyFilter = ( { filters } ) => CKG.filter("fc091ed5-9253-4a1b-ba40-51f814e25033", filters )
const addFieldFilterInputProxy = () => console.log('addFieldFilterInputProxy not yet implemented')
const addFieldFilterInputProxys = () => console.log('addFieldFilterInputProxys not yet implemented')
const updateFieldFilterInputProxy = () => console.log('updateFieldFilterInputProxy not yet implemented')
const updateFieldFilterInputProxys = () => console.log('updateFieldFilterInputProxys not yet implemented')
const deleteFieldFilterInputProxy = () => console.log('deleteFieldFilterInputProxy not yet implemented')
const deleteFieldFilterInputProxys = () => console.log('deleteFieldFilterInputProxys not yet implemented')
const mapAndTiless = ( { ids } ) => CKG.queryMany("98a20976-a40a-4583-ad44-665a49a0a8af",ids,true)
const allMapAndTiless = ( ) => CKG.queryAll("98a20976-a40a-4583-ad44-665a49a0a8af",true)
const mapAndTilesFilter = ( { filters } ) => CKG.filter("98a20976-a40a-4583-ad44-665a49a0a8af", filters )
const addMapAndTiles = () => console.log('addMapAndTiles not yet implemented')
const addMapAndTiless = () => console.log('addMapAndTiless not yet implemented')
const updateMapAndTiles = () => console.log('updateMapAndTiles not yet implemented')
const updateMapAndTiless = () => console.log('updateMapAndTiless not yet implemented')
const deleteMapAndTiles = () => console.log('deleteMapAndTiles not yet implemented')
const deleteMapAndTiless = () => console.log('deleteMapAndTiless not yet implemented')
const traversalTypeEnum = ( { id } ) => CKG.queryOne("da57cbaa-30d7-4eb1-a593-1bf6a572ea6d",id,true)
const traversalTypeEnums = ( { ids } ) => CKG.queryMany("da57cbaa-30d7-4eb1-a593-1bf6a572ea6d",ids,true)
const allTraversalTypeEnums = ( ) => CKG.queryAll("da57cbaa-30d7-4eb1-a593-1bf6a572ea6d",true)
const traversalTypeEnumFilter = ( { filters } ) => CKG.filter("da57cbaa-30d7-4eb1-a593-1bf6a572ea6d", filters )
const addTraversalTypeEnum = () => console.log('addTraversalTypeEnum not yet implemented')
const addTraversalTypeEnums = () => console.log('addTraversalTypeEnums not yet implemented')
const updateTraversalTypeEnum = () => console.log('updateTraversalTypeEnum not yet implemented')
const updateTraversalTypeEnums = () => console.log('updateTraversalTypeEnums not yet implemented')
const deleteTraversalTypeEnum = () => console.log('deleteTraversalTypeEnum not yet implemented')
const deleteTraversalTypeEnums = () => console.log('deleteTraversalTypeEnums not yet implemented')
const aStarFinderArgs = ( { id } ) => CKG.queryOne("00e2ad86-940a-4784-aeec-ca08ae1691b4",id,true)
const aStarFinderArgss = ( { ids } ) => CKG.queryMany("00e2ad86-940a-4784-aeec-ca08ae1691b4",ids,true)
const allAStarFinderArgss = ( ) => CKG.queryAll("00e2ad86-940a-4784-aeec-ca08ae1691b4",true)
const aStarFinderArgsFilter = ( { filters } ) => CKG.filter("00e2ad86-940a-4784-aeec-ca08ae1691b4", filters )
const addAStarFinderArgs = () => console.log('addAStarFinderArgs not yet implemented')
const addAStarFinderArgss = () => console.log('addAStarFinderArgss not yet implemented')
const updateAStarFinderArgs = () => console.log('updateAStarFinderArgs not yet implemented')
const updateAStarFinderArgss = () => console.log('updateAStarFinderArgss not yet implemented')
const deleteAStarFinderArgs = () => console.log('deleteAStarFinderArgs not yet implemented')
const deleteAStarFinderArgss = () => console.log('deleteAStarFinderArgss not yet implemented')
const dock = ( { id } ) => CKG.queryOne("432d4486-788b-4145-bbb5-d08e89cfe055",id,true)
const docks = ( { ids } ) => CKG.queryMany("432d4486-788b-4145-bbb5-d08e89cfe055",ids,true)
const allDocks = ( ) => CKG.queryAll("432d4486-788b-4145-bbb5-d08e89cfe055",true)
const dockFilter = ( { filters } ) => CKG.filter("432d4486-788b-4145-bbb5-d08e89cfe055", filters )
const addDock = () => console.log('addDock not yet implemented')
const addDocks = () => console.log('addDocks not yet implemented')
const updateDock = () => console.log('updateDock not yet implemented')
const updateDocks = () => console.log('updateDocks not yet implemented')
const deleteDock = () => console.log('deleteDock not yet implemented')
const deleteDocks = () => console.log('deleteDocks not yet implemented')
const waypoint = ( { id } ) => CKG.queryOne("57f506d2-8ca1-456c-9e96-9d1e89abc4a7",id,true)
const waypoints = ( { ids } ) => CKG.queryMany("57f506d2-8ca1-456c-9e96-9d1e89abc4a7",ids,true)
const allWaypoints = ( ) => CKG.queryAll("57f506d2-8ca1-456c-9e96-9d1e89abc4a7",true)
const waypointFilter = ( { filters } ) => CKG.filter("57f506d2-8ca1-456c-9e96-9d1e89abc4a7", filters )
const addWaypoint = () => console.log('addWaypoint not yet implemented')
const addWaypoints = () => console.log('addWaypoints not yet implemented')
const updateWaypoint = () => console.log('updateWaypoint not yet implemented')
const updateWaypoints = () => console.log('updateWaypoints not yet implemented')
const deleteWaypoint = () => console.log('deleteWaypoint not yet implemented')
const deleteWaypoints = () => console.log('deleteWaypoints not yet implemented')
const entityTraversalCompatibility = ( { id } ) => CKG.queryOne("fc73c169-12b8-426a-8302-3e82751c6890",id,true)
const entityTraversalCompatibilitys = ( { ids } ) => CKG.queryMany("fc73c169-12b8-426a-8302-3e82751c6890",ids,true)
const allEntityTraversalCompatibilitys = ( ) => CKG.queryAll("fc73c169-12b8-426a-8302-3e82751c6890",true)
const entityTraversalCompatibilityFilter = ( { filters } ) => CKG.filter("fc73c169-12b8-426a-8302-3e82751c6890", filters )
const addEntityTraversalCompatibility = () => console.log('addEntityTraversalCompatibility not yet implemented')
const addEntityTraversalCompatibilitys = () => console.log('addEntityTraversalCompatibilitys not yet implemented')
const updateEntityTraversalCompatibility = () => console.log('updateEntityTraversalCompatibility not yet implemented')
const updateEntityTraversalCompatibilitys = () => console.log('updateEntityTraversalCompatibilitys not yet implemented')
const deleteEntityTraversalCompatibility = () => console.log('deleteEntityTraversalCompatibility not yet implemented')
const deleteEntityTraversalCompatibilitys = () => console.log('deleteEntityTraversalCompatibilitys not yet implemented')
const fieldValueProxy = ( { id } ) => CKG.queryOne("0e92296d-a82f-461f-b0f6-a4a73a46dd8b",id,true)
const fieldValueProxys = ( { ids } ) => CKG.queryMany("0e92296d-a82f-461f-b0f6-a4a73a46dd8b",ids,true)
const allFieldValueProxys = ( ) => CKG.queryAll("0e92296d-a82f-461f-b0f6-a4a73a46dd8b",true)
const fieldValueProxyFilter = ( { filters } ) => CKG.filter("0e92296d-a82f-461f-b0f6-a4a73a46dd8b", filters )
const addFieldValueProxy = () => console.log('addFieldValueProxy not yet implemented')
const addFieldValueProxys = () => console.log('addFieldValueProxys not yet implemented')
const updateFieldValueProxy = () => console.log('updateFieldValueProxy not yet implemented')
const updateFieldValueProxys = () => console.log('updateFieldValueProxys not yet implemented')
const deleteFieldValueProxy = () => console.log('deleteFieldValueProxy not yet implemented')
const deleteFieldValueProxys = () => console.log('deleteFieldValueProxys not yet implemented')

module.exports = {
    makeTileFilters,
    mapTiles,
    mapAndTiles,
    selectTile,
    constructMapAndTiles,
    routeVehicle,
    testRouting,
    projectIdFromAStarFinderArgs,
    projectNumRowsFromAStarFinderArgs,
    projectNumColumnsFromAStarFinderArgs,
    projectOriginFromAStarFinderArgs,
    projectTargetFromAStarFinderArgs,
    projectAllowDiagonalFromAStarFinderArgs,
    projectDontCrossCornersFromAStarFinderArgs,
    projectUnwalkableLocationsFromAStarFinderArgs,
    preAStar,
    defaultScenario,
    postAStar,
    projectXFromWaypoint,
    projectYFromWaypoint,
    map,
    maps,
    allMaps,
    mapFilter,
    addMap,
    addMaps,
    updateMap,
    updateMaps,
    deleteMap,
    deleteMaps,
    tile,
    tiles,
    allTiles,
    tileFilter,
    addTile,
    addTiles,
    updateTile,
    updateTiles,
    deleteTile,
    deleteTiles,
    tileDescriptor,
    tileDescriptors,
    allTileDescriptors,
    tileDescriptorFilter,
    addTileDescriptor,
    addTileDescriptors,
    updateTileDescriptor,
    updateTileDescriptors,
    deleteTileDescriptor,
    deleteTileDescriptors,
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
    mapAndTiles,
    mapAndTiless,
    allMapAndTiless,
    mapAndTilesFilter,
    addMapAndTiles,
    addMapAndTiless,
    updateMapAndTiles,
    updateMapAndTiless,
    deleteMapAndTiles,
    deleteMapAndTiless,
    traversalTypeEnum,
    traversalTypeEnums,
    allTraversalTypeEnums,
    traversalTypeEnumFilter,
    addTraversalTypeEnum,
    addTraversalTypeEnums,
    updateTraversalTypeEnum,
    updateTraversalTypeEnums,
    deleteTraversalTypeEnum,
    deleteTraversalTypeEnums,
    aStarFinderArgs,
    aStarFinderArgss,
    allAStarFinderArgss,
    aStarFinderArgsFilter,
    addAStarFinderArgs,
    addAStarFinderArgss,
    updateAStarFinderArgs,
    updateAStarFinderArgss,
    deleteAStarFinderArgs,
    deleteAStarFinderArgss,
    dock,
    docks,
    allDocks,
    dockFilter,
    addDock,
    addDocks,
    updateDock,
    updateDocks,
    deleteDock,
    deleteDocks,
    waypoint,
    waypoints,
    allWaypoints,
    waypointFilter,
    addWaypoint,
    addWaypoints,
    updateWaypoint,
    updateWaypoints,
    deleteWaypoint,
    deleteWaypoints,
    entityTraversalCompatibility,
    entityTraversalCompatibilitys,
    allEntityTraversalCompatibilitys,
    entityTraversalCompatibilityFilter,
    addEntityTraversalCompatibility,
    addEntityTraversalCompatibilitys,
    updateEntityTraversalCompatibility,
    updateEntityTraversalCompatibilitys,
    deleteEntityTraversalCompatibility,
    deleteEntityTraversalCompatibilitys,
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