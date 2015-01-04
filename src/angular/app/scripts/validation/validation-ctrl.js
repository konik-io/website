'use strict';

(function(){
  angular.module('konikio.validation.controller',[])
    .controller('ValidationCtrl', function ($scope, $modal) {
      $scope.openLogin = function() {
        var modalLoginInstance = $modal.open({
          templateUrl: 'partials/users/login.html',
          controller: 'LoginCtrl'
        });

        modalLoginInstance.result.then(function () {
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
    });
})();


