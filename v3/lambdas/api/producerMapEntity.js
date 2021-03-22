const {producer} = input;
return {
    id: producer.id,
    type: "Producer",
    kind: producer.type.id,
    x: producer.x,
    y: producer.y
}