var transfer = {
  name: 'transfer',
  memory_structure: {
    targetId: null,
    resource: 'any',
    amount: null
  },
  run: function(creep) {
    if( creep.memory.task.targetId == null ) {
      return TASK_FAILED;
    }

    var target = Game.getObjectById(creep.memory.task.targetId);
    if( target == null ) {
      return TASK_FAILED;
    }

    if( ! creep.isNearTo(target) ) {
      return TASK_FAILED;
    }

    var transferred = false;
    for(var resource in creep.carry) {
      if( resource == creep.memory.task.resource || creep.memory.task.resource == 'any' ) {
        var success = null;
        if( creep.memory.task.amount == null ) {
          success = creep.transfer(target, resource);
        } else {
          success = creep.transfer(target, resource, creep.memory.task.amount);
        }

        if( ! (success == OK || success == ERR_FULL || success == ERR_INVALID_TARGET) ) {
          return TASK_FAILED;
        } else {
          transferred = true;
        }
      }
    }

    if( ! transferred ) {
      return TASK_FAILED;
    }

    return TASK_COMPLETED;
  }
};

