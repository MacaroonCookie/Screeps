// Graph Class
// - A directed graph for AI logic design
function Graph(obj_type, entry_node) { 
  this.nodes = {};
  this.edges = [];
  this.object_type = obj_type;

  this.entry_node = entry_node.name;
  this.nodes[entry_node.name] = entry_node;
}

Graph.prototype.memory_structure = {
    'current_node': null,
    'previous_node': null
}

Graph.prototype.run = function(obj, memory_space) {
  if( ! obj instanceof this.object_type ) {
    throw 'Object not compatible with graph';
  }

  // Ensure memory space is formatted properly
  helper_set_memory_structure(memory_space, null, obj.memory_structure, false);

  // If the object hasn't run on this graph yet, set the graph entrypoint
  if( memory_space.current_node == null ) {
    memory_space.current_node = this.entry_node;
  }

  // Check the specified node exists
  if( ! memory_space.current_node in this.nodes ) {
    throw 'Objects current defined node not in graph';
  }
  if( memory_space.previous_node != null && ! memory_space.previous_node in this.nodes ) {
    throw 'Objects previous defined node not in graph';
  }


  // Process the node logic
  var current_node = this.nodes[memory_space.current_node];
  var node_finished = current_node.process(obj, memory_space);
  if( node_finished ) {
    var next_node = current_node.next(memory_space.previous_name);
    if( ! next_node in this.nodes ) {
      throw 'Next node not in graph';
    }
    memory_space.previous_node = memory_space.current_node;
    memory_space.current_node = next_node;
  }
}

Graph.prototype.addNode = function(node) {
  if( node.name in this.nodes ) { 
    throw 'Node already in graph';
  }

  this.nodes[node.name] = node;
}

Graph.prototype.connectTo = function(from_node, to_node, cost_function) {
  
}
