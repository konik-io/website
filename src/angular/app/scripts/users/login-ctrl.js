'use strict';

(function() {
  angular.module('konikio.users.login', [])
    .controller('LoginCtrl', function ($scope, $modalInstance, AuthService) {

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
          .then(function(){
            $modalInstance.close();
          }, function(errorMessage){
            $scope.error = errorMessage;
          });
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  });
}());
