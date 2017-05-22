// Node Class
function Node(name, task, decision) {
  this.name = name;
  this.task = task;
  this.decision = decision;
  this.edges = [];
}

Node.prototype.process = function(obj, memory_space) {
  var task_result = this.task(obj,memory_space);
  if( task_result == TASK_WORKING ) {
    return false;
  } else if( task_result == TASK_FAILED ) {
    return true;
  } else if( task_result == TASK_COMPLETED ) {
    return true;
  }
}

Node.prototype.next = function(obj, memory_space, previous_node) {
  
}
