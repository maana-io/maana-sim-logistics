const { payload, waypoints } = input 
const { canRepair, vehicle, sim } = payload 

const status = (waypoints.length>0 && canRepair) ? "Repair" : "Cancelled"

return {
    id: `${vehicle}/${waypoints.map( x=> x.id).join('-')}#${new Date().valueOf()}`,
    vehicle,
    sim,
    waypoints: status === "Repair" ? waypoints : [],
    steps: 0,
    visited: [],
    status: { id: status }
}