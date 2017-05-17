var tasks = {
  'unassigned': task_unassigned,
  'harvest': task_harvest,
  'move': task_move,
  'upgrade': task_upgrade,
  'build': task_build,
  'repair': task_repair,
  'store': task_store,
};

var task_handle = {
  run: function(creep) {
    if( creep.memory.taskName == UNASSIGNED ) {
      console.log('task is unassigned');
      //throw 'task is unassigned');
      return;
    }

    var creep_task_name = creep.memory.taskName;
    if( ! (creep_task_name in tasks) ) {
      //throw 'task (' + creep.memory.taskName + ') is not defined';
      console.log('task (' + creep.memory.taskName + ') is not defined');
      return;
    }

    var creep_task = eval('task_' + creep_task_name);

    helper_set_memory_structure(creep.memory, 'taskData', creep_task.memory_structure);

    var result = creep_task.run(creep);
    return result;
  }
};
