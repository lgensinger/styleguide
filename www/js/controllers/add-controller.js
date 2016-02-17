angular.module("add-controller", [])

.controller("addCtrl", [ "$scope", "$state", "$stateParams", "dataService", function($scope, $state, $stateParams, dataService) {
	
	var mainScope = $scope.$parent;
	
	// open header
	mainScope.isOpen = true;
	
	
	
	/**************************/
    /********* !DATA **********/
    /**************************/
	
	$scope.files;
	$scope.name;
	$scope.items;
	
	getItems();
	getFiles();
	    
	
	
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
	
	function getItems() {
		dataService.getItems().then(function(data) {
                        
            // assign to scope
			$scope.items = data;
			
			$scope.section = { type: "item", nav: "items" };
            
		});
		
	};
	
	function getFiles() {
		dataService.getFiles().then(function(data) {
                        
            // assign to scope
			$scope.files = data;console.log(data);
			            
		});
		
	};
    
	
}]);