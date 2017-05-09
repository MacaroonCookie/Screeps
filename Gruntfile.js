module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-screeps');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    screeps: {
      options: grunt.file.readJSON('screeps.json'),
      dist: {
        src: [ 'compiled/*.js' ]
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      screeps: {
        files: {
          'compiled/main.js': [
            'screeps/*.js',
            'screeps/**/*.js',
            'screeps/**/**/*.js',
            'screeps/**/**/**/*.js'
          ]
        }
      }
    }
  });
}
