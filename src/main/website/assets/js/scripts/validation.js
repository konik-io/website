'use strict';

/**
 * @ngdoc overview
 * @name konik.io.app
 *
 * @description
 * Application for konik.io site
 */
(function() {
  angular.module('konikio', [
    'ipCookie',
    'restangular',
    'ui.bootstrap',
    'konikio.users',
    'konikio.validation'
  ])
    .config(["RestangularProvider", function (RestangularProvider) {
      RestangularProvider.setBaseUrl('http://te1.onlinevalidation.konik.io');
    }])
    .config(["$httpProvider", function ($httpProvider) {
      $httpProvider.interceptors.push([
        '$injector',
        function ($injector) {
          return $injector.get('AuthInterceptor');
        }
      ]);
    }])
    .run(['AuthService', function (AuthService) {
      AuthService.restoreSession(); // if user is loggedIn, get from the cookie
    }]);
})();

'use strict';

/**
 * @ngdoc overview
 * @name konikio.validation
 *
 * @description
 * Module that provide validation functionality
 */
angular.module('konikio.validation', [
  'konikio.validation.controller'
]);


'use strict';

(function(){
  angular.module('konikio.validation.controller',[])
    .controller('ValidationCtrl', ["$scope", "$modal", "AuthService", function ($scope, $modal, AuthService) {
      var updateSession = function() {
        $scope.isAuthenticated  = AuthService.isAuthenticated();
      };

      var modalInstance;
      var dismissModal = function(){
        if (angular.isObject(modalInstance)){
          modalInstance.dismiss('close');
        }
      };

      $scope.openLogin = function() {
        dismissModal();
        modalInstance = $modal.open({
          templateUrl: 'partials/users/login.html',
          controller: 'LoginCtrl',
          scope: $scope
        });

        modalInstance.result.then(function () {
          updateSession();
        });
      };

      $scope.openRegister = function() {
        dismissModal();
        modalInstance = $modal.open({
          templateUrl: 'partials/users/register.html',
          controller: 'RegisterCtrl',
          scope: $scope
        });
      };

      $scope.openReset = function() {
        dismissModal();
        modalInstance = $modal.open({
          templateUrl: 'partials/users/reset.html',
          controller: 'ResetCtrl',
          scope: $scope
        });
      };

      $scope.logout = function () {
        AuthService.logout();
        updateSession();
      };


      // Initialize scope
      updateSession();
    }]);
})();



'use strict';

/**
 * @ngdoc overview
 * @name konikio.users
 *
 * @description
 * Module that provide user authentication and authorisation
 */
angular.module('konikio.users', [
  'konikio.users.login',
  'konikio.users.register',
  'konikio.users.reset',
  'konikio.users.auth-interceptor',
  'konikio.users.auth-service',
  'konikio.users.session'
]);

'use strict';

