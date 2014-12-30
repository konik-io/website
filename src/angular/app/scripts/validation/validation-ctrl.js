'use strict';

(function(){
  angular.module('konikio.validation.controller',[])
    .controller('ValidationCtrl', function ($scope, $modal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.open = function (size) {

      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'RegisterCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function () {
      }, function () {
      });
    };
  });
})();


