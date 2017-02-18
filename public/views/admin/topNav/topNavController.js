(function() {
	'use strict';
	angular.module('adminApp').controller('topNavController', topNavController);

    function topNavController($auth, $state, $http, $rootScope, $scope) {
      var vm = this;
      vm.logout = function() {
          $auth.logout().then(function() {
              // Remove the authenticated user from local storage
              localStorage.removeItem('user');
              // Flip authenticated to false so that we no longer
              // show UI elements dependant on the user being logged in
              $rootScope.authenticated = false;
              // Remove the current user info from rootscope
              $rootScope.currentUser = null;
              $state.go('login'); 
          });
      }
    }

})();
