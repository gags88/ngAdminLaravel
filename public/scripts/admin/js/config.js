(function() {
	'use strict';
	var admin = angular.module('adminApp', ['ui.router', 'satellizer','ngResource','ngMaterial','ngAnimate','ngMessages', 'ngStorage']);

  admin.config(['$mdThemingProvider', '$httpProvider', '$stateProvider', '$urlRouterProvider', '$authProvider', '$provide', '$locationProvider', function($mdThemingProvider, $httpProvider, $stateProvider, $urlRouterProvider, $authProvider, $provide, $locationProvider) {
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
					title : 'Administration Login'
				})
				.state('dashboard', {
					url: '/dashboard',
					templateUrl: '../views/admin/dashboard/dashboard.html',
					controller: 'UserController as user',
					title : 'Administration Dashboard'
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
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        //console.log("state change -> From state: " + fromState.name + " To state: " + toState.name);
        $rootScope.loading = false;
      });
  }]);

})();
