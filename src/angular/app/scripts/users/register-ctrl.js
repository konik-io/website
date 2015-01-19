'use strict';

(function() {
  angular.module('konikio.users.register', [])
    .controller('RegisterCtrl', function ($scope, $modalInstance, AuthService) {

      var clear = function() {
        $scope.error = '';
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
        }, function(){
            $scope.error = 'Registration failed';
          });
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  });
}());
