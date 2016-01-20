angular.module("content-slider-directive", [])

.directive("contentSlider", [ function() {
	return {
		restrict: "E",
		scope: {
			vizData: "="
		},
        controller: function($scope) {
            
            var mainScope = $scope.$parent.$parent;
                        
             // control slider navigation
            $scope.currentIndex = mainScope.idx;

            $scope.setCurrentSlideIndex = function(idx) {
                $scope.currentIndex = idx;
            };

            $scope.isCurrentSlideIndex = function(idx) {
                return $scope.currentIndex === idx;
            };

            $scope.previous = function() {
                $scope.currentIndex = ($scope.currentIndex < $scope.vizData.length - 1) ? ++$scope.currentIndex : 0;
            };

            $scope.next = function() {
                $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.vizData.length - 1;
            };
            
        },
		templateUrl: "templates/content-slider.html",
		link: function(scope, element, attrs) {
			
		}
		
	};
}]);