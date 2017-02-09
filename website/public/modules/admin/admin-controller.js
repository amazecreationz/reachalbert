ReachAlbert.controller('AdminController', ['$scope', '$state', '$stateParams', '$rootScope', '$filter', function($scope, $state, $stateParams, $rootScope, $filter){
	$(window).resize();
	$('title').html("Reach Albert | Admin Console");
	$('.body-container').animate({scrollTop : 0}, 800);

    $rootScope.bck_image = "connected.jpg";
	$scope.$parent.current_tab = "admin";
    $scope.message = {
    	text:'',
    	to: '',
    };

    var MSG_TEMPLATE = {
    	USER_IMAGE: '<div class="mrg10 message-user-image"></div>',
    	MESSAGE: '<div class="txt16 user-message"></div><div class="txt12 text-grey user-name"></div><div class="message-time txt12 text-grey"></div>'
    }

	var setMessage = function(key, data){
    	var MSG_CONTAINER = document.getElementById('message-container');
    	var div = document.getElementById(key);
    	if (!div) {
		    var container = document.createElement('div');
		    var FINAL_MSG_TEMPLATE = '<div class="message-box layout-row layout-align-start-center">';
		    if(data.from != 'Admin') {
		    	FINAL_MSG_TEMPLATE += MSG_TEMPLATE.USER_IMAGE;
		    	FINAL_MSG_TEMPLATE += '<div class="message-body text-left flex">'
		    	FINAL_MSG_TEMPLATE += MSG_TEMPLATE.MESSAGE;
		    	FINAL_MSG_TEMPLATE += '</div>'
		    }
		    else {
		    	FINAL_MSG_TEMPLATE += '<div class="message-body text-right flex">'
		    	FINAL_MSG_TEMPLATE += MSG_TEMPLATE.MESSAGE;
		    	FINAL_MSG_TEMPLATE += '</div>'
		    	FINAL_MSG_TEMPLATE += MSG_TEMPLATE.USER_IMAGE;
		    }
		    FINAL_MSG_TEMPLATE += '</div>'
		    container.innerHTML = FINAL_MSG_TEMPLATE;
		    div = container.firstChild;
		    div.setAttribute('id', key);
		    MSG_CONTAINER.appendChild(div);
		}
		div.querySelector('.message-user-image').style.backgroundImage = 'url('+data.image+')';
		div.querySelector('.user-name').textContent = data.name || data.from;
		div.querySelector('.message-time').textContent = $filter('date')(data.time, 'medium');
		var messageElement = div.querySelector('.user-message');
		messageElement.textContent = data.text;
		messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
		setTimeout(function() {div.classList.add('visible')}, 1);
		MSG_CONTAINER.scrollTop = MSG_CONTAINER.scrollHeight;
  		MSG_CONTAINER.focus();
    }

    var clearMessages = function(){
    	var MSG_CONTAINER = document.getElementById('message-container');
    	while (MSG_CONTAINER.hasChildNodes()) {
		    MSG_CONTAINER.removeChild(MSG_CONTAINER.lastChild);
		}
    }

    var loadMessages = function(ref) {
    	var db_ref = firebase.database().ref(ref);
    	db_ref.off();
    	db_ref.limitToLast(20).on('child_added', function(data){
    		setMessage(data.key, data.val());
    	});
    	db_ref.limitToLast(20).on('child_changed', function(data){
    		setMessage(data.key, data.val());
    	});
    }

    var getUsers = function() {
    	var db_ref = firebase.database().ref('references');
    	$scope.users = {};
    	db_ref.limitToLast(20).on('child_added', function(data){
    		$scope.users[data.key] = data.val();
    		$scope.$apply();
    	});
    }

    $scope.sendMessage = function() {
    	var currentUser = firebase.auth().currentUser;
    	if(currentUser && $scope.message.text != '' && $scope.message.to !=''){
    		var db_ref = firebase.database().ref('users/'+$scope.message.to+'/messages');
	    	var message = {
		      text: $scope.message.text,
		      image: '/resources/images/logos/logo-large.jpg',
		      from: 'Admin',
              time: new Date().getTime()
		    }

		    $scope.message.text = '';
		    db_ref.push(message).then().catch(function(error) {
		      console.error('Error writing new message to Firebase Database: ', error);
		    });
    	}
    }

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			$scope.message.to = user.uid;
			getUsers();
	    	loadMessages('users/'+user.uid+'/messages');
		}
	});

	$scope.getUserMessages = function(){
		clearMessages();
		loadMessages('users/'+$scope.message.to+'/messages');
	}
}]);