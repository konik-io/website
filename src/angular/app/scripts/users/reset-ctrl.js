'use strict';

(function() {
  angular.module('konikio.users.reset', [])
    .controller('ResetCtrl', function ($scope, $modalInstance, AuthService) {

      $scope.error = {};

      var clear = function() {
        $scope.error.message = '';
      };

      $scope.credentials = {
        email: ''
      };

      $scope.reset = function (credentials) {
        clear();
        AuthService.reset(credentials.email)
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
