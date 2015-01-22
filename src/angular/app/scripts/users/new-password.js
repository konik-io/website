'use strict';

(function() {
  angular.module('konikio.users.new-password', [])
    .controller('NewPasswordCtrl', function ($scope, $location, AuthService) {

      $scope.error = {};

      var clear = function() {
        $scope.error.message = '';
      };

      $scope.credentials = {
        password: ''
      };

      $scope.newPassword = function (credentials) {
        clear();

        var s = $location.search();
        var email = s.email;
        var token = s.token;

        if (angular.isDefined(email) && email !== '' && angular.isDefined(token) && token !== '') {
          AuthService.newPassword(email, token, credentials.password)
            .then(function(){
              $location.$$search = {};
              $location.path('/');
            }, function(errorMessage){
              $scope.error.message = errorMessage;
            });
        } else {
          $scope.error.message = 'Missing authentication parameters';
        }

      };
  });
}());
