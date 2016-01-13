module.exports = function(spawn) {
  if( typeof spawn.memory.creep_next_id == 'undefined' ) {
    spawn.memory.creep_next_id = 0;
  }

  if( typeof spawn.memory.creep_roles == 'undefined' ) {
    spawn.memory.creep_roles = [];
  } else {
    creep_roles = spawn.memory.creep_roles;

    for( var index in creep_roles ) {
      var role = creep_roles[index];

      // Correct malformed creeper roles
      if( role.indexOf('body') == -1 ) { role['body'] = []; }
      if( role.indexOf('creepName') == -1 ) { role['creepName'] = null; }
      if( role.indexOf('memory') == -1 ) { role['memory'] = {role: 'NaN'}; }

      // Check creep exists, if not
      if( role['creepName'] == null || typeof Game.creeps[role['creepName']] == 'undefined' ) {
        role['creepName'] = spawn.name + '-' + spawn.memory.creep_next_id.toString(16);
        console.log('Spawn: ' + spawn.name);
        console.log('Next ID: ' + spawn.memory.creep_next_id);
        console.log('New Name: ' + role['creepName']);

        var result = spawn.createCreep(role['body'], role['creepName'], role['memory']);

        if( typeof result == 'string' ) {
          spawn.memory.creep_next_id += 1;
        } else {
          switch(result) {
            case ERR_INVALID_ARGS:
                console.log('ERROR: Invalid arguments in spawn creeper auto-generation.');
                console.log(role.toString());
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
