var task = {
  body: {
    required: [
    ],
    weight: {
      MOVE: 1.0,
      WORK: 0.0,
      CARRY: 0.0,
      ATTACK: 0.0,
      RANGED_ATTACK: 0.0,
      TOUGH: 0.0,
      HEAL: 0.0,
      CLAIM: 0.0
    }
  },
  run: function(creep) {
    return OK;
  }
};

module.exports = task;
