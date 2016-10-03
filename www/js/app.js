var app = angular.module("app", [
    "ui.router",
    "angularMoment",
    "smoothScroll",
    "desktop.controllers",
    "desktop.directives",
    "desktop.services",
    "desktop.filters"
]);

/***********************/
/********* RUN *********/
/***********************/

app.run(function(amMoment, $rootScope) {

    /***********************/
    /**** DESKTOP PANEL ****/
    /***********************/

    // stop propagation of event to trigger menu
    // so menu doesn't auto hide after it's shown
    // turn on if using left or right panel
    /*
    document.addEventListener("keyup", function(e) {

        if(e.keyCode === 27) {

            $rootScope.$broadcast("escapedPressed", e.target);

        };

    });

    document.addEventListener("click", function(e) {

        $rootScope.$broadcast("documentClicked", e.target);

    });*/

    /****************/
    /**** MOMENT ****/
    /****************/

    //calendar time format
    amMoment.changeLocale('en', {
        calendar : {
            lastDay : '[Yesterday]',
            sameDay : '[Today]',
            nextDay : '[Tomorrow]',
            lastWeek : '[Last] dddd',
            nextWeek : '[Next] dddd',
            sameElse : 'D MMMM YYYY'
        }
    });

});

/**************************/
/********* CONFIG *********/
/**************************/

app.config(function($stateProvider, $urlRouterProvider, $compileProvider) {

    $compileProvider.debugInfoEnabled(false);

    /****************/
    /**** ROUTES ****/
    /****************/

    $stateProvider

    // main
    .state("app", {
        url: "/{workspace}?:t",
        //abstract: true,
        templateUrl: "templates/app-global/app.html",
        controller: "appCtrl",
        params: {
            t: theme_config.ui.workspace
        }
    })

    // panel
    .state("app.panel", {
        url: "/{panel}?:c",
        views: {
            "panel": {
                // TODO clean up service so this call isn't so crazy
                templateProvider: function($http, $stateParams, layoutService, $rootScope, authenticationService) {
                    return authenticationService.getCredentials().then(function(userData) {
                        return layoutService.getStructure($stateParams.panel, { multi: "panels", single: "panel" }, $stateParams.workspace + "/panels/" + userData.id + "/", { key: "url_name", value: $stateParams.panel }).then(function(panelData) {
                            return $http.get("templates/panels/" + panelData.layout_name + ".html").then(function(template) {
                                return template.data;
                            });
                        });
                    });
                },
                controller: "panelCtrl"
            },
            "slide": {
                templateUrl: "templates/app-global/slide-panel.html"
            }
        }
    })
    
    // module
    .state("app.panel.module", {
        url: "/{module}",
        views: {
            "panel": {
                // TODO clean up service so this call isn't so crazy
                template: "<p>module here</p>",
                controller: "moduleCtrl"
            }/*,
            "slide": {
                templateUrl: "templates/app-global/slide-panel.html"
            }*/
        }
    })

    $urlRouterProvider.otherwise("/" + state_config.workspace + "/" + state_config.panel + "?c=" + state_config.moduleCount + "&t=" + theme_config.ui.start);

});
