angular.module("main-controller", [])

.controller("mainCtrl", [ "$scope", "$state", "$stateParams", "dataService", function($scope, $state, $stateParams, dataService) {
	
	/**************************/
    /********* !DATA **********/
    /**************************/
	
	$scope.isOpen = false; // global header/nav
	$scope.nav;
    $scope.title;
    $scope.description;
    $scope.poster;
	
	// get data
    getApp();
	getNav();
    
    // watch nav changes
    $scope.$watch("nav", function(newData, oldData) {
        
        var isMatching = angular.equals(newData, oldData);
        
		if (!isMatching) {
			$scope.$broadcast("navChange", { "val": newData });
		};
        
	});
    
	
	
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
    
    // encode url spaces
    $scope.beautyEncode = function(str) {
		str = str.replace(/ /g, '-');
		return str;
	};
    
    // edit item
    $scope.edit = function(section) {
        
        // format the objects to be more angular friendly
        // for ease of use in forms
        
        var disclude = "items, id";
        var keys = Object.keys(section);
        var fields = [];
        
        angular.forEach(keys, function(value, key) {
            
            // check against keys not wanted in forms
            if (disclude.match(value) == null && value != "$$hashKey") {
                
                var obj = {};
                obj["label"] = value;
                obj["value"] = section[value];
                
                // add to fields
                this.push(obj);
                
            };
            
        }, fields);
               
        // get info to pass to edit
        $scope.editFields = { fields: fields, id: section.id };
        
    };
    
    // add new navigation
    $scope.addNav = function(name, navigation, label, description) {
        dataService.addNav(name, navigation, label, description).then(function(data) {
			$state.go($state.$current.name, $stateParams, {
				reload: true
			});
		});
    };

		
	
    /*******************************/
    /********* !FUNCTIONS **********/
    /*******************************/
        
    function getApp() {
		dataService.getApp().then(function(data) {
            
            var appData = data[0];
                        
            // assign to scope
			$scope.app = appData;
            $scope.title = appData.name;
            $scope.description = appData.description;
            
		});
		
	};
    
	function getRecent(count) {
		dataService.getItems(count).then(function(data) {
                        
            // assign to scope
			$scope.changeLog = data;
            
		});
		
	};
	
	function getNav() {
		dataService.getSections().then(function(data) {
                        
            // assign to scope
			$scope.nav = data;
            
		});
		
	};
	
}]);