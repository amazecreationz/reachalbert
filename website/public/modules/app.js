'use strict'
var ReachAlbert = angular.module('ReachAlbert', ['ui.router', 'ngAnimate', 'ngMaterial', 'ngSanitize','restangular', 'ReachAlbert.modules']);

ReachAlbert.modules = angular.module('ReachAlbert.modules', ['ReachAlbert.common', 'ReachAlbert.widgets'])

ReachAlbert.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
	.primaryPalette('cyan', {
		'default': '700',
      	'hue-1': '300',
      	'hue-2': '600',
      	'hue-3': '900'
	})
	.accentPalette('cyan', {
		'default': '50',
		'hue-1': '50',
      	'hue-2': '50',
      	'hue-3': '50'
	});
});

ReachAlbert.globals = {
	image: {
		root_url: '/resources/images/',
		logo_url: '/resources/images/logos/',
		gif_url: '/resources/images/gif/',
		about_url: '/resources/images/about/',
		bck_url: '/resources/images/backgrounds/',
		crew_url: '/resources/images/crew/'
	},
	loader: {
		message: 'Loading! Please Wait',
		status: 0
	},
	not_signed_message: '<a class="pointer" ng-click="login()">Sign In</a> to use this feature.',
	theme: "cyan"
}