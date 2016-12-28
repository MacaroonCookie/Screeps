function Creep(creep) {

  this.creep = creep;
  this.init();
  this.run();
}

Creep.prototype.ROLE_HARVESTER = 'H';
Creep.prototype.ROLE_BUILDER = 'B';
Creep.prototype.ROLE_UPGRADER = 'U';
Creep.prototype.ROLE_ATTACKER = 'A';
Creep.prototype.ROLE_UNASSIGNED = 'nil';

Creep.prototype.TASK_UNASSIGNED = 0;
Creep.prototype.TASK_ATTACK = 1;
Creep.prototype.TASK_HARVEST = 2;
Creep.prototype.TASK_DELIVER = 4;
Creep.prototype.TASK_TRANSFER = 8;
Creep.prototype.TASK_BUILD = 16;
Creep.prototype.TASK_UPGRADE = 32;
Creep.prototype.TASK_REPAIR = 64;

Creep.prototype.STATE_INACTIVE = 0;

Creep.prototype.ROLES = {
  Creep.ROLE_UNASSIGNED:  require('creep_role_unassigned'),
  Creep.ROLE_HARVESTER:   require('creep_role_harvester'),
  Creep.ROLE_BUILDER:     require('creep_role_builder'),
  Creep.ROLE_UPGRADER:    require('creep_role_upgrader'),
  Creep.ROLE_ATTACKER:    require('creep_role_attacker')
};

function Creep.prototype.init() {
  if( ! 'role' in this.creep.memory ) {
    this.creep.memory['role'] = this.ROLE_UNASSIGNED;
  }

  if( ! 'state' in this.creep.memory ) {
    this.creep.memory['state'] = this.STATE_NULL;
  }

  if( ! 'task' in this.creep.memory ) {
    this.creep.memory['task'] = this.TASK_UNASSIGNED;
  }
}

function Creep.prototype.run() {
  this.ROLES[this.creep.memory['role']](this);
}

module.exports = Creep;
