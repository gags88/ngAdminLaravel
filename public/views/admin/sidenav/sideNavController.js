(function() {
	'use strict';
	angular.module('adminApp').controller('sideNavController', sideNavController);

    function sideNavController($auth, $state, $http, $rootScope, $scope, $mdSidenav) {
      var vm = this;
      vm.isOpen = isOpen;
      vm.toggleOpen = toggleOpen;
      vm.closeMenu = closeMenu;

      function closeMenu() {
				$mdSidenav('left').close();
			};

      function isOpen(){

      };

      function toggleOpen(){

      };

    }

})();
