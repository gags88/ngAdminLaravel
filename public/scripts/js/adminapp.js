(function() {
	'use strict';
	var admin = angular.module('adminApp', ['ui.router', 'satellizer','ngResource','ngMaterial','ngAnimate','ngMessages', 'ngStorage','md.data.table','app.directives']);

  admin.config(['$mdThemingProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', '$authProvider', '$provide', '$locationProvider', function($mdThemingProvider, $httpProvider, $stateProvider, $urlRouterProvider, $authProvider, $provide, $locationProvider) {

			$mdThemingProvider.theme('default')
				.primaryPalette('blue', {
					'default': '700',
					'hue-1': '100',
					'hue-2': '600',
					'hue-3': 'A100'
				})
				// If you specify less than all of the keys, it will inherit from the
				// default shades
				.accentPalette('indigo', {
					'default': '900'
			});

			// Satellizer configuration that specifies which API
			// route the JWT should be retrieved from
			$authProvider.loginUrl = '/api/authenticate';
			// Redirect to the auth state if any other states
			// are requested other than users
			$urlRouterProvider.otherwise('/login');
      $locationProvider.html5Mode(true);
			$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: '../views/admin/login/authView.html',
					controller: 'AuthController as auth',
					title : 'Administration | Login'
				})
				.state('dashboard', {
					url: '/dashboard',
					templateUrl: '../views/admin/dashboard/dashboard.html',
					controller: 'DashboardController as dashboard',
					title : 'Administration | Dashboard'
				})
				.state('users', {
					url: '/users',
					templateUrl: '../views/admin/users/list-users.html',
					controller: 'UserController as user',
					title : 'Administration | Users'
				})
				.state('clientlogins', {
					url: '/clogins',
					templateUrl: '../views/admin/clients/client-users.html',
					controller: 'ClientLoginsController as client',
					title : 'Administration | Client Logins'
				});

				function redirectWhenLoggedOut($q, $injector) {
        return {
            'responseError': function (rejection) {
                var $state = $injector.get('$state');
                var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid','could_not_create_token'];
                angular.forEach(rejectionReasons, function (value, key) {
                    if (rejection.data.error === value || rejection.status === 401) {
                        localStorage.removeItem('user');
                        $state.go('login');
                    }
                });
                return $q.reject(rejection);
            }
        }
    }
    $provide.factory('unauthorisedInterceptor', redirectWhenLoggedOut);
    // Push the new factory onto the $http interceptor array
    $httpProvider.interceptors.push('unauthorisedInterceptor');

		}]);
  //Update Title and State
  admin.run([ '$rootScope', '$state', '$stateParams' , '$http',function ($rootScope, $state, $stateParams, $http) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
      // $stateChangeStart is fired whenever the state changes. We can use some parameters
      // such as toState to hook into details about the state as it is changing
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
					if(toState.name !== "login") {
						$http.get('/api/authenticate').error(function(data){});
					}
          $rootScope.loading = true;
          // Grab the user from local storage and parse it to an object
          var user = JSON.parse(localStorage.getItem('user'));
          // If there is any user data in local storage then the user is quite
          // likely authenticated. If their token is expired, or if they are
          // otherwise not actually authenticated, they will be redirected to
          // the auth state because of the rejected request anyway
          if(user) {
              // The user's authenticated state gets flipped to
              // true so we can now show parts of the UI that rely
              // on the user being logged in
              $rootScope.authenticated = true;
              // Putting the user's data on $rootScope allows
              // us to access it anywhere across the app. Here
              // we are grabbing what is in local storage
              $rootScope.currentUser = user;
              // If the user is logged in and we hit the auth route we don't need
              // to stay there and can send the user to the main state
              if(toState.name === "login") {
                  // Preventing the default behavior allows us to use $state.go
                  // to change states
                  event.preventDefault();
                  // go to the "main" state which in our case is users
                  $state.go('dashboard');
              }
          }
      });
      $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        //console.log("state change -> From state: " + fromState.name + " To state: " + toState.name);
        $rootScope.loading = false;
      });
  }]);

})();

var directivesApp = angular.module('app.directives',[]);

directivesApp.directive("thekodePreloader", function(){
  return{
    restrict : 'AEC',
		replace : true,
    template : '<div flex ng-show="loading" class="loading"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>'
  }
});

(function() {
	'use strict';
	angular.module('adminApp').controller('ClientLoginsController', ClientLoginsController);

  function ClientLoginsController() {

  }

})();

(function() {

	'use strict';

	angular
		.module('adminApp')
		.controller('DashboardController', DashboardController);
	function DashboardController($http) {
		var vm = this;
		vm.users;
		vm.error;
		vm.getUsers = function() {
			// This request will hit the index method in the AuthenticateController
			// on the Laravel side and will return the list of users
			$http.get('/api/authenticate').success(function(response) {
					vm.users = response.users;
			}).error(function(error) {
					vm.error = error;
					function sendback(){
					  window.location = 'login';
					}
					setTimeout(sendback, 1000);
			});
		}
	}

})();

(function() {

	'use strict';

	angular
		.module('adminApp')
		.controller('AuthController', AuthController);


	function AuthController($auth, $state, $scope, $http, $rootScope) {
		var vm = this;
		$scope.loginError=false;
    $scope.loginErrorText='';
		vm.login = function() {
			var credentials = {
				email: vm.email,
				password: vm.password
			}
			// Use Satellizer's $auth service to login
			$auth.login(credentials).then(function(data) {
				// If login is successful, get User Information
				return $http.get('/api/authenticate');
			}, function(error) {
				$scope.loginError = true;
				error.data.error ? $scope.loginErrorText = error.data.error : $scope.loginErrorText = 'Invalid Credentials';
			}).then(function(response) {
					if(typeof response != "undefined"){
						var user = JSON.stringify(response.data.user);
						localStorage.setItem('user', user);
						$rootScope.authenticated = true;
						$rootScope.currentUser = response.data.user;
						$scope.loginError = false;
						$scope.loginErrorText = '';
						$state.go('dashboard');
					}
			});;
		}

	}

})();

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

(function() {
	'use strict';
	angular.module('adminApp').controller('topNavController', topNavController);

    function topNavController($auth, $state, $http, $rootScope, $scope, $mdSidenav) {
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
			vm.openMenu = function() {
				$mdSidenav('left').open();
			};
			vm.closeMenu = function() {
				$mdSidenav('left').close();
			};
    }

})();

(function() {

	'use strict';

	angular
		.module('adminApp')
		.controller('UserController', UserController);
	function UserController($http) {
		var vm = this;
		vm.users;
    $http.get('/api/authenticate').then(function(response) {
			//alert(JSON.stringify(response));
      vm.users = response.data.users;
    },function(error){
      console.log(error);
    })
	}

})();

//# sourceMappingURL=adminapp.js.map
