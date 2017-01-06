var creep_base_memory_structure = {
  roleName: UNASSIGNED,
  roleData: {},
  taskName: UNASSIGNED,
  taskData: {}
};

var creep_handle = {
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
