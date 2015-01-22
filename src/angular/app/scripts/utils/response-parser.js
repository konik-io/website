'use strict';

(function(){
  angular.module('konikio.utils.response-parser',[])
    .factory('ResponseParser', function () {
      var ResponseParser = {};

      ResponseParser.getErrorMessageFromResponse = function(response, defaultMessage) {
        var errorMessage = '';

        if (angular.isObject(response) && angular.isDefined(response.error)) {
          errorMessage = response.error;

          if (angular.isDefined(response.message)) {
            errorMessage += ' ' + response.message;
          }
        } else if (angular.isArray(response)) {
          angular.forEach(response, function (error) {
            errorMessage += errorMessage ? ', ' : '';

            if (angular.isDefined(error.field)) {
              errorMessage += error.field + ': ' + error.defaultMessage;
            } else {
              errorMessage += error.defaultMessage;
            }
          });
        } else {
          errorMessage = defaultMessage;
        }

        return errorMessage;
      };

      return ResponseParser;
    });
})();
