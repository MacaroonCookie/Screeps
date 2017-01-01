/*
 *  Builder Role
 */
var builder_handle = function(creep) {
  if( typeof creep.memory['status'] == 'undefined' )
    creep.memory['status'] = 'collecting';

  if( creep.memory['status'] == 'collecting' ) {
    if( typeof creep.memory['target'] == 'undefined' )
      creep.memory['target'] = {'x': -1.0, 'y': -1.0, 'set': false};

    if( ! creep.memory['target']['set'] ) {
      var energy_source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if( energy_source != null ) {
        creep.memory['target']['x'] = energy_source.pos.x;
        creep.memory['target']['y'] = energy_source.pos.y;
        creep.memory['target']['set'] = true;
      }
    }

    var target_location = creep.memory['target'];
    if( creep.pos.isNearTo(creep.memory['target']['x'], creep.memory['target']['y']) ) {
      creep.room.lookAt(target_location['x'], target_location['y']).forEach(
        function(obj) {
          if( obj.type == LOOK_SOURCES ) {
            var success = creep.harvest(obj[LOOK_SOURCES]);
            if( success == OK && _.sum(creep.carry) == creep.carryCapacity ) {
              creep.memory['target']['set'] = false;
              creep.memory['status'] = 'building';
            }
          }
        }
      );
      var success = creep.harvest(creep.room.lookAt(target_location['x'], target_location['y']));
    } else {
      creep.moveTo(target_location['x'], target_location['y']);
    }
  } else if ( creep.memory['status'] == 'building' ) {
    if( ! creep.memory['target']['set'] ) {
      var construction_site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
      if( construction_site != null ) {
        creep.memory['target']['x'] = construction_site.pos.x;
        creep.memory['target']['y'] = construction_site.pos.y;
        creep.memory['target']['set'] = true;
      }
    }

    var target_location = creep.memory['target'];
    if( _.sum(creep.carry) == 0 ) {
      creep.memory['target']['set'] = false;
      creep.memory['status'] = 'collecting';
    } else if( creep.pos.inRangeTo(target_location['x'], target_location['y'], 3) ) {
      var valid_target = false;
      creep.room.lookAt(target_location['x'], target_location['y']).forEach(
        function(obj) {
          if( obj.type == LOOK_CONSTRUCTION_SITES ) {
            if( creep.build(obj[LOOK_CONSTRUCTION_SITES]) != OK ) {
              console.log(creep.name + ' failed to build.');
              valid_target = true;
            }
          }
        }
      );
      if( ! valid_target ) {
        creep.memory['target']['set'] = false;
      }
    } else {
      creep.moveTo(target_location['x'], target_location['y']);
    }
  }
};
