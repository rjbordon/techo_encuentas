/**
 * Created by rjbordon on 01/07/15.
 */

module.exports = function (grunt) {

  grunt.config.set('karma', {
    karma: {
      options: {
        configFile: 'test/karma-conf.js'
      }
    }
  });

  // loading plugins
  grunt.loadNpmTasks('grunt-karma');
};
