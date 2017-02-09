ReachAlbert.controller('ProfileController', ['$scope', '$state', '$stateParams', '$rootScope', function($scope, $state, $stateParams, $rootScope){
	$(window).resize();
	$('title').html("Reach Albert | Profile");
	$('.body-container').animate({scrollTop : 0}, 800);
	$scope.$parent.current_tab = "profile";

	$scope.profile_title = {
		title: "My Profile",
		menu:[{
			name:'Edit Profile',
			icon: 'edit',
			function: function() {
				$state.go('profile');
				$scope.edit_profile = true;
				$scope.set_password = false;
			}
		},{
			name: 'Set Password',
			icon: 'security',
			function: function() {
				$scope.edit_profile = false;
				$scope.set_password = true;
				$scope.password = {
					value: ''
				};
				$state.go('profile.password');
			}
		}]
	}

	if($state.current.name == 'profile.password') {
		$scope.set_password = true;
		$scope.password = {
			value: ''
		};
	}

	$scope.showPassword = function() {
		$scope.show_password = !$scope.show_password;
	}

	$scope.setPassword = function() {
		if($scope.password.value != ''){
			var db_ref = firebase.database().ref('password/'+$rootScope.user_data.uid);
			db_ref.set($scope.password.value);
			$state.go('profile', {}, {reload: true});
		}
	}

	$scope.saveProfile = function() {
		$scope.edit_profile = false;
		var db_ref = firebase.database().ref('references/'+$rootScope.user_data.uid+'/nickname');
		db_ref.set($rootScope.user_data.nickname);
	}

	$scope.cancel = function() {
		$scope.edit_profile = false;
		$scope.set_password = false;
		$state.go('profile', {}, {reload: true});
	}
}]);	