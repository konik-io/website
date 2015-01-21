'use strict';

/**
 * @ngdoc overview
 * @name konikio.users
 *
 * @description
 * Module that provide user authentication and authorisation
 */
angular.module('konikio.users', [
  'konikio.users.login',
  'konikio.users.register',
  'konikio.users.reset',
  'konikio.users.auth-service',
  'konikio.users.session'
]);
