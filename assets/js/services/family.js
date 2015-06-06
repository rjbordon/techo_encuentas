/**
 * Created by martin on 06/06/15.
 */

angular.module('service', []).service('familyService', ['$http'], function ($http) {
    return {
        getCurrentFamily: function (success, error) {
            $http(
                {
                    method: 'GET',
                    url: '/api/family'
                })
                .success(function (data) {
                    success(data);
                }).error(function (data) {
                    error(data);
                });
        }
    };
});
