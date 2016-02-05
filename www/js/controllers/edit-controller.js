angular.module("edit-controller", [])

.controller("editCtrl", [ "$scope", "$stateParams", "$state", "dataService", function($scope, $stateParams, $state, dataService) {
	
	var mainScope = $scope.$parent;
	
	// open header
	mainScope.isOpen = true;
	
	
	
	/**************************/
    /********* !DATA **********/
    /**************************/
    
    $scope.formName = $stateParams.edit;
    $scope.tables;
    $scope.fields;
	$scope.rows;
   
    getTables(); // populate all tables in nav
	getRows($stateParams.table); // populate each row of selected table
	    
	
	
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
    
    function getTables() {
		dataService.getTables().then(function(data) {
                        
            // assign to scope
			$scope.tables = data;
            
		});
		
	};
	
	function getRows(table) {
		dataService.getTables(table).then(function(data) {
                        
            // assign to scope
			$scope.rows = data;console.log(data);
            
		});
		
	};
    
	
}]);