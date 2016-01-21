angular.module("detail-controller", [])

.controller("detailCtrl", ["$scope", "$stateParams", "dataService", function($scope, $stateParams, dataService) {
    
	var mainScope = $scope.$parent;
	
	// open header
	mainScope.isOpen = true;

	
	
    /**************************/
    /********* !DATA **********/
    /**************************/
           
    $scope.detail;
    
    getDetail($stateParams.nav, $stateParams.stack);
	
	
    /****************************/
    /********* !EVENTS **********/
    /****************************/
    
	
	
    /*******************************/
    /********* !FUNCTIONS **********/
    /*******************************/
    
    function getDetail(section, id) {
		dataService.getDetail(section, id).then(function(data) {
                        
            // assign to scope
			$scope.detail = data[0];
            
		});
		
	};
    
	
}]);