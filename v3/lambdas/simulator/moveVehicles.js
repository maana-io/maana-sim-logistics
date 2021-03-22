'use strict'
//=============================================================================
// INITIALIZATION
//=============================================================================
const { state } = input
const { mapAndTiles } = state
const { map, tiles } = mapAndTiles
//const { create, all } = require("mathjs");
const epsilon = 0.05; 
//=============================================================================
// HELPER FUNCTIONS
//=============================================================================
/** Given a x and y coordinate, find the tile at that position */
const findTile = ( x, y ) => tiles.find( t => t.x === x && t.y == y )

/** Given an x and y, compute the distance to the origin */
const magnitude = (x, y) => Math.sqrt(x * x + y * y);

/** Given a pair of points representing an x and y distance, return a
 * geometrically similar pair which has a magnitude of unity.*/
const normalize = (x, y) => {
  const mag = magnitude(x, y);
  return { x: x / mag, y: y / mag };
};

/** Given a pair of numbers, return the one with the smaller absolute 
 * magnitude */
const absMin = (a, b) => (Math.abs(a) > Math.abs(b) ? b : a);

//=============================================================================
// VEHICLE HELPER FUNCTIONS
//=============================================================================

/** Given an x and y coordinate representing the current position of a vehicle,
 * and a delta x and y representing the heading of the vehicle, and the speed 
 * of the vehicle, return the x and y coordinates resulting from moving the 
 * vehicle along the given heading until either the destination point is
 * reached, or when the vehicle has moved as far as possible in a single unit
 * of time at the given speed.
 */
const move = (x, y, deltaX, deltaY, speed) => {
  const dir = normalize(deltaX, deltaY);
  const stepX = dir.x * speed;
  const stepY = dir.y * speed;
  return {
    x: x + absMin(stepX, deltaX),
    y: y + absMin(stepY, deltaY),
  };
};

/** Test if a vehicle's given x and y position are exactly equal to some 
 * destination x and y coordinates. */
const atDest = (x, y, destX, destY ) => 
   x === destX && y === destY

/** A helper function that aempts to move a vehicle to the location of a waypoint 
 * This function mutates the vehicle to change its status and location.   
 * Returns the amount of distance remaining to move.
*/
const moveToWaypoint = (vehicle, destX, destY, moveRemaining ) => {
    const { transitOrder, fuel } = vehicle;
    const deltaX = destX - vehicle.x;
    const deltaY = destY - vehicle.y;
    const distToWaypoint = magnitude(deltaX,deltaY)
    const fuelRemaining = fuel.quantity 
    const efficiency = vehicle.efficiency
    // if the vehicle is repair mode, then we don't need to worry about fuel
    if (transitOrder.status.id === "Repair") {
      if ( distToWaypoint < epsilon ) {  
            vehicle.x = destX 
            vehicle.y = destY
            return moveRemaining
      } else if ( distToWaypoint < moveRemaining ) {
            vehicle.x = destX 
            vehicle.y = destY 
            return moveRemaining - distToWaypoint
      } else {
            const pos =  move(vehicle.x, vehicle.y, deltaX, deltaY, moveRemaining);
            vehicle.x = pos.x 
            vehicle.y = pos.y 
            return 0
        }
    } else  { // IN TRANSIT
      const cruisingDistance = fuelRemaining * efficiency
      const dist = Math.min(cruisingDistance,moveRemaining)
      if ( distToWaypoint < epsilon ) {
          // We are so close we will consider the vehicle has arrived, and not 
          // consume any fuel.
          vehicle.x = destX 
          vehicle.y = destY 
          return moveRemaining
      } else if (distToWaypoint < dist ) {
          const fuelUsed = distToWaypoint/efficiency
          vehicle.x = destX
          vehicle.y = destY 
          fuel.quantity = fuel.quantity - fuelUsed
          return moveRemaining - distToWaypoint
        }
      else {
          const pos = move(vehicle.x, vehicle.y, deltaX, deltaY, dist);
          const fuelUsed = dist/efficiency
          vehicle.x = pos.x 
          vehicle.y = pos.y 
          fuel.quantity = fuel.quantity - fuelUsed
          return moveRemaining - dist
      }
    } 
  }

/** Given a vehicle, has it become disabled this turn? */
function isVehicleDisabled(vehicle){
    const {
      reliability,
      durability,
      steps,
      lastServiceStep,
      serviceInterval,
    } = vehicle;
  
    const config = { randomSeed: vehicle.steps + vehicle.id.charCodeAt(vehicle.id.length-1)*1000 };
    //const math = create(all, config);
    const rand = Math.random();
  
    const stepsSinceService = vehicle.steps - lastServiceStep;
    const duty = Math.min(1, stepsSinceService / serviceInterval);
    const serviceNeed = 1 - (1 - durability) * duty*duty;
  
    return rand > serviceNeed || rand > reliability;
  };

  // TODO: Test if the tile that the vehicle is on is passable
function isTilePassable( vehicleType, x, y ) {
     return true 
}



/** Given a vehicle, process it's current transit order.   This function mutates the 
 * vehicle and may result in the vehicle moving, changing status, or becoming disabled.
 * */
function moveVehicle( vehicle ) {
  const { transitOrder, fuel } = vehicle;
  transitOrder.visited = []
  // ----------------------------
  // SANITY CHECKS
  // ----------------------------
  // If the vehicle doesn't have a transit order, then exit without changing the vehicle
  if ( !transitOrder  ) return vehicle
  // If the vehicle is not moving, then shortcut to avoid doing unnecessary work.  
  if ( ! ["Repair","InTransit","Pending"].includes(transitOrder.status.id )) return vehicle
  // If the vehicle has no fuel, and it is not in repair state, then the vehicle has
  // become disabled.  Someone should call for roadside assistance.
  if ( fuel.quantity === 0 && transitOrder.status.id !== "Repair") {
    transitOrder.status.id = "Disabled"
    return vehicle
  }

  const startPos = { x: vehicle.x, y: vehicle.y }
  const endPos   = (transitOrder.waypoints.length > 0 ) ? transitOrder.waypoints[transitOrder.waypoints.length -1] : startPos

    if (transitOrder.status.id === "Pending") {
        transitOrder.status.id = "InTransit";
    }
    vehicle.steps = vehicle.steps + 1
    transitOrder.steps = transitOrder.steps + 1;

    // Check if the vehicle has become disabled by random breakdown.
    if (isVehicleDisabled(vehicle)  ) {
        transitOrder.status.id = "Disabled";
        return vehicle
    } else {
        // move the vehicle toward destination
        let moveRemaining = vehicle.speed
        while (transitOrder.waypoints.length > 0 && moveRemaining > 0 && transitOrder.status.id !== "Disabled" ) {
        const wp = transitOrder.waypoints[0]
        moveRemaining = moveToWaypoint(vehicle, wp.x, wp.y, moveRemaining)
        if (atDest( vehicle.x, vehicle.y, wp.x, wp.y )) {
            transitOrder.visited.push(transitOrder.waypoints.shift())
        }
        }
        if (transitOrder.waypoints.length === 0) {
        if (transitOrder.status.id === "InTransit") {
            transitOrder.status.id = "Arrived";
        } else {
            transitOrder.status.id = "Disabled"; 
        }
        }
    }
    return vehicle  
} 

state.vehicles.forEach( moveVehicle)
return state