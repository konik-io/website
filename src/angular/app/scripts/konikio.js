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
})();
