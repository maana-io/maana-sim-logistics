const fs = require("fs");
const CKG = require("../CKG/ckg.js")
const maanaSimLogisticsApiV3 = require('../API: SimLogistics (v3)/index.js')
const maanaSimLogisticsSimulatorV3 = require('../Simulator: SimLogistics (v3)/index.js')

/** 
  * @param observation 
  * @param belief 
  */
function recommendNoActions( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/recommendNoActions.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function makeObservation( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/makeObservation.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** Given a simulation id, what actions would be recommended given the simulation's current state?
  * @param id 
  */
function testThink( input ) {
    const X0 = maanaSimLogisticsSimulatorV3.loadState({id: input.id})
    const X1 = think({state: X0})
    return X1
}

/** 
  * @param conclusion 
  */
function acceptRecommendations( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/acceptRecommendations.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param decision 
  */
function ignoreLearnings( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/ignoreLearnings.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param lesson 
  */
function projectActionsFromLesson( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/projectActionsFromLesson.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param id 
  * @param decision 
  * @param belief 
  */
function constructLesson( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/constructLesson.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param state 
  */
function think( input ) {
    const X0 = observe({state: input.state})
    const X1 = reason({observation: X0})
    const X2 = decide({conclusion: X1})
    const X3 = learn({decision: X2})
    const X4 = projectActionsFromLesson({lesson: X3})
    return X4
}

/** Given the state of a simulation, what features do we observe?
  * @param state 
  */
function observe( input ) {
    const X0 = makeObservation({state: input.state})
    return X0
}

/** 
  * @param conclusion 
  */
function projectIdFromConclusion( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/projectIdFromConclusion.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param conclusion 
  */
function projectObservationFromConclusion( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/projectObservationFromConclusion.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param lesson 
  */
function projectIdFromLesson( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/projectIdFromLesson.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param lesson 
  */
function projectDecisionFromLesson( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/projectDecisionFromLesson.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param id 
  * @param observation 
  * @param belief 
  */
function constructConclusion( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/constructConclusion.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param decision 
  */
function projectIdFromDecision( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/projectIdFromDecision.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param decision 
  */
function projectConclusionFromDecision( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/projectConclusionFromDecision.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param id 
  * @param sim 
  * @param state 
  */
function constructObservation( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/constructObservation.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param observation 
  */
function projectIdFromObservation( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/projectIdFromObservation.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param observation 
  */
function projectSimFromObservation( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/projectSimFromObservation.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param conclusion 
  */
function decide( input ) {
    const X0 = acceptRecommendations({conclusion: input.conclusion})
    return X0
}

/** 
  * @param id 
  * @param conclusion 
  */
function constructDecision( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/constructDecision.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param observation 
  * @param belief 
  */
function reason( input ) {
    const X0 = recommendNoActions({belief: input.belief,observation: input.observation})
    return X0
}

/** 
  * @param decision 
  */
function learn( input ) {
    const X0 = ignoreLearnings({decision: input.decision})
    return X0
}

/** 
  * @param lesson 
  */
function projectBeliefFromLesson( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/projectBeliefFromLesson.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

/** 
  * @param conclusion 
  */
function projectBeliefFromConclusion( input ) {
    const BODY = fs.readFileSync('./AI Agent: SimLogistics v3/projectBeliefFromConclusion.js','utf8')
    const func = eval(`input => {${BODY}}`)
    return func(input)
}

const lesson = ( { id } ) => CKG.queryOne("c4479ad7-c58e-4819-9eb4-3b3ad5840e87",id,true)
const lessons = ( { ids } ) => CKG.queryMany("c4479ad7-c58e-4819-9eb4-3b3ad5840e87",ids,true)
const allLessons = ( ) => CKG.queryAll("c4479ad7-c58e-4819-9eb4-3b3ad5840e87",true)
const lessonFilter = ( { filters } ) => CKG.filter("c4479ad7-c58e-4819-9eb4-3b3ad5840e87", filters )
const addLesson = () => console.log('addLesson not yet implemented')
const addLessons = () => console.log('addLessons not yet implemented')
const updateLesson = () => console.log('updateLesson not yet implemented')
const updateLessons = () => console.log('updateLessons not yet implemented')
const deleteLesson = () => console.log('deleteLesson not yet implemented')
const deleteLessons = () => console.log('deleteLessons not yet implemented')
const observation = ( { id } ) => CKG.queryOne("b809b6c4-e330-4527-a4ae-b3b17337ab51",id,true)
const observations = ( { ids } ) => CKG.queryMany("b809b6c4-e330-4527-a4ae-b3b17337ab51",ids,true)
const allObservations = ( ) => CKG.queryAll("b809b6c4-e330-4527-a4ae-b3b17337ab51",true)
const observationFilter = ( { filters } ) => CKG.filter("b809b6c4-e330-4527-a4ae-b3b17337ab51", filters )
const addObservation = () => console.log('addObservation not yet implemented')
const addObservations = () => console.log('addObservations not yet implemented')
const updateObservation = () => console.log('updateObservation not yet implemented')
const updateObservations = () => console.log('updateObservations not yet implemented')
const deleteObservation = () => console.log('deleteObservation not yet implemented')
const deleteObservations = () => console.log('deleteObservations not yet implemented')
const decision = ( { id } ) => CKG.queryOne("369bc806-3aaa-42d2-bee6-569f3633a753",id,true)
const decisions = ( { ids } ) => CKG.queryMany("369bc806-3aaa-42d2-bee6-569f3633a753",ids,true)
const allDecisions = ( ) => CKG.queryAll("369bc806-3aaa-42d2-bee6-569f3633a753",true)
const decisionFilter = ( { filters } ) => CKG.filter("369bc806-3aaa-42d2-bee6-569f3633a753", filters )
const addDecision = () => console.log('addDecision not yet implemented')
const addDecisions = () => console.log('addDecisions not yet implemented')
const updateDecision = () => console.log('updateDecision not yet implemented')
const updateDecisions = () => console.log('updateDecisions not yet implemented')
const deleteDecision = () => console.log('deleteDecision not yet implemented')
const deleteDecisions = () => console.log('deleteDecisions not yet implemented')
const conclusion = ( { id } ) => CKG.queryOne("31a50f5e-544f-4298-beec-f083f35e138f",id,true)
const conclusions = ( { ids } ) => CKG.queryMany("31a50f5e-544f-4298-beec-f083f35e138f",ids,true)
const allConclusions = ( ) => CKG.queryAll("31a50f5e-544f-4298-beec-f083f35e138f",true)
const conclusionFilter = ( { filters } ) => CKG.filter("31a50f5e-544f-4298-beec-f083f35e138f", filters )
const addConclusion = () => console.log('addConclusion not yet implemented')
const addConclusions = () => console.log('addConclusions not yet implemented')
const updateConclusion = () => console.log('updateConclusion not yet implemented')
const updateConclusions = () => console.log('updateConclusions not yet implemented')
const deleteConclusion = () => console.log('deleteConclusion not yet implemented')
const deleteConclusions = () => console.log('deleteConclusions not yet implemented')
const belief = ( { id } ) => CKG.queryOne("9694cd4a-32f8-4b6c-9260-2ad39b1a6549",id,true)
const beliefs = ( { ids } ) => CKG.queryMany("9694cd4a-32f8-4b6c-9260-2ad39b1a6549",ids,true)
const allBeliefs = ( ) => CKG.queryAll("9694cd4a-32f8-4b6c-9260-2ad39b1a6549",true)
const beliefFilter = ( { filters } ) => CKG.filter("9694cd4a-32f8-4b6c-9260-2ad39b1a6549", filters )
const addBelief = () => console.log('addBelief not yet implemented')
const addBeliefs = () => console.log('addBeliefs not yet implemented')
const updateBelief = () => console.log('updateBelief not yet implemented')
const updateBeliefs = () => console.log('updateBeliefs not yet implemented')
const deleteBelief = () => console.log('deleteBelief not yet implemented')
const deleteBeliefs = () => console.log('deleteBeliefs not yet implemented')

module.exports = {
    recommendNoActions,
    makeObservation,
    testThink,
    acceptRecommendations,
    ignoreLearnings,
    projectActionsFromLesson,
    constructLesson,
    think,
    observe,
    projectIdFromConclusion,
    projectObservationFromConclusion,
    projectIdFromLesson,
    projectDecisionFromLesson,
    constructConclusion,
    projectIdFromDecision,
    projectConclusionFromDecision,
    constructObservation,
    projectIdFromObservation,
    projectSimFromObservation,
    decide,
    constructDecision,
    reason,
    learn,
    projectBeliefFromLesson,
    projectBeliefFromConclusion,
    lesson,
    lessons,
    allLessons,
    lessonFilter,
    addLesson,
    addLessons,
    updateLesson,
    updateLessons,
    deleteLesson,
    deleteLessons,
    observation,
    observations,
    allObservations,
    observationFilter,
    addObservation,
    addObservations,
    updateObservation,
    updateObservations,
    deleteObservation,
    deleteObservations,
    decision,
    decisions,
    allDecisions,
    decisionFilter,
    addDecision,
    addDecisions,
    updateDecision,
    updateDecisions,
    deleteDecision,
    deleteDecisions,
    conclusion,
    conclusions,
    allConclusions,
    conclusionFilter,
    addConclusion,
    addConclusions,
    updateConclusion,
    updateConclusions,
    deleteConclusion,
    deleteConclusions,
    belief,
    beliefs,
    allBeliefs,
    beliefFilter,
    addBelief,
    addBeliefs,
    updateBelief,
    updateBeliefs,
    deleteBelief,
    deleteBeliefs
}