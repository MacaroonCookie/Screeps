var roles = [
];

var role_handle = {
  run: function(creep) {
    if( creep.memory.roleName == UNASSIGNED ) {
      throw 'Role is unassigned';
    }

    var creep_role = null;
    for( role in roles ) {
      if( creep.memory.roleName == role.name ) {
        creep_role = role;
        break;
      }
    }

    if( creep_role == null ) {
      throw 'Role (' + creep.memory.roleName + ') is not defined';
    } else {
      helper_set_memory_structure(creep.memory, 'roleData', creep_role.memory_structure, true);
      creep_role.run(creep);
    }
  }
};
