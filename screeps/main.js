//var harvester = require('harvester');
//var spawn_handler = require('spawn');

module.exports.loop = function () {
  // Clean up dead creep memories, AKA: GRAVE DIGGER
  for( var cname in Memory.creeps ) {
      if( typeof Game.creeps[cname] == 'undefined' ) {
          delete Memory.creeps[cname];
      }
  }

  for( var sName in Game.spawns ) {
    spawn_handler(Game.spawns[sName]);
  }

  for( var cName in Game.creeps ) {
      var creep = Game.creeps[cName];

      // Extend life if possible
      // Removing due to resource usage inefficiencies
      //Game.spawns.Spawn1.renewCreep(creep);

      if( creep.memory.role == 'harvester') {
        // Repair traveled roads
        /*var repair_roads = creep.pos.findInRange(FIND_STRUCTURES, 0, {filter: function(obj){ return obj.structureType == STRUCTURE_ROAD && obj.hits < (0.8 * obj.hitsMax);}});
        if( repair_roads.length && creep.carry.energy > 0 ) {
          creep.repair(repair_roads[0]);
        }*/
        harvester(creep);
      } else if( creep.memory.role == 'builder' ) {
        builder_handle(creep);
        /*if( creep.carry.energy == 0 || (creep.carry.energy < (0.25*creep.carryCapacity) && creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 3).length == 0) ) {
              if( Game.spawns.Spawn1.transferEnergy(creep) == ERR_NOT_IN_RANGE ) {
                  creep.moveTo(Game.spawns.Spawn1);
              }
          } else {
              var sites = Game.spawns.Spawn1.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
              if( sites != null ) {
                  var res = creep.build(sites);
                  if( res == ERR_NOT_IN_RANGE ) {
                      creep.moveTo(sites);
                  }
              }
        }*/
      } else if(creep.memory.role == 'guard') {
        var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        if(targets.length) {
          if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);		
          }
        }
      } else if(creep.memory.role == 'upgrader') {
          if( creep.carry.energy == 0 ) {
              if( creep.harvest(creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)) == ERR_NOT_IN_RANGE ) {
                  creep.moveTo(creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE));
              }
          } else {
              if( creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE ) {
                  creep.moveTo(creep.room.controller);
              }
          }
      }
  }
}
