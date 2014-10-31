angular.module('app.public')
.controller('loginCtrl', function ($scope, UserService, $state) {
    $scope.form = {};

    $scope.login = function (formData) {
        UserService.login(formData).then(function (resp) {
            var d = resp;

        }, function (failedReason) {
            alert(failedReason.statusText);
        });
    }


});