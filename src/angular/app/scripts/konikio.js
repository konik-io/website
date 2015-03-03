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
    'ipCookie',
    'ngRoute',
    'restangular',
    'ui.bootstrap',
    'konikio.users',
    'konikio.validation',
    'konikio.utils'
  ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'partials/validation.html',
          controller: 'ValidationCtrl'
        })
        .when('/reset', {
          templateUrl: 'partials/users/new-password.html',
          controller: 'NewPasswordCtrl'
        });
    })
    .config(function (RestangularProvider) {
      RestangularProvider.setBaseUrl('http://onlinevalidation.konik.io');
    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
          return $injector.get('AuthInterceptor');
        }
      ]);
    })
    .run(['AuthService', function (AuthService) {
      AuthService.restoreSession(); // if user is loggedIn, get from the cookie
    }]);
})();
