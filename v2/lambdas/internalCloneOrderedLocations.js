const uuidv4 = require("uuid").v4;

const { orderedLocations } = input;

return orderedLocations.map((x) => ({ ...orderedLocations, id: uuidv4() }));
