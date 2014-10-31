angular.module('app')
    .controller('rootCtrl', function ($scope, UserService, $state) {

        $scope.currentUser = null;
        $scope.currentSession = null;


        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;

        };

        $scope.setCurrentSession = function (session) {
            $scope.currentSession = session;

        };

        $scope.LogOut = function () {
            var curSession = UserService.getSession();
            curSession.destroy();
            $scope.currentUser = null;
            $scope.currentSession = null;

            $state.transitionTo("home", { needAuth: false }, { reload: true, notify: true });
        }
    })