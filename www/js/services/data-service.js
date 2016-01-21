angular.module("data-service", [])

.factory("dataService", ["$http", function($http) {
	
    var urlBase="api/";
    var dataService = {};

	// items
    dataService.getItems = function(count) {
        
        var apiUrl = urlBase + "item";
		
		// check params
		if (count != null) {
			
			apiUrl += "/" + count;
			
		};
            
        // call data
        return $http.get(apiUrl).then(function(data) {
            
            // return data
            return data.data;
            
        });
		
    };
	
	// sections
    dataService.getSections = function() {
        
        var apiUrl = urlBase + "section";
            
        // call data
        return $http.get(apiUrl).then(function(data) {
            
            // return data
            return data.data;
            
        });
		
    };
    
    // api
    dataService.getApi = function(section) {
        
        var apiUrl = urlBase + "test/" + section
            
        // call data
        return $http.get(apiUrl).then(function(data) {
            
            // return data
            return data.data;
            
        });
		console.log(apiUrl);
    };
    
    // app
    dataService.getApp = function() {
        
        var apiUrl = urlBase + "app";
            
        // call data
        return $http.get(apiUrl).then(function(data) {
            
            // return data
            return data.data;
            
        });
		
    };
    
    // section
    dataService.getSection = function(section) {
        
        var apiUrl = urlBase + section;
            console.log(apiUrl);
        // call data
        return $http.get(apiUrl).then(function(data) {
            
            // return data
            return data.data;
            
        });
		
    };
	
	// detail
	dataService.getDetail = function(section, id) {
        
        var apiUrl = urlBase + section + "/" + id;
            console.log(apiUrl);
        // call data
        return $http.get(apiUrl).then(function(data) {
            
            // return data
            return data.data;
            
        });
		
    };
    
    
    
    
    
    
    // add nav
    dataService.addNav = function(name, navigation, label, description) {

        // set up a valid object
        var data = {
            "name": name,
            "description": description,
            "navigation": navigation,
            "label": label
        };

        // post it real good
        return $http.post(urlBase + "section", data);

    };
    
    
    
    
    
    
    
    // edit nav
    dataService.editNav = function(id, name, navigation, label, description) {

        // set up a valid object
        var data = {
            "name": name,
            "description": description,
            "navigation": navigation,
            "label": label
        };

        // post it real good
        return $http.put(urlBase + "section/" + id, data);

    };
    
    
    return dataService;

}]);