ReachAlbert.controller('ConsoleController', ['$scope', '$state', '$stateParams', '$rootScope', '$filter', function($scope, $state, $stateParams, $rootScope, $filter){
	$(window).resize();
	$('title').html("Reach Albert | Console");
	$('.body-container').animate({scrollTop : 0}, 800);

    $rootScope.bck_image = "connected.jpg";
	$scope.$parent.current_tab = "console";
    $scope.message = {
    	text:''
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
		    if(data.from) {
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

    var delMessage = function(key) {
    	var msg = document.getElementById(key);
    	msg.parentNode.removeChild(msg);
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
    	/*db_ref.limitToLast(1).on('child_removed', function(data){
    		delMessage(data.key);
    	});*/
    }

    $scope.sendMessage = function() {
    	var currentUser = firebase.auth().currentUser;
    	if(currentUser && $scope.message.text != ''){
    		var updates = {};
    		var db_ref = firebase.database().ref('users/'+currentUser.uid+'/messages');
    		var newMsgKey = db_ref.push().key;
    		if(!$rootScope.status.server_online) {
    			var message = {
			      from: 'Admin',
			      text: 'Albert is sleeping right now. Please try after some time. :)' ,
			      image: '/resources/images/logos/logo-large.jpg',
	              time: new Date().getTime()
			    }
			    setMessage(newMsgKey, message);
    		}
    		else {			
		    	var message = {
			      name: $rootScope.user_data.name,
			      text: $scope.message.text,
			      email: $rootScope.user_data.email,
			      uid: $rootScope.user_data.uid,
			      image: $rootScope.user_data.image,
	              time: new Date().getTime()
			    }
			    updates['users/'+currentUser.uid+'/messages/'+newMsgKey] = message;
	 			updates['users/messages/'+newMsgKey] = message;

				firebase.database().ref().update(updates).then().catch(function(error) {
			    	console.error('Error writing new message to Firebase Database: ', error);
			    });
    		}
		    $scope.message.text = '';	
    	}
    }

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
	    	loadMessages('users/'+user.uid+'/messages');
		}
	});
}]);