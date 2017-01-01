var  spawn_handler = function(spawn) {
  if( typeof spawn.memory.creep_next_id == 'undefined' ) {
    spawn.memory.creep_next_id = 0;
  }

  if( typeof spawn.memory.creep_roles == 'undefined' ) {
    spawn.memory.creep_roles = [];
  } else {
    creep_roles = spawn.memory.creep_roles;

    for( var index in creep_roles ) {
      var role = creep_roles[index];

      if( typeof role == 'string' ) {
        console.log('Spawn ' + spawn.name + ': Creep Role #' + index.toString() + 'is a string, not object. Please re-add programmatically through the console.');
      }

      // Correct malformed creeper roles
      if( typeof role.body == 'undefined' ) { role['body'] = []; }
      if( typeof role.creepName == 'undefined' ) { role['creepName'] = null; }
      if( typeof role.memory == 'undefined' ) { role['memory'] = {role: 'NaN'}; }

      // Check creep exists, if not
      if( role['creepName'] == null || typeof Game.creeps[role['creepName']] == 'undefined' ) {
        role['creepName'] = spawn.name + '-' + spawn.memory.creep_next_id.toString(32);

        var result = spawn.createCreep(role['body'], role['creepName'], role['memory']);

        if( typeof result == 'string' ) {
          spawn.memory.creep_next_id += 1;
          console.log('Spawn ' + spawn.name + ': Created creep ' + role['creepName'] + ' for Role #' + index + '.');
          break;
        } else {
          switch(result) {
            case ERR_INVALID_ARGS:
                console.log('ERROR: Invalid arguments in spawn creeper auto-generation.');
                role['creepName'] = null;
                break;
            case ERR_NAME_EXISTS:
                spawn.memory.creep_next_id += 1;
            case ERR_BUSY:
            case ERR_NOT_ENOUGH_ENERGY:
            default:
                role['creepName'] = null;
                continue;
          }
        }
      }
    }
  }
}
