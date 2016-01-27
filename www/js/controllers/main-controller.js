angular.module("main-controller", [])

.controller("mainCtrl", [ "$scope", "$state", "$stateParams", "dataService", function($scope, $state, $stateParams, dataService) {
	
	/**************************/
    /********* !DATA **********/
    /**************************/
	
    $scope.idx = 0; // navigation starting index
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
    
    // capture clicked nav item index
    $scope.getIdx = function(idx) {
        
        // set the index for the slider
        $scope.idx = idx;
        
    };
	
	// remove item
    $scope.removeItem = function(id) {
        dataService.removeItem(id).then(function(data) {
			$state.go($state.$current.name, $stateParams, {
				reload: true
			});
		});
    };
    
    // add new navigation
    $scope.addNav = function(name, navigation, label, description) {
        dataService.addNav(name, navigation, label, description).then(function(data) {
			$state.go($state.$current.name, $stateParams, {
				reload: true
			});
		});
    };
    
    // edit navigation
    $scope.editNav = function(id, name, navigation, label, description) {
        dataService.editNav(id, name, navigation, label, description).then(function(data) {
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