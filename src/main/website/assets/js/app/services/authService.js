angular.module('app.user', ['restangular', 'ngCookies']).factory('UserService', function ($http, Restangular, Session, $q, $cookieStore) {
    var userService = {};

    function getToken(authData) {
        var tokenRest = Restangular.one('login');

        return tokenRest.customPOST(authData, null, null, { 'Content-Type': 'application/json' }); //promise


        //var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

        //var deferred = $q.defer();

        //$http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

        //    localStorageService.set('authorizationData', { token: response.access_token, userName: loginData.userName });

        //    _authentication.isAuth = true;
        //    _authentication.userName = loginData.userName;

        //    deferred.resolve(response);

        //}).error(function (err, status) {
        //    _logOut();
        //    deferred.reject(err);
        //});

        //return deferred.promise;

    };
    
    userService.login = function (credentials) {
        //"id":0,"email":"email","firstName":"first name","lastName":"last name","company":"Company Name"
        var authData = {
            email: credentials.email,
            password: credentials.password
        };
        //var token = "gfgfg345HGgi4FT34";
        //Session.create(token, credentials.email, 'guest');
        //var deferred = $q.defer();
        //deferred.resolve(token);
        //return deferred.promise;
        var deferred = $q.defer();

        getToken(authData).then(function (tokenResult) {

            var tokens = tokenResult.Data;
            var token = tokenResult;
            Session.create(token, credentials.email, 'guest');
            deferred.resolve(token);
           

        }, function (err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
        //return Restangular.one('login').customPOST(credentials, null, null, { 'Content-Type': 'application/json' });

    };

    userService.register = function (credentials) {
        //"id":0,"email":"email","firstName":"first name","lastName":"last name","company":"Company Name"
        var authData = {
            
            firstName: credentials.firstName,
            lastName: credentials.lastName,
            email: credentials.email,
            password: credentials.password,
            company: credentials.company
        };

        //author.customPOST({body: "Ari's Bio"}, // post body
        //"biography",  // route
        //{},           // custom params
        //{});         // custom headers

        return Restangular.one('register').customPOST(credentials, null, null, { 'Content-Type': 'application/json' });

    };

    userService.reset = function (email) {
        //"id":0,"email":"email","firstName":"first name","lastName":"last name","company":"Company Name"

        return Restangular.one('resetPassword').customPOST(email, null, null, { 'Content-Type': 'plain/text' });

    };


    userService.changePass = function (email, token, password) {

        var sObject = {
            "user": { "email": email, "password": password },
            "token": token
        };

        return Restangular.one('changePassword').customPOST(sObject, null, null, { 'Content-Type': 'application/json' });

    };

    userService.getSession = function () {
        return Session;
    };

    userService.isAuthenticated = function () {
        return !!Session.userName;
    };

    userService.createSession = function (token, email) {
        Session.create(token, email, 'guest');
    }

    userService.fillAuthData = function(){
        var user = $cookieStore.get('kionikAuth');
        if (user)
            Session.create(user.token, user.email, 'guest');

    }

    return userService;
})

.service('Session', function ($cookieStore) {
    this.create = function (sessionId, userName, userRole) {
        this.id = sessionId;
        this.userName = userName;
        this.userRole = userRole;

        var d = new Date();
        //2 hours from now
        var dUtc = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours() + 2, d.getUTCMinutes(), d.getUTCSeconds());

        this.expiresIn = dUtc;

        $cookieStore.put('kionikAuth', {token:sessionId, email: userName});
    };
    this.destroy = function () {
        this.id = null;
        this.userName = null;
        this.userRole = null;
        this.expiresIn = null;

        $cookieStore.remove('kionikAuth');
    };
    return this;
});