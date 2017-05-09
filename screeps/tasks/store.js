var task_store = {
  name: 'store',
  memory_structure: {
    targetId: null
  },
  run: function(creep) {
    var target = Game.getObjectId(creep.memory.taskData.targetId);
    if( target == null ) {
      return TASK_FAILED;
    }

    if( ! creep.pos.inRange(target, 1) ) {
      return TASK_FAILED;
    } else {
      var result = creep.transfer(target);
      if( result != OK ) {
        return TASK_FAILED;
      }
    }

    return TASK_COMPLETED;
  }
};

