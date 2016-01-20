var app = angular.module("app", [
    "ui.router",
    "app.controllers",
    "app.directives",
    "app.services",
    "app.filters"
]);

/***********************/
/********* RUN *********/
/***********************/

app.run(function() {
    
    // run methods here
    
});

/**************************/
/********* CONFIG *********/
/**************************/

app.config(function($stateProvider, $urlRouterProvider) {

	/****************/
	/**** ROUTES ****/
	/****************/

	$stateProvider
    
    // main app (shared structure)
    .state("app", {
        url: "/",
        templateUrl: "templates/main.html",
        controller: "mainCtrl"
    })
	
	// nav section view
	.state("app.section", {
        url: "{section}",
        templateUrl: "templates/section.html",
        controller: "sectionCtrl",
        resolve: {
            sectionData: function(dataService, $stateParams) {
                return dataService.getSection($stateParams.section);
            }
        }
    })
    
    // stack view
    .state("app.stack", {
        url: "{nav}/{stack}",
        templateUrl: "templates/stack.html",
        controller: "stackCtrl"
    })
	
	// detail view
    /*.state("app.detail", {
        url: "{nav}/{name}",
        templateUrl: "templates/detail.html",
        controller: "detailCtrl",
		resolve: {
            stackData: function(dataService, $stateParams) {
                return dataService.getStack($stateParams.stack);
            }
        }
    })*/

    $urlRouterProvider.otherwise("/");

});