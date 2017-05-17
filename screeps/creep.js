var creep_base_memory_structure = {
  roleName: UNASSIGNED,
  roleData: {},
  taskName: UNASSIGNED,
  taskData: {}
};

var creep_handle = {
  carryPercent: function(creep) {
    return 100*_.sum(creep.carry)/creep.carryCapacity;
  },
  reset: function(creep) {
    helper_set_memory_structure(creep.memory, null, creep_base_memory_structure, true);
  },
  switch_task: function(creep, task_name) {
    if( task_name in tasks ) {
      console.log("[creep=" + creep.name + "](Switch Task) From '" + creep.memory.taskName + "' to '" + task_name + "'");
      creep.memory.taskName = task_name;
      helper_set_memory_structure(creep.memory, 'taskData', eval("task_"+task_name).memory_structure, true);
    } else {
      console.log("[CREEP=" + creep.name + "] Task (" + task_name + ") does not exist.");
  },
  run: function(creep) {
    // Memory Checking and parsing
    helper_set_memory_structure(creep.memory, null, creep_base_memory_structure);
    try {
      role_handle.run(creep);
    }catch(err) {
      throw '[CREEP=' + creep.name + '] ' + err;
    }
  }
}
