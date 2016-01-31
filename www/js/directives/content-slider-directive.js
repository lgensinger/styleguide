angular.module("content-slider-directive", [])

.directive("contentSlider", ["$stateParams", function($stateParams) {
	return {
		restrict: "E",
		scope: {
			vizData: "=",
			idx: "="
		},
        controller: function($scope) {
                        
            $scope.section = $stateParams.nav;

            /*$scope.previous = function() {console.log($scope.currentIndex);
                $scope.currentIndex = ($scope.currentIndex < $scope.vizData.length - 1) ? ++$scope.currentIndex : 0;
            };

            $scope.next = function() {
                $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.vizData.length - 1;
            };*/
            
        },
		templateUrl: "templates/content-slider.html",
		link: function(scope, element, attrs) {
			
			scope.$watch("idx", function(newData, oldData) {
				
				// async check
				if (newData !== undefined) {
					//console.log("data is ready");

					// check new vs old
					var isMatching = angular.equals(newData, oldData);

					// if false
					if (!isMatching) {

						// control slider navigation
						scope.currentIndex = newData;

						scope.isCurrentSlideIndex = function(idx) {
							return scope.currentIndex === idx;
						};

					};
					
				};
				
			});
			
		}
		
	};
}]);