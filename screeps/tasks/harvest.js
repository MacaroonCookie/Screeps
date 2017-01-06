var task_harvest = {
  name: 'harvest',
  memory_structure: {
    targetId: null,
    capacity: 1.0
  },
  run: function(creep) {
    if( creep.memory.taskData.targetId == null ) {
      return TASK_FAILED;
    }

    var target = Game.getObjectById(creep.memory.taskData.targetId);
    if( target == null ) {
      return TASK_FAILED;
    }

    if( creep.pos.inRangeTo(target, 1) ) {
      if( creep.harvest(target) != OK ) {
        return TASK_FAILED;
      }
    } else {
      return TASK_FAILED;
    }

    if( _.sum(creep.carry) / creep.carryCapacity < creep.memory.taskData.capacity ) {
      return TASK_WORKING;
    }

    return TASK_COMPLETED;
  }
};

