const {hub} = input;
return {
    id: hub.id,
    type: "Hub",
    kind: hub.type.id,
    x: hub.x,
    y: hub.y
}