/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 module.exports = function(creep) {
     if(creep.carry.energy < creep.carryCapacity) {
		var sources = creep.room.find(FIND_SOURCES);
		var manualSource = false;
		
		if( typeof creep.memory.energySource != 'undefined' ) {
		    var types = creep.room.lookAt(creep.memory.energySource.x, creep.memory.energySource.y);
		    for( var i=0; i<types.length; i++) {
		        if( types[i].type == 'source' ) {
		            manualSource = true;

		            if( creep.harvest(types[i].source) == ERR_NOT_IN_RANGE ) {
		                creep.moveTo(types[i].source);
		            }
		        }
		    }
		}
		
		if( !manualSource ) {
		    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
			    creep.moveTo(sources[0]);
		    }
		}
	} else {
		if(creep.transfer(Game.spawns.Galactica, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
			creep.moveTo(Game.spawns.Galactica);
		}			
	}
 }
