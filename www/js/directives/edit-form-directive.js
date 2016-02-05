angular.module("edit-form-directive", [])

.directive("editForm", ["$state", "$stateParams", "dataService", function($state, $stateParams, dataService) {
	return {
		restrict: "E",
		scope: {
			formFields: "=",
			formName: "="
		},
		templateUrl: "templates/directives/form.html",
		link: function(scope, element, attrs) {
			
		}
		
	};
}]);