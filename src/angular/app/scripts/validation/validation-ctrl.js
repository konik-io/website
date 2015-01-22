'use strict';

(function(){
  angular.module('konikio.validation.controller',[])
    .controller('ValidationCtrl', function ($scope, $modal, AuthService, ValidationService) {
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

      $scope.error = {};

      var clear = function() {
        $scope.error.message = '';
        $scope.validationResponse = undefined;
      };

      $scope.validate = function (fileToValidate) {
        clear();
        if (angular.isObject(fileToValidate)) {
          ValidationService.validate(fileToValidate)
            .then(function(validationResponse){
              $scope.validationResponse = validationResponse;
            })
            .catch(function(errorMessage){
              $scope.error.message = errorMessage;
            });
        } else {
          $scope.error.message = 'Please provide file to validate.';
        }
      };

      $scope.findAlarmType = function (status) {
        var alarmType;
        switch (status) {
          case 'VALID':
            alarmType = 'alert-success';
            break;
          case 'INVALID':
          case 'ERROR':
            alarmType = 'alert-danger';
            break;
          default:
            alarmType = 'alert-danger';
        }
        return alarmType;
      };

      // Initialize scope
      updateSession();
    });
})();


