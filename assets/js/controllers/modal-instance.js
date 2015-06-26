/**
 * Created by rjbordon on 25/06/15.
 */

(function () {
  'use strict';

  angular
    .module('techoControllers')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);

  ModalInstanceCtrl.$inject = [
    '$scope',
    '$modalInstance',
    'selectedFamily'
  ];

  function ModalInstanceCtrl($scope, $modalInstance, selectedFamily) {
    $scope.selectedFamily = selectedFamily;

    $scope.ok = function () {
      $modalInstance.close($scope.selectedFamily);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
})();
