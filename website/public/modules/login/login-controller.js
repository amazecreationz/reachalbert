ReachAlbert.controller('LoginController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams){
	console.log("LoginController");
	$(window).resize();
	$('title').html("Reach Albert | Login");
	$('.body-container').animate({scrollTop : 0}, 800);

    /*var signin_script = document.createElement("script");
	signin_script.type = "text/javascript";
	signin_script.src = "https://apis.google.com/js/platform.js?onload=renderButton";
	$("head").append(signin_script);*/

	$scope.signIn = function() {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
		firebase.auth().signInWithPopup(provider).then(function(result) {
		}).catch(function(error) {
	        if (error.code === 'auth/account-exists-with-different-credential') {
	        	alert('You have already signed up with a different auth provider for that email.');
	        } else {
	        	console.error(error);
	        }
        });
	}

	firebase.auth().onAuthStateChanged(function(user) {
    	if(user){
    		$state.go($stateParams.redirect)
    	}
    })
}]);