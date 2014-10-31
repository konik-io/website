angular.module('app.public')
.config(['$stateProvider', function ($stateProvider) {
    //ignore url case sensativity
    //$urlRouterProvider.rule(function ($injector, $location) {
    //    //what this function returns will be set as the $location.url
    //    var path = $location.path(), normalized = path.toLowerCase();
    //    if (path != normalized) {
    //        //instead of returning a new url string, I'll just change the $location.path directly so I don't have to worry about constructing a new url string and so a new state change is not triggered
    //        $location.replace().path(normalized);
    //    }
    //    // because we've returned nothing, no state change occurs
    //});

    //$stateProvider.state('val', {
    //    url: "/validation",
    //    templateUrl: "/app/validation/validation.html",
    //    controller: "valdCtrl"
    //})
}])
.controller('valdCtrl', function ($scope, $modal, $state, UserService) {

    $scope.showRegModal = function () {

        var modalInstance = $modal.open({
            templateUrl: '/app/templates/regModal.html',
            controller: 'ModalInstanceCtrl'
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        });

        //modalInstance.result.then(function (formData) {
            

        //}, function () {
        //    $log.info('Modal dismissed at: ' + new Date());
        //});
    };

    $scope.showLoginModal = function () {

        var modalInstance = $modal.open({
            templateUrl: '/app/templates/loginModal.html',
            controller: 'ModalInstanceCtrl'
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        });

       

        modalInstance.result.then(function (formData) {
            
            UserService.login(formData).then(function (resp) {
                var user = { 'userName': formData.email, 'token': resp };
                $scope.$parent.setCurrentUser(user);
                var s = UserService.getSession();
                $scope.$parent.currentSession = s;
                
                $state.transitionTo("val", { needAuth: false }, { reload: true, notify: true });

            }, function (failedReason) {
                alert(failedReason.statusText);
            });
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.showResetModal = function () {
     
        var modalInstance = $modal.open({
            templateUrl: '/app/templates/resetModal.html',
            controller: 'ModalInstanceCtrl'
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        });


        //modalInstance.result.then(function (selectedItem) {
        //    $scope.selected = selectedItem;
        //}, function () {
        //    $log.info('Modal dismissed at: ' + new Date());
        //});
    }


}).controller('ModalInstanceCtrl', function ($scope, UserService, $state, $modalInstance, $modal) {
    $scope.register = function () {
       var formData = $scope.form;
        UserService.register(formData).then(function (resp) {
            var d = resp;
            $modalInstance.dismiss('success');


            $scope.notification = 'Thank you. Please log in to submit!';

            //$state.go('home');
        }, function (failedReason) {
            alert(failedReason.statusText);
        });
    }
    $scope.login = function () {
        var formData = $scope.form;
        $modalInstance.close(formData);
    }

    $scope.reset = function () {
        var email = $scope.form.email;
        UserService.reset(email).then(function (resp) {
            $modalInstance.dismiss('success');
            $state.go('home');

        }, function (failedReason) {
            alert(failedReason.statusText);
        });
    }

    $scope.showResetModal = function () {
        $modalInstance.dismiss('cancel');
        var modalInstance = $modal.open({
            templateUrl: '/app/templates/resetModal.html',
            controller: 'ModalInstanceCtrl'

        });
    }


    $scope.showLoginModal = function () {

        var modalInstance = $modal.open({
            templateUrl: '/app/templates/loginModal.html',
            controller: 'ModalInstanceCtrl'
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        });



        modalInstance.result.then(function (formData) {

            UserService.login(formData).then(function (resp) {
                var user = { 'userName': formData.email, 'token': resp };
                $scope.$parent.setCurrentUser(user);
                var s = UserService.getSession();
                $scope.$parent.currentSession = s;

                $state.transitionTo("val", { needAuth: false }, { reload: true, notify: true });

            }, function (failedReason) {
                alert(failedReason.statusText);
            });
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };
});