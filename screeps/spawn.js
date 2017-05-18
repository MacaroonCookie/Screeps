var spawn_handle = {
  get_usable_storage_capacity: function(spawn) {
    var storage_capacity = 0;
    var structures = spawn.room.find(FIND_MY_STRUCTURES, {'filter': function(obj) { return _.contains([STRUCTURE_SPAWN,STRUCTURE_EXTENSION],obj.structureType);}});

    for( var i=0; i<structures.length; i++ ) {
      storage_capacity += structures[i].energyCapacity;
    }
    return storage_capacity;
  },

  get_number_parts: function(part, energy, weight) {
    var parts = Math.floor( ((energy / BODYPART_COST[part]) * weight) / 100.0 );
    return parts;
  },

  get_part_list: function(part_hash) {
    var part_list = [];
    for(var part in part_hash) {
      for(var i=0; i<part_hash[part]; i++) {
        part_list.push(part);
      }
    }
    return part_list;
  },

  generate_harvest_creep: function(spawn) {
    var usable_energy = spawn_handle.get_usable_storage_capacity(spawn);
    var carry_parts = spawn_handle.get_number_parts(CARRY, usable_energy, 40);
    var move_parts  = spawn_handle.get_number_parts(MOVE,  usable_energy, 20);
    var work_parts  = spawn_handle.get_number_parts(WORK,  usable_energy, 40);
    var part_list = spawn_handle.get_part_list({carry: carry_parts, move: move_parts, work: work_parts});
    if( spawn.canCreateCreep(part_list) == OK ) {
      console.log('{move: '+move_parts +', carry: ' + carry_parts + ', work: ' + work_parts +'}');
      var result = spawn.createCreep(part_list,{'roleName':'harvester'});
    }
  },

  run: function(spawn) {
    // Determine Harvesters to build
    var harvest_capability = 0;
    for( var creep in Game.creeps ) {
      var c = Game.creeps[creep];
      if( c.memory['roleName'] == 'harvester' ) {
        harvest_capability = harvest_capability + (c.getActiveBodyparts(WORK)*2);
      }
    }

    var room_energy_capability = 0;
    var sources = spawn.room.find(FIND_SOURCES);
    for( var i=0; i<sources.length; i++ ) {
      room_energy_capability += (sources[i].energyCapacity/300);
    }

    console.log(room_energy_capability);
    if( (harvest_capability) < room_energy_capability && ! spawn.spawning) {
      spawn_handle.generate_harvest_creep(spawn);
    }
  }
}
