angular.module("edit-controller", [])

.controller("editCtrl", [ "$scope", "$stateParams", "$state", "dataService", "formService", function($scope, $stateParams, $state, dataService, formService) {
	
	var mainScope = $scope.$parent;
	
	// open header
	mainScope.isOpen = true;
	
	
	
	/**************************/
    /********* !DATA **********/
    /**************************/
    
    $scope.formName = $stateParams.edit;
    
    // nav changes
	$scope.$on("navChange", function(event, args) {
		
		var nav = args.val;
        var section = {};
        
        // get section obj based on state params
        angular.forEach(nav, function(value, key) {
            
            // check label against param
            if (value.label == $stateParams.edit) {
                
                // set the section
                section = value;
                
            };
            
        });
        
        // get fields
        $scope.editFields = formService.getFields(section);
		
	});
	    
	
	
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