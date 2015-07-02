/**
 * Created by rjbordon on 01/07/15.
 */

module.exports = function (grunt) {
  grunt.registerTask('test', [
    'jshint',
    'karma'
  ]);
};
