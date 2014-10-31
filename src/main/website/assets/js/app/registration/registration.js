

angular.module('app.public')
.controller('regCtrl', function ($scope, UserService, $state) {
    $scope.form = {};

    $scope.register = function () {
        formData=$scope.form;
        UserService.register(formData).then(function (resp) {
            var d = resp;
            $state.go('home');
            }, function(failedReason){
                alert(failedReason.statusText);
            });
    }


});