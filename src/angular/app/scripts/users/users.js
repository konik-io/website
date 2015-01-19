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
  'konikio.users.auth-service',
  'konikio.users.session'
])
  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  });
