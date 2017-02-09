ReachAlbert.controller('TeachController', ['$scope', '$state', '$stateParams', '$rootScope', '$filter', function($scope, $state, $stateParams, $rootScope, $filter){
	$(window).resize();
	$('title').html("Reach Albert | Teach");
	$('.body-container').animate({scrollTop : 0}, 800);

    $rootScope.bck_image = "connected.jpg";
	$scope.$parent.current_tab = "teach";
    $scope.types = angular.copy(ReachAlbert.constants.albert.teach.types);
    $scope.actions = angular.copy(ReachAlbert.constants.albert.teach.actions);
    $scope.action = $scope.actions[0];
    $scope.teach = {
    	type: 'CONVO',
    	param_1: '',
    	param_2: '',
    	action: '',
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

    var getCleanedMessage = function(message) {
    	var cleaned_message = angular.copy(message);
    	cleaned_message = cleaned_message.replace(/\'/g, '');
    	cleaned_message = cleaned_message.replace(/\?/g, '');
    	cleaned_message = cleaned_message.replace(/\!/g, '');
    	cleaned_message = cleaned_message.replace(/\./g, '');
    	cleaned_message = cleaned_message.replace(/ /g, '_');
    	return cleaned_message.toUpperCase();
    }

    var removeSpaces = function(message) {
    	var cleaned_message = angular.copy(message);
    	cleaned_message = cleaned_message.replace(/ /g, '_');
    	return cleaned_message;
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

    $scope.teachAlbert = function() {
    	var currentUser = firebase.auth().currentUser;
    	if(currentUser && $scope.teach.type != '' && $scope.teach.param_1 !=''){
    		$scope.teach.action = $scope.action.key;
    		var db_ref = firebase.database().ref('users/'+currentUser.uid+'/messages');
    		var teach_message = 'TEACH ' +$scope.teach.type +' ' +getCleanedMessage($scope.teach.param_1) +' ' +($scope.teach.action=='LINK' ? getCleanedMessage($scope.teach.param_2) : removeSpaces($scope.teach.param_2))+' ' +$scope.teach.action;
	    	var message = {
		      name: $rootScope.user_data.name,
              email: $rootScope.user_data.email,
              uid: $rootScope.user_data.uid,
              text: teach_message,
              image: $rootScope.user_data.image,
              time: new Date().getTime()
		    }

		    var newMsgKey = db_ref.push().key;
		    var updates = {};
  			updates['users/'+currentUser.uid+'/messages/'+newMsgKey] = message;
            message = angular.extend(message, $scope.teach);
 			updates['users/teach/'+newMsgKey] = message;
            $scope.teach.param_1 = '';
            $scope.teach.param_2 = '';
		    
		    firebase.database().ref().update(updates).then().catch(function(error) {
		    	console.error('Error writing new message to Firebase Database: ', error);
		    });
    	}
    }

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
	    	loadMessages('users/'+user.uid+'/messages');
		}
	});
}]);