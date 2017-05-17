module.exports.loop = function() {
  for(var creep in Game.creeps ) {
    try {
      creep_handle.run(Game.creeps[creep]);
    } catch(err) {
      console.log('[CREEP=' + creep.name + '][ERROR] ' + err.stack);
    }
  }
}
