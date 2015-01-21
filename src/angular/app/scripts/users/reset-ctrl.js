'use strict';

(function() {
  angular.module('konikio.users.reset', [])
    .controller('ResetCtrl', function ($scope, $modalInstance, AuthService) {

      var clear = function() {
        $scope.error = '';
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
            $scope.error = errorMessage;
          });
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  });
}());
