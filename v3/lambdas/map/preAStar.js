const { vehicleType, fromX, fromY, toX, toY, mapAndTiles } = input;
const { map, tiles } = mapAndTiles;

const TRAVERSABILITY_GRID_SIZE = 3;

// lookup table for indexing into a rotated array
const ROT_IDX_TABLE = {
  0: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  90: [6, 3, 0, 7, 4, 1, 8, 5, 2],
  180: [8, 7, 6, 5, 4, 3, 2, 1, 0],
  "-90": [2, 5, 8, 1, 4, 7, 0, 3, 6],
};

// Convert input tile-space point to traversal grid-space
const tileToGrid = (pos) => TRAVERSABILITY_GRID_SIZE * pos + 1;

// --- Compatibility testing

const compatibility = map.entityTraversalCompatibilities
  .filter((x) => x.entityType == vehicleType)
  .map((x) => x.traversalType);

const isCompatible = (traversalType) =>
  traversalType === "*" ||
  compatibility.includes(traversalType) ||
  compatibility.includes("*");

const isUnwalkable = (traversalType) =>
  traversalType === "!" || !isCompatible(traversalType);

// --- Descriptor index

var tileDescriptorIndex = {};
map.tileDescriptors.forEach((td) => (tileDescriptorIndex[td.id] = td));

// --- Build output

const mkLoc = (x, y) => ({ id: `(${x},${y})`, x, y });

const aStarArgs = {
  id: "",
  numRows: map.tilesY * TRAVERSABILITY_GRID_SIZE,
  numColumns: map.tilesX * TRAVERSABILITY_GRID_SIZE,
  origin: { ...mkLoc(tileToGrid(fromX), tileToGrid(fromY)) },
  target: { ...mkLoc(tileToGrid(toX), tileToGrid(toY)) },
  allowDiagonal: vehicleType !== "Truck", // TODO: should be a config
  dontCrossCorners: vehicleType != "Plane", // TODO: should be a cong
  unwalkableLocations: [],
};

// TODO: should be a config
if (vehicleType !== "Plane") {
  tiles.forEach((tile) => {
    const xOffset = tile.x * TRAVERSABILITY_GRID_SIZE;
    const yOffset = tile.y * TRAVERSABILITY_GRID_SIZE;

    const tileDescriptor = tileDescriptorIndex[tile.type];
    if (!tileDescriptor) {
      throw new Error(`No tile descriptor for: ${tile.type}`);
    }
    const traversabilityGrid = tileDescriptor.traversabilityGrid;

    // entire tile is not traversable
    const hasGrid = !!traversabilityGrid.length;

    const rotIdxTable = ROT_IDX_TABLE[tile.yRot];

    for (y = 0; y < TRAVERSABILITY_GRID_SIZE; y++) {
      for (x = 0; x < TRAVERSABILITY_GRID_SIZE; x++) {
        if (!hasGrid) {
          aStarArgs.unwalkableLocations.push(mkLoc(xOffset + x, yOffset + y));
        } else {
          const idx = y * TRAVERSABILITY_GRID_SIZE + x;
          const rotIdx = rotIdxTable[idx];
          const traversalType = traversabilityGrid[rotIdx];
          if (isUnwalkable(traversalType)) {
            aStarArgs.unwalkableLocations.push(mkLoc(xOffset + x, yOffset + y));
          }
        }
      }
    }
  });
}

return aStarArgs;
