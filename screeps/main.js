module.exports.loop = function() {

  for(var spawn in Game.spawns ) {
    try {
      spawn_handle.run(Game.spawns[spawn]);
    } catch(err) {
      console.log('[SPAWN=' + Game.spawns[spawn].name + '][ERROR] ' + err.stack);
    }
  }

  for(var creep in Game.creeps ) {
    try {
      creep_handle.run(Game.creeps[creep]);
    } catch(err) {
      console.log('[CREEP=' + Game.creeps[creep].name + '][ERROR] ' + err.stack);
    }
  }
}
