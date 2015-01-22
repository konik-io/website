'use strict';

(function(){
  angular.module('konikio.validation.controller',[])
    .controller('ValidationCtrl', function ($scope, $modal, AuthService) {
      var updateSession = function() {
        $scope.isAuthenticated  = AuthService.isAuthenticated();
      };

      var modalInstance;
      var dismissModal = function(){
        if (angular.isObject(modalInstance)){
          modalInstance.dismiss('close');
        }
      };

      $scope.openLogin = function() {
        dismissModal();
        modalInstance = $modal.open({
          templateUrl: 'partials/users/login.html',
          controller: 'LoginCtrl',
          scope: $scope
        });

        modalInstance.result.then(function () {
          updateSession();
        });
      };

      $scope.openRegister = function() {
        dismissModal();
        modalInstance = $modal.open({
          templateUrl: 'partials/users/register.html',
          controller: 'RegisterCtrl',
          scope: $scope
        });
      };

      $scope.openReset = function() {
        dismissModal();
        modalInstance = $modal.open({
          templateUrl: 'partials/users/reset.html',
          controller: 'ResetCtrl',
          scope: $scope
        });
      };

      $scope.logout = function () {
        AuthService.logout();
        updateSession();
      };

      $scope.validate = function (fileToValidate) {
        console.log(fileToValidate);
      };

      // Initialize scope
      updateSession();
    });
})();


