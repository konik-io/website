angular.module('app.public')
.controller('resetPassCtrl', function ($scope, UserService, $state, $location) {
    $scope.form = {};
    $scope.error = { message: '' };
    $scope.notificatio = '';
    $scope.resetPass = function () {
        var password = $scope.form.password;

        var s = $location.search();
        var email = s.email;
        var token = s.token;
        if (email != undefined && email != "" && token != undefined && token != "") {


            UserService.changePass(email, token, password).then(function (resp) {
                $scope.error.message = '';
                $scope.notification = "Password has been reset successfully. You can go to validation page now";

                var user = { 'userName': email, 'token': resp };
                $scope.$parent.setCurrentUser(user);
                var s = UserService.getSession();
                $scope.$parent.currentSession = s;

                $state.transitionTo("val", { needAuth: false }, { reload: true, notify: true });

            }, function (failedReason) {
                var status = parseInt(failedReason.status);
                if (status != 200 && status != 201)
                    $scope.error.message = failedReason.data[0].defaultMessage;
            });
        }
        else $state.go('val')
    }
});