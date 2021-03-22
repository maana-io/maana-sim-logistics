const { conclusion } = input
return { 
    id: conclusion.id,
    conclusion: conclusion,
    selectedActions: conclusion.actions[0]
}