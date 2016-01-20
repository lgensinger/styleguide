angular.module("section-controller", [])

.controller("sectionCtrl", ["$scope", "sectionData", "dataService", function($scope, sectionData, dataService) {
    
	var mainScope = $scope.$parent;
	
	// open header
	mainScope.isOpen = true;
	
	
	
    /**************************/
    /********* !DATA **********/
    /**************************/
    
    $scope.section = sectionData[1];
    $scope.api = sectionData[0];
        

    
    /****************************/
    /********* !EVENTS **********/
    /****************************/
    
	
	
    /*******************************/
    /********* !FUNCTIONS **********/
    /*******************************/
    
	
}]);