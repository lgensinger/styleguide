// settings
var express = require("express");
var router = express.Router();
var pg = require("pg");
var conString = process.env.DATABASE_URL || "postgres://postgres:iamsocool@localhost/postgres";
var baseUrl = "/api/db";

/*******************************/
/************* GET *************/
/*******************************/

// return fields in a table
router.get(baseUrl + "/:table", function(req, res) {
    console.log("------------ fields from one table ---------------")
    var results = [];
    
    // get a postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        
        var id = req.params.id;
		var table = req.params.table;

        // SQL query
		var query = client.query("select t.name,t.navigation,t.label,t.description,array_agg(row_to_json(r)) as data from nav t,(select f.* from field f) r group by t.name,t.navigation,t.label,t.description;");
        
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
    
});

// return tables
router.get(baseUrl, function(req, res) {
    console.log("------------ all tables ---------------")
    var results = [];
    
    // get a postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        
        // SQL query
        var query = client.query("select * from db where edit = true;");
        
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
    
});

// expose to node
module.exports = router;