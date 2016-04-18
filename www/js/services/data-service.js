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
	
	// files
    dataService.getFiles = function() {
        
        var apiUrl = urlBase + "file";
            
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
    dataService.getSection = function(section, table) {
        
        var apiUrl = urlBase + section;
        
        // set up query params to use in route
        var data = {
            params: { table: table}
        };
        
        // call data
        return $http.get(apiUrl, data).then(function(data) {
            
            // return data
            return data.data;
            
        });
		
    };
	
	// detail
	dataService.getDetail = function(section, id) {
        
        var apiUrl = urlBase + section + "/" + id;
            
        // call data
        return $http.get(apiUrl).then(function(data) {
            
            // return data
            return data.data;
            
        });
		
    };
    
    // tables
	dataService.getTables = function(table, id) {
        
        var apiUrl = urlBase + "db";
        console.log(table);
        // check table
		if (table != null) {
			
			// check id
			if (id != null) {
            
				apiUrl += "/" + table + "/" + id;

			} else {
			
				apiUrl += "/" + table;
				
			};
			
		};
            console.log(apiUrl);
        // call data
        return $http.get(apiUrl).then(function(data) {
            
            // return data
            return data.data;
            
        });
		
    };
    
    
    
    
    
    
    // add item
    dataService.addItem = function(name) {

        // set up a valid object
        var data = {
            "name": name
        };

        return $http.post(urlBase + "item", data);

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

        return $http.post(urlBase + "section", data);

    };
	
	// add file
    dataService.addFile = function(files) {
		
		// set up form data object
		var fd = new FormData();
		fd.append("file", files[0]);
		console.log(files[0]);
		// settings
		var configs = {
			transformRequest: angular.identity,
			headers: {"Content-Type": undefined}
		}

        return $http.post(urlBase + "file", fd, configs);

    };
    
    
    
    
    
    
    
    // edit nav
    dataService.editNav = function(form, id) {
        
        // set up a valid object
        var data = {};
        
        angular.forEach(form.fields, function(value, key) {
            
            // check for id
            if (value.label != 'id') {
            
                // add to data object
                data[value.label] = value.value;
                
            };
            
        });

        return $http.put(urlBase + "section/" + id, data);

    };
    
	
	
	
	
	
	// remove item
    dataService.removeItem = function(id) {

        return $http.delete(urlBase + "item/" + id);

    };
    
    return dataService;

}]);