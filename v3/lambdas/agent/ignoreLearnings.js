const { decision } = input
return { 
    id: decision.id,
    beleifs: decision.conclusion.beleifs,
    decision: decision,
}