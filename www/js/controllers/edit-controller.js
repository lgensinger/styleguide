angular.module("edit-controller", [])

.controller("editCtrl", [ "$scope", "$stateParams", "$state", "dataService", "formService", function($scope, $stateParams, $state, dataService, formService) {
	
	var mainScope = $scope.$parent;
	
	// open header
	mainScope.isOpen = true;
	
	
	
	/**************************/
    /********* !DATA **********/
    /**************************/
    
    $scope.formName = $stateParams.edit;
    $scope.tables;
    $scope.fields;
    
    getTables(); // populate all tables
    
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
    
    $scope.$watch("fields", function(newData, oldData) {
        
        var isMatching = angular.equals(newData, oldData);
        
		if (!isMatching) {
			$scope.$broadcast("fieldsChange", { "val": newData });console.log(newData);
		};
        
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
    
    $scope.editTable = function(id) {
        dataService.getTables(id).then(function(data) {
            
            // assign to scope
            $scope.fields = data;
            
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
    
	
}]);