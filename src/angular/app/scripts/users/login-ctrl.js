'use strict';

(function() {
  angular.module('konikio.users.login', [])
    .controller('LoginCtrl', function ($scope, $modalInstance) {

    $scope.login = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
}());
