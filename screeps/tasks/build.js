var task_build = {
  name: 'build',
  memory_structure: {
    targetId: null
  },
  run: function(creep) {
    var target = Game.getObjectById(creep.memory.taskData.targetId);
    if( target == null ) {
      return TASK_FAILED;
    }

    var result = creep.build(target);
    if( result != OK ) {
      return TASK_FAILED;
    }

    if( target.progress < target.progressTotal && creep.carry[RESOURCE_ENERGY] > 0 ) {
      return TASK_WORKING;
    }

    return TASK_COMPLETED;
  }
};

