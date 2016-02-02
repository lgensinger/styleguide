angular.module("form-service", [])

.factory("formService", ["$http", function($http) {
	
    var urlBase="api/";
    var formService = {};

	// get the editable fields
    formService.getFields = function(section) {
        
        // format the objects to be more angular friendly
        // for ease of use in forms
        
        var disclude = "items, id";
        var keys = Object.keys(section);
        var fields = [];
        
        angular.forEach(keys, function(value, key) {
            
            // check against keys not wanted in forms
            if (disclude.match(value) == null && value != "$$hashKey") {
                
                var obj = {};
                obj["label"] = value;
                obj["value"] = section[value];
                
                // add to fields
                this.push(obj);
                
            };
            
        }, fields);
               
        // get info to pass to edit
        return { fields: fields, id: section.id };
		
    };
    
    return formService;

}]);