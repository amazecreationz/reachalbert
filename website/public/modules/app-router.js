ReachAlbert.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
	
	$stateProvider.state('home', {
		url:'/',
		templateUrl: '/modules/welcome.html',
		controller: 'HomeController'
	});

	$stateProvider.state('login', {
		url:'/login',
		params: {
			redirect: 'console'
		},
		templateUrl: '/modules/login/login.html',
		controller: 'LoginController'
	});

	$stateProvider.state('profile', {
		url:'/profile',
		templateUrl: '/modules/profile/my-profile.html',
		controller: 'ProfileController'
	});

	$stateProvider.state('profile.password', {
		url:'/password',
		templateUrl: '/modules/profile/my-profile.html',
		controller: 'ProfileController'
	});

	$stateProvider.state('console', {
		url:'/console',
		templateUrl: '/modules/console/user-console.html',
		controller: 'ConsoleController'
	});

	$stateProvider.state('admin', {
		url:'/admin',
		templateUrl: '/modules/admin/admin-console.html',
		controller: 'AdminController'
	});

	$stateProvider.state('teach', {
		url:'/teach',
		templateUrl: '/modules/teach/teach-console.html',
		controller: 'TeachController'
	});

	$locationProvider.html5Mode(true);
	$urlRouterProvider.when('','/');
	//$urlRouterProvider.when('/','/welcome');
}]);