var creep_base_memory_structure = {
  roleName: UNASSIGNED,
  roleData: {},
  taskName: UNASSIGNED,
  taskData: {}
};

var creep_handle = {
  carryPercent: function(creep) {
    return _.sum(creep.carry)/creep.carryCapacity;
  },
  reset: function(creep) {
    helper_set_memory_structure(creep.memory, null, creep_base_memory_structure, true);
  },
  switch_task: function(creep, task_name) {
    if( task_name in tasks ) {
      creep.memory.taskName = task_name;
      helper_set_memory_structure(creep.memory, 'taskData', tasks[task_name].memory_structure, true);
    }
  },
  run: function(creep) {

    // Memory Checking and parsing
    helper_set_memory_structure(creep.memory, null, creep_base_memory_structure);

    try {
      role_handle.run(creep);
    } catch(err) {
      Game.notify('Creep (' + creep.name + ') failed: ' + err + '.');
    }
  }
}
