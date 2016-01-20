angular.module("stack-controller", [])

.controller("stackCtrl", ["$scope", "$stateParams", function($scope, $stateParams) {
    
	var mainScope = $scope.$parent;
	
	// open header
	mainScope.isOpen = true;
	
	
	
    /**************************/
    /********* !DATA **********/
    /**************************/
    
    $scope.stack;
    
    getStack(mainScope.nav);
    
    // nav changes
	$scope.$on("navChange", function(event, args) {
		
		var nav = args.val;
        
        getStack(nav);
		
	});
    

	
    
    /****************************/
    /********* !EVENTS **********/
    /****************************/
    
	
	
    /*******************************/
    /********* !FUNCTIONS **********/
    /*******************************/
    
    function getStack(items) {
        
        // look at navigation objects
        angular.forEach(items, function(value, key) {
            
            // return items based on state
            if (value.nav == $stateParams.nav) {
                
                // assign scope
                $scope.stack = value.items;

            };

        });
        
    };
    
	
}]);