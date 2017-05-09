var roles = {
  UNASSIGNED: null,
  harvester: role_harvester,
};

var role_handle = {
  run: function(creep) {
    if( creep.memory.roleName == UNASSIGNED ) {
      throw 'Role is unassigned';
    }

    var creep_role_name = creep.memory.roleName;
    if( ! creep_role_name in roles ) {
      throw 'Role (' + creep.memory.roleName + ') is not defined';
    } else {
      creep_role = roles[creep_name];
    }

    helper_set_memory_structure(creep.memory, 'roleData', creep_role.memory_structure);

    creep_role.pre_task(creep);
    var task_status = task_handle(creep);
    creep_role.post_task(creep, task_status);
  }
};
