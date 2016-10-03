angular.module("horizontal-slide-nav-directive", [])

.directive("horizontalSlideNav", ["$state", "layoutService", "authenticationService", "$rootScope", "contentService", function($state, layoutService, authenticationService, $rootScope, contentService) {
	return {
		restrict: "E",
		scope: {
            parentId: "="
		},
        templateUrl: "templates/app-global/horizontal-slide-nav.html",
	    controller: function($scope) {
            
            var userData;
            	   
			// get user data
            authenticationService.getCredentials().then(function(userData) {
                
                userData = userData;
            
                // get all modules for panel and persona
                contentService.getData("module/persona/" + userData.id + "/panel/" + $scope.parentId + "/count/" + $state.params.c + "/").then(function(data) {

                    // set scope
                    $scope.navItems = data;

                });
                
            });
	    	
	    },
		link: function(scope, element, attr) {
            
            // change the pane via navigation
            scope.changeItem = function(event, idx) {
                
                var workspaceParam = $state.params.workspace;
                var moduleParam = event.target.id;
                var currentItemEl = angular.element(event.target);
                var currentItemParentId

				// set scope
				scope.moduleParam = moduleParam;
                
                // add active class
                currentItemEl.addClass("active");
                
                // remove active class from all other modules
                
                contentService.getData("panel/" + workspaceParam + "/urls/true/").then(function(data) {
                    
                    scope.urlList = data[0].urls;
                    
                });
                
            };
            
            // put all urls in a string to match
            // this allows a check to see if any active module
            // is in this horizontal group and thus remove active class
            // when clicking between different panels
            /*var urlList = data.map(function(d) {
                return d.url_name;
            });
			
			// watch for panel change
            /*scope.$watch("navItems", function(newData, oldData) {
                
                // async check
                if (newData !== undefined) {
                    
                    scope.navItems = newData;
                    scope.moduleParam = $state.params.panel;
                    
                };
                
            })*/
			
		}

	};
}]);