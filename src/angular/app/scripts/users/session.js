'use strict';

(function() {
  angular.module('konikio.users.session', [])
    .service('Session', function (ipCookie) {
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
    });
})();
