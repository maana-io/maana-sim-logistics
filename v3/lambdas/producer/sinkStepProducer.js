const { producer } = input;

producer.steps = producer.steps + 1;

producer.type = producer.type.id;
producer.material = producer.material.map((x) => x.id);
producer.products = producer.products.map((x) => x.id);

return producer;
