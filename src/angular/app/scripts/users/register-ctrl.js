'use strict';

(function() {
  angular.module('konikio.users.register', [])
    .controller('RegisterCtrl', function ($scope, $modalInstance, AuthService) {

      $scope.error = {};

      var clear = function() {
        $scope.error.message = '';
      };

      $scope.registerUser = {
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        password: ''
      };

      $scope.register = function (registerUser) {
        clear();
        AuthService.register(registerUser)
          .then(function(){
          $modalInstance.close();
        }, function(errorMessage){
            $scope.error.message = errorMessage;
          });
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  });
}());
