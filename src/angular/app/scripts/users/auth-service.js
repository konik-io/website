'use strict';

(function(){
  angular.module('konikio.users.auth-service', [])
    .factory('AuthService', function ($q, Restangular, Session, ResponseParser) {
      var AuthService = {};

      AuthService.register = function (registerUser){
        var request = $q.defer();

        Restangular.one('register').customPOST(registerUser, null, null, { 'Content-Type': 'application/json' })
          .then(function () {
            request.resolve();
          })
          .catch(function(response){
            var errorMessage = ResponseParser.getErrorMessageFromResponse(response, 'Error during registration!');
            request.reject(errorMessage);
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
            var errorMessage = ResponseParser.getErrorMessageFromResponse(response, 'Error during log in!');
            request.reject(errorMessage);
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
            var errorMessage = ResponseParser.getErrorMessageFromResponse(response, 'Error while resetting password!');
            request.reject(errorMessage);
          });

        return request.promise;
      };

      AuthService.newPassword = function (email, token, newPassword) {
        var request = $q.defer();

        var requestObject = {
          'user': { 'email': email, 'password': newPassword },
          'token': token
        };

        Restangular.one('changePassword').customPOST(requestObject, null, null, { 'Content-Type': 'application/json' })
          .then(function(response){
            Session.create(response.token, email);
            request.resolve();
          })
          .catch(function(response){
            var errorMessage = ResponseParser.getErrorMessageFromResponse(response, 'Error while setting new password!');
            request.reject(errorMessage);
          });

        return request.promise;
      };

      AuthService.logout = function () {
        Session.destroy();
      };

      AuthService.restoreSession = function() {
        Session.createFromStore();
      };

      AuthService.isAuthenticated = function () {
        return !!Session.userId;
      };

      return AuthService;
    });
})();
