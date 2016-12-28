/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('harvester'); // -> 'a thing'
 */
 module.exports = function(creep) {
     if( creep.carry.energy < 0.25*creep.carryCapacity || (creep.carry.energy < creep.carryCapacity && creep.pos.findInRange(FIND_SOURCES, 1).length) ){
		var sources = creep.pos.findClosestByRange(FIND_SOURCES);
		var manualSource = false;
		
		if( typeof creep.memory.energySource != 'undefined' ) {
		    var types = creep.room.lookAt(creep.memory.energySource.x, creep.memory.energySource.y);
		    for( var i=0; i<types.length; i++) {
		        if( types[i].type == 'source' ) {
		            manualSource = true;

		            if( creep.harvest(types[i].source) == ERR_NOT_IN_RANGE ) {
		                creep.moveTo(types[i].source, {reusePath:2});
		            }
		        }
		    }
		}

		if( !manualSource ) {
		    if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
			    creep.moveTo(sources, {reusePath:2});
		    }
		}
	 } else {
	    var nearSites = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 3);

	    if( creep.carry.energy > (0.75 * creep.carryCapacity) && nearSites.length ) {
	        creep.build(nearSites[0]);
	    }

	    if( Game.spawns.Galactica.energy == Game.spawns.Galactica.energyCapacity ) {
	        var closest_extension = creep.pos.findClosestByRange(FIND_STRUCTURES, {filter:(obj)=>obj.structureType == STRUCTURE_EXTENSION && obj.energy < obj.energyCapacity});
	        if( closest_extension != null ) {
	            if( creep.transfer(closest_extension, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
	                creep.moveTo(closest_extension, {reusePath:2});
	            }
	        }
	    } else if( creep.transfer(Game.spawns.Galactica, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE ) {
			creep.moveTo(Game.spawns.Galactica, {reusePath:2});
		}			
	}
 }
