/**
 * Created by rjbordon on 28/06/15.
 */

(function () {
  'use strict';

  angular
    .module('techo.directives')
    .directive('techoNavBar', navBar);

  navBar.$inject = [
    'familyService'
  ];

  function navBar(familyService) {
    var link = function (scope) {
      scope.newFamily = function () {
        familyService.fireNewFamilyEvent();
      };
    };

    return {
      scope: {
        logoSrc: '@',
        addFamilyText: '@'
      },
      restrict: "E",
      templateUrl: 'templates/directives/nav-bar.html',
      replace: true,
      link: link
    };
  }
})();
