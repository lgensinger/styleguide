var app = angular.module("app", [
    "ui.router",
    "styleguide.controllers",
    "styleguide.directives",
    "styleguide.services",
    "styleguide.filters"
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
	
	// add items
    .state("app.add", {
        url: "add",
        templateUrl: "templates/add.html",
        controller: "addCtrl"
    })
    
    // edit items
    .state("app.edit", {
        url: "edit?:table",
        templateUrl: "templates/edit.html",
        controller: "editCtrl"
    })
	
	// nav section view
	.state("app.section", {
        url: "{section}",
        templateUrl: "templates/section.html",
        controller: "sectionCtrl"
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