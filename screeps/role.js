var roles = {
  UNASSIGNED: null,
  'harvester': role_harvester,
};

var role_handle = {
  run: function(creep) {
    if( creep.memory.roleName == UNASSIGNED ) {
      //throw 'Role is unassigned';
      console.log('[CREEP=' + creep.name + '] Role is unassigned');
      return;
    }

    var creep_role_name = creep.memory.roleName;
    if( ! (creep_role_name in roles) ) {
      console.log('[CREEP=' + creep.name + '] Role (' + creep.memory.roleName + ') is not defined');
      return;
    }

    var creep_role = eval('role_' + creep_role_name);

    helper_set_memory_structure(creep.memory, 'roleData', creep_role.memory_structure);

    creep_role.pre_task(creep);
    var task_status = task_handle.run(creep);
    creep_role.post_task(creep, task_status);
  }
};
