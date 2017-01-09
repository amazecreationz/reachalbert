'use strict'
var ReachAlbert = angular.module('ReachAlbert', ['ui.router', 'ngAnimate', 'ngMaterial', 'ngCookies', 'ngFileUpload', 'restangular', 'ReachAlbert.modules']);

ReachAlbert.modules = angular.module('ReachAlbert.modules', ['ReachAlbert.common', 'ReachAlbert.widgets'])

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
	}
}