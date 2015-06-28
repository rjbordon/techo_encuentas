/**
 * Created by martin on 06/06/15.
 */

(function () {
  'use strict';

  angular
    .module('techoServices')
    .factory('familyService', familyService);

  familyService.$inject = ['$http'];

  function familyService($http) {
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
      }
    };
  }
})();
