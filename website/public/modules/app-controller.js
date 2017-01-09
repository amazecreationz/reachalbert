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

	var signin_script = document.createElement("script");
	signin_script.type = "text/javascript";
	signin_script.src = "https://apis.google.com/js/platform.js?onload=renderButton";
	$("head").append(signin_script);

	var isUserEqual = function(googleUser, firebaseUser) {
	  if (firebaseUser) {
	    var providerData = firebaseUser.providerData;
	    for (var i = 0; i < providerData.length; i++) {
	      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
	          providerData[i].uid === googleUser.getBasicProfile().getId()) {
	        return true;
	      }
	    }
	  }
	  return false;
	}

	var checkAdmin = function() {
    	var db_ref = firebase.database().ref('admins');
    	$rootScope.user_data.isAdmin = false;
		firebase.database().ref('isAdmin').on('value', function(data){
			if(data.val()){
				$rootScope.user_data.isAdmin = data.val();
				$scope.$apply();
			}	
		})
    }

	$scope.onSignIn = function(googleUser){//OPTIMISE THIS LATER
		var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
			unsubscribe();
			if (!isUserEqual(googleUser, firebaseUser)) {
				var credential = firebase.auth.GoogleAuthProvider.credential(googleUser.getAuthResponse().id_token);
				firebase.auth().signInWithCredential(credential).catch(function(error) {
					console.log(JSON.stringify(error));
				});
			}
		});
		
		var googleUserProfile = googleUser.getBasicProfile();
		var id_token = googleUser.getAuthResponse().id_token;
		$rootScope.user_data = {
			name: googleUserProfile.getName(),
			nickname: googleUserProfile.getGivenName(),
			email: googleUserProfile.getEmail(),
			image: googleUserProfile.getImageUrl(),
			token: id_token
		}		
		$scope.$apply();
		$('.dropdown-button').dropdown('close');
		Materialize.toast('Signed in as '+$rootScope.user_data.name, 3000);
		checkAdmin();
	}

	$scope.signOut = function() {
		var auth2 = gapi.auth2.getAuthInstance();
		auth2.signOut().then(function () {
			console.log('User signed out.');
			Materialize.toast('Signed out successfully', 3000);
			$rootScope.user_data = {};
			$scope.$apply();
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
}]);

ReachAlbert.controller('HomeController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	console.log("HomeController");
	$(window).resize();
	$('title').html("Reach Albert | Home");
	$('.body-container').animate({scrollTop : 0}, 800);
	
	$scope.$parent.showConsoleButton = true;
	$rootScope.bck_image = "buddy.jpg";
}]);