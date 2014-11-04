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

    $scope.userLoggedInName = '';

    function loginFunc() {
        var modalInstance = $modal.open({
            templateUrl: '/js/app/templates/loginModal.html',
            controller: 'ModalInstanceCtrl',
            //size: size,
            resolve: {
                items: function () {
                    return $scope.userLoggedInName;
                }
            }
        });



        modalInstance.result.then(function (user) {


            $scope.$parent.setCurrentUser(user);
            var s = UserService.getSession();
            $scope.$parent.currentSession = s;

            $state.transitionTo("val", { needAuth: false }, { reload: true, notify: true });

        })
    }

   

    $scope.showRegModal = function () {

        var modalInstance = $modal.open({
            templateUrl: '/js/app/templates/regModal.html',
            controller: 'ModalInstanceCtrl'
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        });

        modalInstance.result.then(function (result) {
            $scope.userLoggedInName = result.email;
            $scope.notification = "Thank you for registration. We sent confirmation to your email"
            //loginFunc();

        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.showLoginModal = loginFunc;

    $scope.showResetModal = function () {

        var modalInstance = $modal.open({
            templateUrl: '/js/app/templates/resetModal.html',
            controller: 'ModalInstanceCtrl'
            //size: size,
            //resolve: {
            //    items: function () {
            //        return $scope.items;
            //    }
            //}
        });


        modalInstance.result.then(function (res) {
            $scope.notification = "The confirmation has been sent to your email!";
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    }


}).controller('ModalInstanceCtrl', function ($scope, UserService, $state, $modalInstance, $modal) {
    

    $scope.register = function () {
        var formData = $scope.form;
        $scope.errorMessage = '';
        UserService.register(formData).then(function (resp) {
            //var d = resp;
            $modalInstance.close(formData);


        }, function (failedReason) {
            var status = parseInt(failedReason.status);
            if (status != 200 && status != 201)
               
                $scope.errorMessages = failedReason.data;

            
        });
    }


    $scope.error = {message: ''};


    $scope.login = function () {
        var formData = $scope.form;
       
        UserService.login(formData).then(function (resp) {
            //var d = resp;
            var user = { 'userName': formData.email, 'token': resp };
            $modalInstance.close(user);

        }, function (failedReason) {

            var status = parseInt(failedReason.status);
            if (status != 200 && status != 201)
                if (status == 401)
                $scope.error.message = "Incorrect login or password."//failedReason.data;
            
        });

        
    }

    $scope.reset = function () {
        var email = $scope.form.email;
        UserService.reset(email).then(function (resp) {
            $modalInstance.close('success');
            //$state.go('val');

        }, function (failedReason) {
            $scope.error = failedReason.data;
        });
    }

    $scope.showResetModal = function () {
        $modalInstance.dismiss('cancel');
        var modalInstance = $modal.open({
            templateUrl: '/js/app/templates/resetModal.html',
            controller: 'ModalInstanceCtrl'

        });

        modalInstance.result.then(function (res) {
            $scope.notification = "The confirmation has been sent to your email!";
        }, function () {
            //$log.info('Modal dismissed at: ' + new Date());
        });
    }


    $scope.showLoginModal = function () {

        var modalInstance = $modal.open({
            templateUrl: '/js/app/templates/loginModal.html',
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