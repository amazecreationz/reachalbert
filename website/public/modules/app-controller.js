ReachAlbert.controller('MainController', ['$scope', '$state',  '$rootScope', '$http', '$window', '$location', '$sce', function($scope, $state, $rootScope, $http, $window, $location, $sce){
	$('.button-collapse').sideNav({
  			menuWidth: 270,
	      	edge: 'left',
	      	closeOnClick: true,
	      	draggable: true
		}
	);
	
	ReachAlbert.globals.isLive = $location.host() == 'reachalbert.com' || $location.host() == 'www.reachalbert.com';
	$scope.globals = {
		image: angular.copy(ReachAlbert.globals.image),
		loader: angular.copy(ReachAlbert.globals.loader),
		not_signed_message: $sce.trustAsHtml(angular.copy(ReachAlbert.globals.not_signed_message)),
		theme: angular.copy(ReachAlbert.globals.theme)
	}
	$scope.tabs = angular.copy(ReachAlbert.constants.mainTabs);
	$scope.appItems = angular.copy(ReachAlbert.constants.apps);
	$scope.locked = false;

	$rootScope.user_data = {
		permission: 5
	};
	$rootScope.status = {
		server_online: false
	};

    $scope.login = function() {
    	$state.go('login', {redirect: $state.current.name != 'home'? $state.current.name : 'console'});
    }

	$scope.signOut = function() {
		firebase.auth().signOut().then(function() {
			Materialize.toast('Signed out successfully', 3000);
			$rootScope.user_data = {
				permission: 5
			};
			$scope.$apply();
		}, function(error) {
		  	Materialize.toast('Some error occured. Try again.', 3000);
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
				email: user.email,
				image: user.photoURL,
				uid: user.uid,
				is_email_verified: user.emailVerified,
				isAdmin: false,
				is_user_signed: true,
				permission: 4
			}
			_.defer(function(){$scope.$apply();});
			Materialize.toast('Signed in as '+$rootScope.user_data.name, 3000);
			var db_ref = firebase.database().ref('references').child(user.uid);
			var info = {
		      name: user.displayName,
			  nickname: user.displayName,
		      email: user.email,
		      image_url: user.photoURL,
			  uid: user.uid
		    }
			db_ref.on('value', function(data){
				if(!data.val()){
					db_ref.set(info);
					$rootScope.user_data.nickname = info.nickname;
				}
				else {
					$rootScope.user_data.nickname = data.val().nickname;	
				}
				_.defer(function(){$scope.$apply();});
				db_ref.off();
			});
			firebase.database().ref('isAdmin').on('value', function(data){
				if(data.val()){
					$rootScope.user_data.isAdmin = data.val();
					$rootScope.user_data.permission = 0;
					_.defer(function(){$scope.$apply();});
				}	
			});
			firebase.database().ref('status').on('value', function(data){
				$rootScope.status = data.val();
				_.defer(function(){$scope.$apply();});
			});   
		}
    })

}]);

ReachAlbert.controller('HomeController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	$(window).resize();
	$('title').html("Reach Albert | Home");
	$('.body-container').animate({scrollTop : 0}, 800);
	
	$rootScope.bck_image = "buddy.jpg";
	$scope.$parent.current_tab = "home";
}]);