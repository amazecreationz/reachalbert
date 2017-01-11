ReachAlbert.controller('MainController', ['$scope', '$state',  '$rootScope', '$http', '$window', '$location', '$mdSidenav', function($scope, $state, $rootScope, $http, $window, $location, $mdSidenav){
	ReachAlbert.globals.isLive = $location.host() == 'reachalbert.com' || $location.host() == 'www.reachalbert.com';
	$scope.globals = {
		image: angular.copy(ReachAlbert.globals.image),
		loader: angular.copy(ReachAlbert.globals.loader)
	}
	$scope.tabs = angular.copy(ReachAlbert.constants.mainTabs);
	$scope.appItems = angular.copy(ReachAlbert.constants.apps);
	$scope.locked = false;

	$rootScope.user_data = {}

    $scope.login = function() {
    	$state.go('login', {redirect: $state.current.name != 'home'? $state.current.name : 'console'});
    }

	$scope.signOut = function() {
		firebase.auth().signOut().then(function() {
			Materialize.toast('Signed out successfully', 3000);
			$rootScope.user_data = {};
			$scope.$apply();
		}, function(error) {
		  // An error happened.
		});
	}

	$scope.openNewTab = function(url) {
		$window.open(url, '_blank');
	}

	$scope.showNavBar = function() {
		$mdSidenav('side-nav').open();
	}

	$scope.closeNavBar = function() {
		$mdSidenav('side-nav').close();
	}

	$(document).scroll(function() {	
	    if($(window).scrollTop()  > $(window).height()-100) {
	        $('#back-to-top').removeClass('hide');
	    }
	    else {
	    	$('#back-to-top').addClass('hide');
	    }
	});

	$scope.scrollToTop = function() {
		$('body,html').animate({scrollTop: 0}, 800);
	}

	$scope.toggleLock = function() {
    	if($scope.locked)
    		$('.body-container').removeClass('flow');
    	else
    		$('.body-container').addClass('flow');
    	$scope.locked = !$scope.locked;
    }

    firebase.auth().onAuthStateChanged(function(user) {
    	if(user){
	    	$rootScope.user_data = {
				name: user.displayName,
				nickname: user.displayName,
				email: user.email,
				image: user.photoURL,
				uid: user.uid,
				is_email_verified: user.emailVerified,
				isAdmin: false,
				is_user_signed: true
			}
			$scope.$apply();
			Materialize.toast('Signed in as '+$rootScope.user_data.name, 3000);
			firebase.database().ref('isAdmin').on('value', function(data){
				if(data.val()){
					$rootScope.user_data.isAdmin = data.val();
					$scope.$apply();
				}	
			})
		}
    })

}]);

ReachAlbert.controller('HomeController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	console.log("HomeController");
	$(window).resize();
	$('title').html("Reach Albert | Home");
	$('.body-container').animate({scrollTop : 0}, 800);
	
	$scope.$parent.showConsoleButton = true;
	$rootScope.bck_image = "buddy.jpg";
}]);