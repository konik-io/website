'use strict';

(function() {
  angular.module('konikio.users.auth-interceptor', [])
    .factory('AuthInterceptor', function ($q, Session) {
      var authInterceptorServiceFactory = {};

      var _request = function (config) {

        config.headers = config.headers || {};

        if (angular.isDefined(Session.id)) {
          //include token into each request header
          config.headers.Authorization = Session.id;
        }
        return config;
      };

      var _responseError = function (rejection) {
        return $q.reject(rejection);
      };

      authInterceptorServiceFactory.request = _request;
      authInterceptorServiceFactory.responseError = _responseError;

      return authInterceptorServiceFactory;
    });
})();
