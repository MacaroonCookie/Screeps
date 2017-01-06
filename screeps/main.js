module.exports.loop = function() {
  for( creep in Game.creeps ) {
    creep_handle.run(creep);
  }
}
