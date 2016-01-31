angular.module("edit-controller", [])

.controller("editCtrl", [ "$scope", "$stateParams", "$state", "dataService", function($scope, $stateParams, $state, dataService) {
	
	var mainScope = $scope.$parent;
	
	// open header
	mainScope.isOpen = true;
	
	
	
	/**************************/
    /********* !DATA **********/
    /**************************/
    
    $scope.formName = $stateParams.edit;
	    
	
	
    /****************************/
    /********* !EVENTS **********/
    /****************************/
    
    // edit navigation
    $scope.submit = function(form, id) {      
        dataService.editNav(form, id).then(function(data) {
			$state.go($state.$current.name, $stateParams, {
				reload: true
			});
		});
    };

		
	
    /*******************************/
    /********* !FUNCTIONS **********/
    /*******************************/
    
	
}]);