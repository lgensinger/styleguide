// settings
var express = require("express");
var router = express.Router();
var pg = require("pg");
var baseUrl = "/api/app";

/*******************************/
/************* GET *************/
/*******************************/

router.get(baseUrl, function(req, res) {
    
    var results = [];
    
    // get a postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        
        var start = req.params.start;
        var count = req.params.count;
		var category = req.params.category;
		var itemID = req.params.item;
        
        // SQL query
        var query = client.query("select * from app;");
        
        // stream results back one row at a time
        query.on("row", function(row) {
            results.push(row);
        });
        
        // close connection and return results
        query.on("end", function() {
            client.end();
            return res.json(results);
        });
        
        // handle errors
        if(err) {
            console.log(err);
        };
        
    });
    
})

// expose to node
module.exports = router;