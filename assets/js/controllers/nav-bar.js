/**
 * Created by rjbordon on 25/06/15.
 */

(function () {
  'use strict';

  angular
    .module('techoControllers')
    .controller('NavBarCtrl', NavBarCtrl);

  NavBarCtrl.$inject = [
    '$scope',
    '$rootScope'
  ];

  function NavBarCtrl($scope, $rootScope) {
    $scope.newFamily = function () {
      $rootScope.$broadcast('newMarker', {
          "bossFirstName": "",
          "bossLastName": "Nueva Familia",
          "street": "",
          "streetNumber": "",
          "neighborhood": "",
          "comments": "",
          "phone": "",
          "lat": 0,
          "lng": 0,
          "status": "2",
          "pollCount": "1",
          "priority": "0"
        }
      );
    }
  }
})();
