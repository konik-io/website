'use strict';

(function(){
  angular.module('konikio.validation.controller',[])
    .controller('ValidationCtrl', function ($scope, $modal, AuthService) {
      var updateSession = function() {
        $scope.isAuthenticated  = AuthService.isAuthenticated();
        $scope.currentSession = AuthService.getCurrentSession();
      };

      $scope.openLogin = function() {
        var modalLoginInstance = $modal.open({
          templateUrl: 'partials/users/login.html',
          controller: 'LoginCtrl'
        });

        modalLoginInstance.result.then(function () {
          updateSession();
        }, function () {
        });
      };

      $scope.openRegister = function() {
        var modalRegisterInstance = $modal.open({
          templateUrl: 'partials/users/register.html',
          controller: 'RegisterCtrl'
        });

        modalRegisterInstance.result.then(function () {
        }, function () {
        });
      };

      // Initialize scope
      updateSession();
    });
})();


