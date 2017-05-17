var task_store = {
  name: 'store',
  memory_structure: {
    targetId: null
  },
  run: function(creep) {
    var target = Game.getObjectById(creep.memory.taskData.targetId);
    if( target == null ) {
      return TASK_FAILED;
    }

    if( ! creep.pos.inRangeTo(target, 1) ) {
      return TASK_FAILED;
    } else {
      var result = creep.transfer(target, RESOURCE_ENERGY);
      if( result == OK ) {
        return TASK_COMPLETED;
      }
    }

    return TASK_FAILED;
  }
};

