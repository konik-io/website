'use strict';
/*global FormData */

(function(){
  angular.module('konikio.validation.validation-service', [])
    .factory('ValidationService', function ($http, $q, RestangularData, ResponseParser) {
      var ValidationService = {};

      ValidationService.validate = function (fileToValidate){
        var request = $q.defer();

        var formData = new FormData();
        formData.append('file', fileToValidate);

        //$http.post('http://te1.onlinevalidation.konik.io/validate', formData, {
          //transformRequest: angular.identity,
        //  headers: {'Content-Type': undefined}
        //})
        RestangularData.one('validate').customPOST(formData, null, null, { 'Content-Type': undefined })
          .then(function () {
            request.resolve();
          })
          .catch(function(response){
            var errorMessage = ResponseParser.getErrorMessageFromResponse(response, 'Validation failed');
            request.reject(errorMessage);
          });

        return request.promise;
      };

      return ValidationService;
    })
    .factory('RestangularData', function(Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setDefaultHttpFields({transformRequest: angular.identity});
      });
    });
})();
