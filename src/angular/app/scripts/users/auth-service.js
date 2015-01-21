'use strict';

(function(){
  angular.module('konikio.users.auth-service', [])
    .factory('AuthService', function ($http, $q, Restangular, Session) {
      var AuthService = {};

      AuthService.register = function (registerUser){
        var request = $q.defer();

        Restangular.one('register').customPOST(registerUser, null, null, { 'Content-Type': 'application/json' })
          .then(function () {
            request.resolve();
          })
          .catch(function(response){
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

        Restangular.one('login').customPOST(credentials, null, null, { 'Content-Type': 'application/json' })
          .then(function(response){
            Session.create(response.token, credentials.email);
            request.resolve();
          })
          .catch(function(response){
            if (angular.isObject(response)) {
              request.reject(response.error + ' ' + response.message);
            } else {
              request.reject('Error during logging in!');
            }
          });

        return request.promise;
      };

      AuthService.reset = function (email) {
        var request = $q.defer();

        Restangular.one('resetPassword').customPOST(email, null, null, { 'Content-Type': 'application/json' })
          .then(function(){
            request.resolve();
          })
          .catch(function(response){
            if (angular.isObject(response)) {
              request.reject(response.error + ' ' + response.message);
            } else {
              request.reject('Error during resetting password!');
            }
          });

        return request.promise;
      };

      AuthService.isAuthenticated = function () {
        return !!Session.userId;
      };

      AuthService.getCurrentSession = function() {
        return Session;
      };

      return AuthService;
    });
})();
