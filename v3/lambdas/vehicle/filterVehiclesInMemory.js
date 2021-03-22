const { sim, type, hub, x, y, vehicles } = input;

return vehicles.filter( v => 
  ( sim == null || v.sim.id === sim )
  && ( type == null || v.type.id === type )
  && ( hub == null || v.hub === hub )
  && ( x == null || v.x == x )
  && ( y == null || v.y == y )
)
