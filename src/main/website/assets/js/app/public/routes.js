angular.module('app.public', ['ui.router', 'app.user', 'ui.bootstrap', 'ngRoute'])
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

    //$urlRouterProvider.otherwise('/');
    $stateProvider.state('val', {
        url: "/",
        templateUrl: "/js/app/validation/validation.html",
        controller: "valdCtrl"
    })
    .state('resetPass', {
        url: "/reset",
        templateUrl: "/js/app/templates/resetPage.html",
        controller: "resetPassCtrl"
    })
}])