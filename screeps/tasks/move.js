var task_move = {
  name: 'move',
  memory_structure: {
    targetId: null,
    range: 1
  },
  run: function(creep) {
    var target = Game.getObjectById(creep.memory.taskData.targetId);
    if( target == null ) {
      return TASK_FAILED;
    }

    if( ! creep.pos.inRange(target, creep.memory.taskData.range) ) {
      if( creep.fatigue > 0 ) {
        return TASK_WORKING;
      }

      var success = creep.moveTo(target);
      if( success == OK || success == ERR_TIRED ) {
        if( creep.pos.inRange(target, creep.memory.taskData.range) ) {
          return TASK_COMPLETED;
        } else {
          return TASK_WORKING;
        }
      }

      return TASK_COMPLETED;
    }
  }
};

