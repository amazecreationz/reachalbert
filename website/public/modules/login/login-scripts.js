function onSuccess(googleUser) {
    var scope = angular.element(document.getElementsByTagName('body')).scope();
    scope.onSignIn(googleUser);
}

function onFailure(error) {
	console.log(error);
}

function renderButton() {
	gapi.signin2.render('my-signin2', {
	'scope': 'profile email',
	'width': 240,
	'height': 50,
	'longtitle': true,
	'theme': 'light',
	'onsuccess': onSuccess,
	'onfailure': onFailure
	});
}