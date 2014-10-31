angular.module('app.public')
.controller('resetCtrl', function ($scope, UserService, $state) {
    $scope.form = {};

    $scope.reset = function (email) {
        UserService.reset(email).then(function (resp) {
            var d = resp;

        }, function (failedReason) {
            alert(failedReason.message);
        });
    }
});