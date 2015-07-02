/**
 * Created by rjbordon on 01/07/15.
 */

module.exports = function (grunt) {

  grunt.config.set('jshint', {
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: [
        'app.js',
        'api/**/*.js',
        'assets/js/**/*.js',
        '!assets/js/dependencies/**/*.js',
        'test/**/*.js'
      ]
    }
  });

  // loading plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
};
