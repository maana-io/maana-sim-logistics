const { vehicleType, fromX, fromY, toX, toY, mapAndTiles } = input;
const { map, tiles } = mapAndTiles;

const mkLoc = (x, y) => ({ id: `(${x},${y})`, x, y });

const isOriginOrTarget = (x, y) =>
  (x == fromX && y == fromY) || (x == toX && y == toY);

const aStarArgs = {
  id: "",
  numRows: map.tilesY,
  numColumns: map.tilesX,
  origin: { ...mkLoc(fromX, fromY) },
  target: { ...mkLoc(toX, toY) },
  allowDiagonal: false,
  dontCrossCorners: true,
  unwalkableLocations: [],
};

if (vehicleType == "Plane") {
  aStarArgs.allowDiagonal = true;
  aStarArgs.dontCrossCorners = false;
} else {
  const traversalFilter = vehicleType == "Truck" ? "Road" : "Water";

  aStarArgs.unwalkableLocations = tiles
    .filter(
      (tile) =>
        tile.traversalType.id !== traversalFilter &&
        !isOriginOrTarget(tile.x, tile.y)
    )
    .map((tile) => mkLoc(tile.x, tile.y));
}

return aStarArgs;
