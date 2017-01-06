var task_upgrade = {
  name: 'upgrade',
  memory_structure: {
    targetId: null
  },
  run: function(creep) {
    var target = Game.getObjectById(creep.memory.taskData.targetId);
    if( target == null ) {
      return TASK_FAILED;
    }

    if( ! creep.pos.inRange(target, 3) ) {
      return TASK_FAILED;
    }

    if( creep.upgradeController(target) == OK ) {
      if( _.sum(creep.carry) == 0 ) {
        return TASK_COMPLETED;
      } else {
        return TASK_WORKING;
      }
    }

    return TASK_FAILED;
  }
};

