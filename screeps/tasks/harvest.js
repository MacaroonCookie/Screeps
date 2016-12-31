var task_harvest = {
  body: {
    required: [
      MOVE,
      WORK,
      CARRY
    ],
    weight: {
      MOVE: 0.25,
      WORK: 0.25,
      CARRY: 0.50,
      ATTACK: 0.0,
      RANGED_ATTACK: 0.0,
      TOUGH: 0.0,
      HEAL: 0.0,
      CLAIM: 0.0
    }
  },
  run: function(creep, target=null) {
    if( typeof creep.memory['state'] == 'undefined' ) {
      creep.memory['state'] = 'unassigned';
    }

    if( creep.memory['state'] == 'unassigned' ) {
      if( _.sum(creep.carry) > 0 ) {
        return OK;
      } else {
        creep.memory['state'] = 'moving';
      }
    }

    if( creep.memory['state'] == 'moving' ) {
      creep.
    }

    return OK;
  }
};

module.exports = task_harvest;
