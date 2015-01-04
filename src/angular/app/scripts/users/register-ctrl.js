'use strict';

(function() {
  angular.module('konikio.users.register', [])
    .controller('RegisterCtrl', function ($scope, $modalInstance) {

    $scope.register = function () {
      $modalInstance.close();
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
}());
