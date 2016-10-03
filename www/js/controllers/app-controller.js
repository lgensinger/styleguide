angular.module("app-controller", [])

.controller("appCtrl", ["$scope", "$stateParams", "$state", "layoutService", "authenticationService", "$rootScope", function($scope, $stateParams, $state, layoutService, authenticationService, $rootScope) {
    
    var workspaceParam = $stateParams.workspace;
    var panelID = $stateParams.panel;
    var theme = $stateParams.t;
    
    // data objects
    $scope.panels;
    $scope.panel;
    $scope.user;
    $scope.workspaces;
    $scope.workspace;
    $scope.workspaceParam = workspaceParam;
    $scope.leftVisible = false;
    $scope.rightVisible = false;
    $scope.bottomVisible = false;
    
    function setScope(user, workspaces, workspace, panels) {
        
        // set scope
        $scope.user = user;
        $scope.workspaces = workspaces;
        $scope.workspace = workspace;
        $scope.panels = panels;
        
        // set menu content
        $scope.menu = {
            user: user,
            theme: $scope.$parent.theme,
            workspaces: workspaces,
            workspaceParam: workspaceParam,
            panels: panels
        };
        
    };
    
    // TODO remove hard coded persona if/when login is used
    
    // post credentials to local storage
    authenticationService.postCredentials("anyone", 1).then(function(userData) {
        
        var user = {"user": userData.user, id: userData.id};
        var endpoint = "persona/" + user.id + "/";
        var objs = { multi: "workspaces", single: "workspace" };
        var check = { key: "url_name", value: workspaceParam };

        // get workspaces
        layoutService.getStructures(endpoint, objs).then(function(allWorkspaces) {
            
            var workspaces = allWorkspaces;
            
            // get single workspace
            layoutService.getStructure(workspaceParam, objs, workspaceParam + "/", check).then(function(singleWorkspace) {
                
                var workspace = singleWorkspace;
                var objs = { multi: "panels", single: "panel" };
				var panelEndpoint = workspaceParam + "/panels/" + user.id + "/";
                
                // get single workspace panels
                layoutService.getStructures(panelEndpoint, objs).then(function(workspacePanels) {
                    
                    var panels = [];
                    
                    // loop through all panels
                    angular.forEach(workspacePanels, function(value, key) {
                        
                        // check if should be included in nav
                        if (value.show_in_nav) {
                            
                            this.push(value);
                            
                        };
                        
                    }, panels);
                    
                    // set scope
                    setScope(user, workspaces, workspace, panels);
                    
                });
                
            });

        });

    });
    
    function _close() {
        $scope.$apply(function() {
            $scope.closePanel(); 
        });
    };

    $scope.closePanel = function() {
        
        // hide panel
        $scope.leftVisible = false;
        $scope.rightVisible = false;
        $scope.bottomVisible = false;
        
        // transition state to reload preview panel
        $state.go("app.panel", {
            workspace: $state.params.workspace,
            panel: state_config.panel
        });
    };

    $scope.showLeft = function(event) {
        $scope.leftVisible = true;
        event.stopPropagation();
    };

    $scope.showRight = function(event) {
        $scope.rightVisible = true;
        event.stopPropagation();
    };
    
    $scope.showBottom = function(event) {
        $scope.bottomVisible = true;
        event.stopPropagation();
    };

    $rootScope.$on("documentClicked", _close);
    $rootScope.$on("escapedPressed", _close);
	
}]);