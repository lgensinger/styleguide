angular.module("section-controller", [])

.controller("sectionCtrl", ["$scope", "$stateParams", "dataService", function($scope, $stateParams, dataService) {
    
	var mainScope = $scope.$parent;
	
	// open header
	mainScope.isOpen = true;
	
	
	
    /**************************/
    /********* !DATA **********/
    /**************************/
    
    $scope.section;
    $scope.api;
    
    getSection($stateParams.section, "specification");
        

    
    /****************************/
    /********* !EVENTS **********/
    /****************************/
    
	
	
    /*******************************/
    /********* !FUNCTIONS **********/
    /*******************************/
    
    function getSection(section, table) {
		dataService.getSection(section, table).then(function(data) {
                        
            // assign to scope
			$scope.section = data[1];
            $scope.api = data[0];
            
		});
		
	};
    
    
    
	
}]);