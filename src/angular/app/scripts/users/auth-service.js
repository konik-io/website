'use strict';

(function(){
  angular.module('konikio.users.auth-service', [])
    .factory('AuthService', function ($http, $q, Session) {
      var AuthService = {};

      AuthService.register = function (registerUser){
        var request = $q.defer();

        $http.post('http://te1.onlinevalidation.konik.io/register', registerUser)
          .success(function () {
            request.resolve();
          })
          .error(function(response){
            if (angular.isObject(response) && angular.isDefined(response.error)) {
              request.reject(response.error);
            } else if (angular.isArray(response)) {
              var errors = '';
              angular.forEach(response, function(error) {
                errors += errors ? ', ' : '';
                errors += error.field + ': ' + error.defaultMessage;
              });
              request.reject(errors);
            } else {
              request.reject('Error during registration!');
            }
          });

        return request.promise;
      };

      AuthService.login = function (credentials) {
        var request = $q.defer();

        $http.post('http://te1.onlinevalidation.konik.io/login', credentials)
          .success(function(){
            Session.create('abcd', credentials.email);
            request.resolve();
          })
          .error(function(response){
            if (angular.isObject(response)) {
              request.reject(response.error + ' ' + response.message);
            } else {
              request.reject('Error during logging in!');
            }
          });

        return request.promise;
      };

      AuthService.isAuthenticated = function () {
        return !!Session.userId;
      };

      return AuthService;
    });
})();
