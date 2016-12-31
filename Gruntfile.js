module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-screeps');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    screeps: {
      options: grunt.file.readJSON('screeps.json'),
      dist: {
        src: [ 'compiled/*.js' ]
      }
    },
    uglify: {
      screeps_target: {
        files: {
          'compiled/main.js': [
            'screeps/creep.js'
          ]
        }
      }
    }
  });
}
