'use strict';

(function(){
  angular.module('konikio.users.auth-service', [])
    .factory('AuthService', function ($http, $q, Session) {
      var AuthService = {};

      AuthService.register = function (registerUser){
        var request = $q.defer();

        request.resolve();

        return request.promise;
      };

      AuthService.login = function (credentials) {
        var request = $q.defer();

        Session.create('abcd', credentials.email);
        request.resolve();

        return request.promise;
      };

      AuthService.isAuthenticated = function () {
        return !!Session.userId;
      };

      return AuthService;
    });
})();
