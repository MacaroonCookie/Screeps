var task_repair = {
  name: 'repair',
  memory_structure: {
    targetId: null
  },
  run: function(creep) {
    var target = Game.getObjectId(creep.memory.taskData.targetId);
    if( target == null ) {
      return TASK_FAILED;
    }

    var result = creep.repair(target);
    if( result != OK ) {
      return TASK_FAILED;
    }

    if( target.hits < target.hitsMax && creep.carry[RESOURCE_ENERGY] > 0 ) {
      return TASK_WORKING;
    }

    return TASK_COMPLETED;
  }
};

