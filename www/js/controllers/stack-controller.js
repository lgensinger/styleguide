angular.module("stack-controller", [])

.controller("stackCtrl", ["$scope", "$stateParams", function($scope, $stateParams) {
    
	var mainScope = $scope.$parent;
	
	// open header
	mainScope.isOpen = true;
	
	
	
    /**************************/
    /********* !DATA **********/
    /**************************/
    
    $scope.section = $stateParams.nav;
    $scope.stack;
    $scope.nextStack;
    $scope.prevStack;
    
    getStack(mainScope.nav);
    
    // nav changes
	$scope.$on("navChange", function(event, args) {
		
		var nav = args.val;
        
        getStack(nav);
		
	});
	
	
	// item index changes
	$scope.$on("itemIdxChange", function(event, args) {
console.log("index change");console.log(args);
		var idx = args.val;

		// control slider navigation
		$scope.idx = idx;

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
                
                // look at items
                angular.forEach(value.items, function(value2, key2) {
                    
                    // check the item against state
                    if (value2.name == $stateParams.stack.replace(/-/g, " ") || value2.id == $stateParams.stack) {
                        
						var stack = value.items;
                        var lastIdx = stack.length - 1;
                        var firstItem = stack[0];
                        var lastItem = stack[lastIdx];
                        
                        // check param type
                        if (value.type == "item") {
                            
                            // param is an id
                            
                            // assign scope
                            $scope.nextStack = key2 == lastIdx ? firstItem.id : stack[key2 + 1].id;
							$scope.prevStack = key2 == 0 ? lastItem.id : stack[key2 - 1].id;
                            
                        } else {
                            
                            // param is a string
                        
                            // assign scope
                            $scope.nextStack = key2 == lastIdx ? beautifyEncode(firstItem.name) : beautifyEncode(stack[key2 + 1].name);
                            $scope.prevStack = key2 == 0 ? beautifyEncode(lastItem.name) : beautifyEncode(stack[key2 - 1].name);
                            
                        };
                        
                    };
                    
                })
                

            };

        });
        
    };
	
	function beautifyEncode(str) {
		return str.replace(/ /g, "-");
	};
    
	
}]);