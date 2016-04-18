angular.module("file-upload-directive", [])

.directive("fileUpload", ["dataService", "$state", "$stateParams", function(dataService, $state, $stateParams) {
	return {
		restrict: "E",
        controller: function($scope) {
						
			$scope.uploadFile = function(event) {
				
				var fileList = event.target.files;

				// add to database
				dataService.addFile(fileList).then(function(data) {
					$state.go($state.current.name, $stateParams, {
						reload: true
					});
				});
				
			};
            
        },
		template: "<input type='file' multiple on-upload-change='uploadFile'>"
	}
	
}])

.directive("onUploadChange", function() {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			
			var onChangeHandler = scope.$eval(attrs.onUploadChange);
			
			element.bind("change", onChangeHandler);
			
		}
	}
})