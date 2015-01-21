'use strict';

/**
 * @ngdoc overview
 * @name konik.io.app
 *
 * @description
 * Application for konik.io site
 */
(function() {
  angular.module('konikio', [
    'restangular',
    'ui.bootstrap',
    'konikio.users',
    'konikio.validation'
  ])
    .config(function (RestangularProvider) {
      RestangularProvider.setBaseUrl('http://te1.onlinevalidation.konik.io');
    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
          return $injector.get('AuthInterceptor');
        }
      ]);
    })
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
