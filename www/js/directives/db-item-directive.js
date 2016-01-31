angular.module("db-item-directive", [])

.directive("dbItem", ["$state", "$stateParams", "dataService", function($state, $stateParams, dataService) {
	return {
		restrict: "E",
		scope: {
			items: "=",
			section: "="
		},
        controller: function($scope) {
			
			var mainScope = $scope.$parent.$parent;
			
			$scope.itemIdx = 0; // navigation starting index
			
			// capture clicked nav item index
			$scope.getIdx = function(idx) {
				
				// set the index for the slider
				$scope.itemIdx = idx;

			};

			// remove item
			$scope.removeItem = function(id) {
				dataService.removeItem(id).then(function(data) {
					$state.go($state.$current.name, $stateParams, {
						reload: true
					});
				});
			};
			
			// watch index change
			$scope.$watch("itemIdx", function(newData, oldData) {

				var isMatching = angular.equals(newData, oldData);

				if (!isMatching) {
					mainScope.$broadcast("itemIdxChange", { "val": newData });
				};

			});
            
        },
		templateUrl: "templates/directives/db-item.html",
		link: function(scope, element, attrs) {
			
		}
		
	};
}]);