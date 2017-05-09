/* Sets the structure under a memory section
 * @param memory - Screeps memory structure
 * @param key - keyname under memory structure, null for base of memory
 * @param structure - structure the memory segment
 * @param strict - if true, keys or types do not match given structure are corrected
 */
function helper_set_memory_structure(memory, key, structure, strict) {
  strict = strict || false;

  if( key != null && ! (key in memory) ) {
    memory[key] = Object.assign({}, structure);
  } else {
    var memory_focus = (key == null) ? memory : memory[key];

    for(struct_key in structure) {
      if( ! (struct_key in memory_focus) ) {
        if( typeof structure[struct_key] == "object" ) {
          memory_focus[struct_key] = Object.assign({}, structure[struct_key]);
        } else {
          memory_focus[struct_key] = structure[struct_key];
        }
      } else {
        if( typeof structure[struct_key] != typeof memory_focus[struct_key] && strict ) {
          if( typeof structure[struct_key] == "object" ) {
            memory_focus = Object.assign({}, structure[struct_key]);
          } else {
            memory_focus = structure[struct_key];
          }
        } else {
          if( typeof memory_focus[struct_key] == "object" ) {
            helper_set_memory_structure(memory_focus, struct_key, structure[struct_key], strict);
          }
        }
      }
    }
  }
}
