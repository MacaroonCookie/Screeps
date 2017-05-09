var role_harvester = {
  name: 'harvester',
  memory_structure: {},
  find_delivery_target: function(creep) {
    var target = null;

    // Not going to collect, go store
    target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
        { filter: function(obj) {
            return 
              obj.structureType in [STRUCTURE_SPAWN, STRUCTURE_EXTENSION, STRUCTURE_STORAGE, STRUCTURE_CONTAINER]
              && _.sum(obj.store) != obj.storeCapacity;
          }
        }
    );

    if( target == null ) {
      // Focus on towers next
      target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES, {
        algorithm: 'dijkstra',
        filter: function(obj) {
          return obj.structureType == STRUCTURE_TOWER &&
            ( obj.energy < obj.energyCapacity ||
              obj.hits < obj.hitsMax 
            );
        }
      });
    }

    if( target == null ) {
      // If not available storage, find construction
      target = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
    }

    if( target == null) {
      // No active construction, go repair roads
      target = creep.pos.findClosestByPath(FIND_STRUCTURE, {
        algorith: 'dijkstra',
        filter: function(obj) {
          return obj.structureType == STRUCTURE_ROAD && obj.hits < obj.hitsMax;
        }
      });
    }

    if( target == null ) {
      // No raods to repair (lol, yeah right), do walls
      target = creep.pos.findClosestByPath(FIND_STRUCTURE, {
        algorithm: 'dijkstra',
        filter: function(obj) {
          return obj.structureType == STRUCTURE_WALL && obj.hits<obj.hitsMax;
        }
      });
    }

    return target;
  },
  pre_task: function(creep) {
    if( creep.taskName == UNASSIGNED ) {
      // If the resource ran out of energy before we are full and we are not full
      if( task_status == TASK_FAILED && creep_handle.carryPercent(creep) < 0.75 ) {
        // Move to source to collect more
        target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      } else {
        target = role_harvester.find_delivery_target(creep);
      }

      if( target == null ) {
        creep_handle.switch_task(creep, UNASSIGNED);
      } else {
        creep_handle.switch_task('move');
        creep.memory.taskData.targetId = target.id;
      }
    }
  },
  post_task: function(creep, task_status) {
    if( task_status == TASK_WORKING ) {
      return;
    }

    // Completed or failed handling
    if( creep.memory.taskName == 'harvest' ) {
      var target = null;

      // If the resource ran out of energy before we are full and we are not full
      if( task_status == TASK_FAILED && creep_handle.carryPercent(creep) < 0.75 ) {
        // Move to source to collect more
        target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      } else {
        target = role_harvester.find_delivery_target(creep);
      }

      if( target == null ) {
        creep_handle.switch_task(creep, UNASSIGNED);
      } else {
        creep_handle.switch_task('move');
        creep.memory.taskData.targetId = target.id;
      }
    }

    if( creep.memory.taskName == 'move' ) {
      if( task_status == TASK_FAILED ) {
        // The object no longer exists, reset logic
        creep_handle.switch_task(creep, UNASSIGNED);
      } else {
        // Otherwise determine what to do next
        var target = Game.getObjectById(creep.memory.taskData.targetId);
        var next_task = UNASSIGNED;
        switch(typeof target) {
          case Source:
            next_task = 'harvest';
            break;
          case StructureStorage:
          case StructureContainer:
          case StructureSpawn:
          case StructureExtension:
            next_task = 'store';
            break;
          case StructureWall:
          case StructureRampart:
          case StructureRoad:
            next_task = 'repair';
            break;
          case StructureTower:
            if( target.hits / target.hitsMax < 0.5 ) {
              next_task = 'repair';
            } else if( target.energy < target.energyCapactiy ) {
              next_task = 'store';
            } else {
              next_task = 'repair';
            }
            break;
        }

        creep_handle.switch_task(creep, next_task);
        creep.memory.taskData.targetId = target.id;
      }
    }

    if( creep.memory.taskName == 'repair' || creep.memory.taskName == 'store' ) {
      var target = Game.getObjectById(creep.memory.taskData.targetId);
      var task_name = creep.memory.taskName;

      if( task_status == TASK_FAILED ) {
        if( target == null ) {
          creep_handle.switch_task(creep, UNASSIGNED);
          return;
        } else if( task_name == 'repair' ) {
          if( ! creep.pos.inRange(target, 3) ) {
            creep_handle.switch_task(creep, 'move');
            creep.memory.taskData.targetId = target.id;
            return;
          }
        } else if( task_name == 'store' ) {
          if( ! creep.pos.inRange(target, 1) ) {
            creep_handle.switch_task(creep, 'move');
            creep.memory.taskData.targetId = target.id;
            return;
          }
        }
      }

      creep_handle.switch_task(creep, UNASSIGNED);
    }
    return;
  }
};
