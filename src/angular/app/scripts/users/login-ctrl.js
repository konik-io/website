'use strict';

(function() {
  angular.module('konikio.users.login', [])
    .controller('LoginCtrl', function ($scope, $rootScope, $modalInstance, AuthService, AUTH_EVENTS) {

      var clear = function() {
        $scope.error = '';
      };

      $scope.credentials = {
        email: '',
        password: ''
      };

      $scope.login = function (credentials) {
        clear();
        AuthService.login(credentials)
          .then(function(user){
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $modalInstance.close();
          }, function(errorMessage){
            $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            $scope.error = errorMessage;
          });
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  });
}());
