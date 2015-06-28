/**
 * Created by martin on 06/06/15.
 */

(function () {
  'use strict';

  angular
    .module('techoServices')
    .factory('familyService', familyService);

  familyService.$inject = [
    '$http',
    '$rootScope'
  ];

  function familyService($http, $rootScope) {
    var API = '/api/family';

    return {
      getAll: function (success, error) {
        $http(
          {
            method: 'GET',
            url: API
          })
          .success(function (data) {
            success(data);
          }).error(function (data) {
            error(data);
          });
      },
      upsert: function (data, success, error) {
        var method = 'POST',
          url = API;
        if (data.id !== undefined) {
          method = 'PUT';
          url = API + '/' + data.id;
        }

        $http({
          method: method,
          url: url,
          data: data
        }).success(function (data) {
          success(data);
        }).error(function (data) {
          error(data);
        });
      },
      fireNewFamilyEvent: function () {
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
    };
  }
})();