(function() {
  angular.module('konikio.users.register', [])
    .controller('RegisterCtrl', ["$scope", "$modalInstance", "AuthService", function ($scope, $modalInstance, AuthService) {

      var clear = function() {
        $scope.error = '';
      };

      $scope.registerUser = {
        firstName: '',
        lastName: '',
        company: '',
        email: '',
        password: ''
      };

      $scope.register = function (registerUser) {
        clear();
        AuthService.register(registerUser)
          .then(function(){
          $modalInstance.close();
        }, function(errorMessage){
            $scope.error = errorMessage;
          });
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  }]);
}());

'use strict';

(function() {
  angular.module('konikio.users.login', [])
    .controller('LoginCtrl', ["$scope", "$modalInstance", "AuthService", function ($scope, $modalInstance, AuthService) {

      var clear = function() {
        $scope.error = '';
      };

      $scope.credentials = {
        email: '',
        password: ''
      };

      $scope.login = function (credentials) {
        clear();
        AuthService.login(credentials)
          .then(function(){
            $modalInstance.close();
          }, function(errorMessage){
            $scope.error = errorMessage;
          });
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  }]);
}());

'use strict';

(function() {
  angular.module('konikio.users.reset', [])
    .controller('ResetCtrl', ["$scope", "$modalInstance", "AuthService", function ($scope, $modalInstance, AuthService) {

      var clear = function() {
        $scope.error = '';
      };

      $scope.credentials = {
        email: ''
      };

      $scope.reset = function (credentials) {
        clear();
        AuthService.reset(credentials.email)
          .then(function(){
            $modalInstance.close();
          }, function(errorMessage){
            $scope.error = errorMessage;
          });
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
  }]);
}());

'use strict';

(function() {
  angular.module('konikio.users.auth-interceptor', [])
    .factory('AuthInterceptor', ["$q", "Session", function ($q, Session) {
      var authInterceptorServiceFactory = {};

      var _request = function (config) {

        config.headers = config.headers || {};

        if (angular.isDefined(Session.id)) {
          //include token into each request header
          config.headers.Authorization = Session.id;
        }
        return config;
      };

      var _responseError = function (rejection) {
        return $q.reject(rejection);
      };

      authInterceptorServiceFactory.request = _request;
      authInterceptorServiceFactory.responseError = _responseError;

      return authInterceptorServiceFactory;
    }]);
})();

'use strict';

(function(){
  angular.module('konikio.users.auth-service', [])
    .factory('AuthService', ["$http", "$q", "Restangular", "Session", function ($http, $q, Restangular, Session) {
      var AuthService = {};

      AuthService.register = function (registerUser){
        var request = $q.defer();

        Restangular.one('register').customPOST(registerUser, null, null, { 'Content-Type': 'application/json' })
          .then(function () {
            request.resolve();
          })
          .catch(function(response){
            if (angular.isObject(response) && angular.isDefined(response.error)) {
              request.reject(response.error);
            } else if (angular.isArray(response)) {
              var errors = '';
              angular.forEach(response, function(error) {
                errors += errors ? ', ' : '';
                errors += error.field + ': ' + error.defaultMessage;
              });
              request.reject(errors);
            } else {
              request.reject('Error during registration!');
            }
          });

        return request.promise;
      };

      AuthService.login = function (credentials) {
        var request = $q.defer();

        Restangular.one('login').customPOST(credentials, null, null, { 'Content-Type': 'application/json' })
          .then(function(response){
            Session.create(response.token, credentials.email);
            request.resolve();
          })
          .catch(function(response){
            if (angular.isObject(response)) {
              request.reject(response.error + ' ' + response.message);
            } else {
              request.reject('Error during logging in!');
            }
          });

        return request.promise;
      };

      AuthService.reset = function (email) {
        var request = $q.defer();

        Restangular.one('resetPassword').customPOST(email, null, null, { 'Content-Type': 'application/json' })
          .then(function(){
            request.resolve();
          })
          .catch(function(response){
            if (angular.isObject(response)) {
              request.reject(response.error + ' ' + response.message);
            } else {
              request.reject('Error during resetting password!');
            }
          });

        return request.promise;
      };

      AuthService.logout = function () {
        Session.destroy();
      };

      AuthService.restoreSession = function() {
        Session.createFromStore();
      };

      AuthService.isAuthenticated = function () {
        return !!Session.userId;
      };

      return AuthService;
    }]);
})();

'use strict';

(function() {
  angular.module('konikio.users.session', [])
    .service('Session', ["ipCookie", function (ipCookie) {
      var sessionCookieName = 'kionikAuth';

      this.create = function (sessionId, userId) {
        this.id = sessionId;
        this.userId = userId;

        ipCookie(sessionCookieName, {token:sessionId, email: userId}, {expires: 2, expirationUnit: 'hours'});
      };

      this.createFromStore = function () {
        var user = ipCookie(sessionCookieName);
        if (angular.isObject(user)) {
          this.create(user.token, user.email);
        }
      };

      this.destroy = function () {
        this.id = undefined;
        this.userId = undefined;
        this.expiresIn = undefined;
        ipCookie.remove(sessionCookieName);
      };
      return this;
    }]);
})();

(function(module) {
try {
  module = angular.module('konikio');
} catch (e) {
  module = angular.module('konikio', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/validation.html',
    '<div class="container"><div class="row well"><div class="col-lg-6 col-md-6"><h4>Validity test for ZUGFeRD compliant invoices</h4><p>This online service validates ZUGFeRD compliant PDF or XML files using the Konik library.</p><p>If you would like to see a detailed validation report with a semantic validation <a href="http://www.google.com/recaptcha/mailhide/d?k=01q8vnbfNmxk0T5DM_GteAAg==&amp;c=zwuGbJbE2eqJvqdTIykGHA==" onclick="window.open(\'http://www.google.com/recaptcha/mailhide/d?k\\07501q8vnbfNmxk0T5DM_GteAAg\\75\\75\\46c\\75zwuGbJbE2eqJvqdTIykGHA\\75\\075\', \'\', \'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=500,height=300\'); return false;" title="Reveal the Email address">contact</a> us for more details.</p><p>Version details</p><dl class="dl-horizontal"><dt>Konik</dt><dd>Version 0.7.1</dd><dt>Validation Service</dt><dd>Version 0.4.1</dd></dl></div><div class="col-lg-6 col-md-6" ng-controller="ValidationCtrl"><form ng-if="isAuthenticated" id="validate_form" method="post" enctype="multipart/form-data" onsubmit=""><div class="form-group"><label for="upload_file">PDF or XML</label> <input type="file" name="file" id="upload_file"><p id="upload_file_help_block" class="help-block">Create validation report</p></div><button id="validation-button" type="submit" class="btn btn-primary btn-large">Submit</button> <button id="logout-button" ng-click="logout()" class="btn btn-default btn-large">Logout</button></form><button ng-if="!isAuthenticated" id="login-button" class="btn btn-primary" ng-click="openLogin()">Login</button> <button ng-if="!isAuthenticated" id="register-button" class="btn btn-primary" ng-click="openRegister()">Register</button></div></div><div id="server_result" class="row"></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('konikio');
} catch (e) {
  module = angular.module('konikio', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/users/login.html',
    '<div class="modal-header"><h2 class="modal-title">Login</h2></div><div class="modal-body"><form name="loginForm" class="form-horizontal" ng-submit="login(credentials)" role="form"><div class="row" ng-show="error"><div class="col-sm-12 col-md-12">{{error}}</div></div><div class="row"><div class="input-group col-sm-12 col-md-12"><span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span> <input id="login-username" type="email" class="form-control" tabindex="1" ng-model="credentials.email" name="email" placeholder="Email address" required=""></div></div><div class="row"><div class="input-group col-sm-12 col-md-12"><span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span> <input id="login-password" type="password" class="form-control" tabindex="2" ng-model="credentials.password" name="password" placeholder="Enter password" required="" min="8"></div></div><div class="row"><div class="col-sm-12 col-md-12"><button type="submit" class="btn btn-primary btn-block btn-lg" tabindex="3" ng-disabled="loginForm.$invalid">Login</button></div></div></form></div><div class="modal-footer"><div class="form-group"><div class="col-md-12 control">Forgot password? <a ng-click="$parent.openReset()">Get new one</a></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('konikio');
} catch (e) {
  module = angular.module('konikio', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/users/register.html',
    '<div class="modal-header"><h2 class="modal-title">Register</h2></div><div class="modal-body"><form name="registerForm" role="form" ng-submit="register(registerUser)"><div class="row" ng-show="error"><div class="col-sm-12 col-md-12">{{error}}</div></div><div class="row"><div class="col-xs-12 col-sm-6 col-md-6"><div class="form-group"><input type="text" name="firstName" ng-model="registerUser.firstName" id="firstName" class="form-control" required="" placeholder="First Name" tabindex="1"></div></div><div class="col-xs-12 col-sm-6 col-md-6"><div class="form-group"><input type="text" name="lastName" ng-model="registerUser.lastName" id="lastName" class="form-control" required="" placeholder="Last Name" tabindex="2"></div></div></div><div class="row"><div class="col-xs-12 col-md-12"><input type="email" name="email" id="email" ng-model="registerUser.email" class="form-control" required="" placeholder="Email address" tabindex="3"></div></div><div class="row"><div class="col-xs-12 col-md-12"><input type="password" name="password" id="password" ng-model="registerUser.password" class="form-control" required="" min="8" placeholder="Enter password" tabindex="4"></div></div><div class="row"><div class="col-xs-12 col-md-12"><input type="text" name="companyName" ng-model="registerUser.company" id="companyName" class="form-control" placeholder="Company Name" tabindex="5"></div></div><div class="row"><div class="col-xs-12 col-md-12"><button type="submit" class="btn btn-primary btn-block btn-lg" tabindex="6" ng-disabled="registerForm.$invalid">Register</button></div></div></form></div><div class="modal-footer"><div class="form-group"><div class="col-md-12 control">If you already have account please <a ng-click="$parent.openLogin()">Log in</a></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('konikio');
} catch (e) {
  module = angular.module('konikio', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('partials/users/reset.html',
    '<div class="modal-header"><h2 class="modal-title">Reset password</h2></div><div class="modal-body"><form name="resetForm" class="form-horizontal" ng-submit="reset(credentials)" role="form"><div class="row" ng-show="error"><div class="col-sm-12 col-md-12">{{error}}</div></div><div class="row"><div class="input-group col-sm-12 col-md-12"><span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span> <input id="login-username" type="email" class="form-control" tabindex="1" ng-model="credentials.email" name="email" placeholder="Email address" required=""></div></div><div class="row"><div class="col-sm-12 col-md-12"><button type="submit" class="btn btn-primary btn-block btn-lg" tabindex="2" ng-disabled="resetForm.$invalid">Reset</button></div></div></form></div><div class="modal-footer"><div class="form-group"><div class="col-md-12 control">Have account already? <a ng-click="$parent.openLogin()">Log in</a></div></div></div>');
}]);
})();
