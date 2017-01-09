ReachAlbert.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){

	$stateProvider.state('home', {
		url:'/',
		templateUrl: '/modules/welcome.html',
		controller: 'HomeController'
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

	$locationProvider.html5Mode(true);
	$urlRouterProvider.when('','/');
	//$urlRouterProvider.when('/','/welcome');
}]);