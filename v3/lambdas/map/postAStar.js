const { path } = input;

const TRAVERSABILITY_GRID_SIZE = 3;

const gridToTile = (pos) => (pos - 1) / TRAVERSABILITY_GRID_SIZE;

const waypoints = path.locations.map((oloc) => ({
  id: oloc.id,
  x: gridToTile(oloc.location.x),
  y: gridToTile(oloc.location.y),
  order: oloc.order,
}));

throw new Error(JSON.stringify(waypoints));

// return waypoints;
