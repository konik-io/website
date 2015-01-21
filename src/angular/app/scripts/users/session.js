'use strict';

(function() {
  angular.module('konikio.users.session', [])
    .service('Session', function () {
      this.create = function (sessionId, userId) {
        this.id = sessionId;
        this.userId = userId;
        var d = new Date();
        //2 hours from now
        var dUtc = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours() + 2, d.getUTCMinutes(), d.getUTCSeconds());

        this.expiresIn = dUtc;
      };
      this.destroy = function () {
        this.id = undefined;
        this.userId = undefined;
        this.expiresIn = undefined;
      };
      return this;
    });
})();
