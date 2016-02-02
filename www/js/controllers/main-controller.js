angular.module("main-controller", [])

.controller("mainCtrl", [ "$scope", "$state", "$stateParams", "dataService", "formService", function($scope, $state, $stateParams, dataService, formService) {
	
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
        
        $scope.editFields = formService.getFields(section);
        
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