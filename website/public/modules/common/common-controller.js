ReachAlbert.common = angular.module('ReachAlbert.common' ,[])

ReachAlbert.common.controller('TabController', ['$scope', '$state', '$stateParams', function($scope, $state, $stateParams){
	$('body,html').animate({scrollTop: 0}, 800);
}]);

ReachAlbert.common.controller('CrewController', ['$scope', function($scope){
	$('body,html').animate({scrollTop: 0}, 800);
	$scope.crewsList = angular.copy(ReachAlbert.constants.crewList);
}]);

ReachAlbert.common.controller('AboutController', ['$scope', function($scope){
	$('body,html').animate({scrollTop: 0}, 800);
	$scope.about_image_dir = angular.copy(ReachAlbert.globals.image.about_url);
	$scope.hosting_list = angular.copy(ReachAlbert.constants.about.hosting_list);
}]);

ReachAlbert.common.controller('FeedbackController', ['$scope', '$state', 'Restangular', function($scope, $state, Restangular){
	$('body,html').animate({scrollTop: 0}, 800);	

	$scope.formData = {
		data:{},
		options: {
			isAnonymous: false
		}
	};

    $scope.submitFeedback = function() {
    	var url = '/api/feedback?name=' +($scope.formData.data.name ? $scope.formData.data.name : 'Anonymous') +'&email=' +($scope.formData.data.email ? $scope.formData.data.email : 'anonymous@amazecreationz.in') +'&feedback=' +$scope.formData.data.feedback;
    	$scope.formData.data = {};
    	Restangular.one(url).post().then(function(data){
    		if(data.status == 1)
    			alert("Feedback sent!")
    		else
    			alert("Sorry! Feedback send failed. Try Again!")
    		$state.reload();
    	})
    }
}]);