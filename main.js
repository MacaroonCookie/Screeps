var harvester = require('harvester');
var spawn_handler = require('spawn');

module.exports.loop = function () {
  for( var sName in Game.spawns ) {
    spawn_handler(Game.spawns[sName]);
  }

  for( var cName in Game.creeps ) {
      var creep = Game.creeps[cName];
      if( creep.memory.role == 'harvester') { harvester(creep); }
      else if( creep.memory.role == 'builder' ) { 
          if( creep.carry.energy == 0 ) {
              if( Game.spawns.Galactica.transferEnergy(creep) == ERR_NOT_IN_RANGE ) {
                  creep.moveTo(Game.spawns.Galactica);
              }
          } else {
              var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
              if( sites.length ) {
                  if( creep.build(sites[0]) == ERR_NOT_IN_RANGE ) {
                      creep.moveTo(sites[0]);
                  }
              }
          }
      } else if(creep.memory.role == 'guard') {
        var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        if(targets.length) {
          if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);		
          }
        }
      } else if(creep.memory.role == 'upgrader') {
          if( creep.carry.energy == 0 ) {
              if( Game.spawns.Galactica.transferEnergy(creep) == ERR_NOT_IN_RANGE ) {
                  creep.moveTo(Game.spawns.Galactica);
              }
          } else {
              if( creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE ) {
                  creep.moveTo(creep.room.controller);
              }
          }
      }
  }
}
