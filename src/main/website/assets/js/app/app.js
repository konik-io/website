
var app_dependencies = [
'restangular'
, 'ngRoute'
, 'ngCookies'
//, 'ui.select2'

//, 'app.custom-ui'
//, 'app.login'
//, 'app.signup'
//, 'app.account'
//, 'app.auth'
, 'app.public'
];



var app = angular.module('app', app_dependencies)



.config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('http://te1.onlinevalidation.konik.io');
})
.config(function ($httpProvider) {
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
          return $injector.get('AuthInterceptor');
      }
    ]);
})

.factory('AuthInterceptor', function ($rootScope, $q, $location) {
    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};
        var session = $rootScope.currentSession;

        if (session != null && session != undefined) {
            //include token into each request header
            config.headers.Authorization = session.id;
        }
        return config;
    }

    var _responseError = function (rejection) {
        //if (rejection.status === 401) {
        //    $location.path('/');
        //}
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
})

.run(function($rootScope, $location, $anchorScroll) {
    //when the route is changed scroll to the proper element.
    $rootScope.$on('$stateChangeSuccess', function (event, next, toParams, prev) {
        //function goTo(id) {
        //    $location.hash(id);
        //    $anchorScroll();
        //}


        //var h = $location.hash()
        //if (h != "") {
        //    $location.hash("");
        //    goTo(h);
        //}
    });
})

.run(['UserService', function (UserService) {
    UserService.fillAuthData(); // if user is loggedIn, get from the cache
}])



//app.controller('rootCtrl', function ($scope, $location, $anchorScroll) {

//    //function goTo(id) {
//    //    $location.hash(id);
//    //    $anchorScroll();
//    //}

//    //$scope.scrollTo = function (id) {
//    //    $location.hash(id);
//    //    $anchorScroll();
//    //}

//    //var h = $location.hash()
//    //if (h != "") {
//    //    goTo(h);
//    //}

//});