angular.module("vertical-nav-directive", [])

.directive("verticalNav", ["$state", "layoutService", "$rootScope", "authenticationService", function($state, layoutService, $rootScope, authenticationService) {
	return {
		restrict: "E",
		scope: {
			navItems: "="
		},
        templateUrl: "templates/app-global/vertical-nav.html",
	    controller: function($scope) {
	    	
	    	// change the pane via navigation
            $scope.changeItem = function($event, idx) {
                
                var panelParam = $event.target.id;
                var workspaceParam = $state.params.workspace;

				// set scope
				$scope.panelParam = panelParam;
				
				// get credentials from local storage
				authenticationService.getCredentials().then(function(userData) {

					var user = userData;
					var originUrl = $state.params.panel;
					var destinationIdx = idx;
					var objs = { multi: "panels", single: "panel" };
					var endpoint = workspaceParam + "/panels/" + user.id + "/";
					var check = { key: "url_name", value: panelParam };

					// pull panel from stored panels in service
					layoutService.getStructure(panelParam, objs, endpoint, check).then(function(data) {

						// origin panel
						var origin = data;

						// check all panels
						angular.forEach($scope.panels, function(value, key) {

							// get destination index
							if (origin.id == value.id) {

								var originIdx = key;

								// check indicies to resolve animation direction
								if (destinationIdx < originIdx) {

									//$ionicViewSwitcher.nextDirection(["back"]);

								} else if (destinationIdx > originIdx) {

									//$ionicViewSwitcher.nextDirection(["forward"]);

								} else {

									//$ionicViewSwitcher.nextDirection(["enter"]);

								};

							};

						});

					});
					
				});
                
            };
	    	
	    },
		link: function(scope, element, attr) {
			
			// watch for panel change
            scope.$watch("navItems", function(newData, oldData) {
                
                // async check
                if (newData !== undefined) {
                    
                    scope.navItems = newData;
                    scope.panelParam = $state.params.panel;
                    
                };
                
            })
			
		}

	};
}]);