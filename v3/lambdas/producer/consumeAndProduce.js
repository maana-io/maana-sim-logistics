const { producer } = input;
const { material, products } = producer;

const producerUpdated = { ... producer, steps: producer.steps+1 }

// Sanity checks
const hasEnoughMaterials = material.every( x => x.quantity >= x.consumptionRate )
const hasEnoughCapacity  = products.every( x => x.capacity >= x.quantity + x.replenishRate )

// atomically update the materials and products
if ( hasEnoughMaterials && hasEnoughCapacity ) {
  const materialUpdates = material.map( x => {
    return {...x, quantity: x.quantity - x.consumptionRate}
    });
  const productUpdates = products.map( x => {
     return { ... x, quantity: x.quantity + x.replenishRate}
  })
  producerUpdated.material = materialUpdates
  producerUpdated.products = productUpdates
} 

return producerUpdated
