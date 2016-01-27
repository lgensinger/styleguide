angular.module("add-controller", [])

.controller("addCtrl", [ "$scope", "$state", "$stateParams", "dataService", function($scope, $state, $stateParams, dataService) {
	
	var mainScope = $scope.$parent;
	
	// open header
	mainScope.isOpen = true;
	
	
	
	/**************************/
    /********* !DATA **********/
    /**************************/
	
	$scope.name;
	    
	
	
    /****************************/
    /********* !EVENTS **********/
    /****************************/
	
	// close overlay
	$scope.close = function() {
		
		// change css
		$scope.isOpen = false;
		
		// change state
		$state.go("app");
		
	};
	
	// add new item
    $scope.addItem = function(name) {
        dataService.addItem(name).then(function(data) {
			$state.go($state.$current.name, $stateParams, {
				reload: true
			});
		});
    };
	
	// remove item
    $scope.removeItem = function(id) {
        dataService.removeItem(id).then(function(data) {
			$state.go($state.$current.name, $stateParams, {
				reload: true
			});
		});
    };

		
	
    /*******************************/
    /********* !FUNCTIONS **********/
    /*******************************/
    
	
}]);