// settings
var express = require("express");
var router = express.Router();
var pg = require("pg");
var conString = process.env.DATABASE_URL || "postgres://postgres:iamsocool@localhost/postgres";
var baseUrl = "/api/section";

/*******************************/
/************* GET *************/
/*******************************/

// get all items
router.get(baseUrl, function(req, res) {
    console.log("********** all sections **************")
    var results = [];
    
    // get a postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
                
        // SQL query
        var query = client.query("select nav.label,nav.type,nav.id,nav.navigation,nav.name as table,array_agg(row_to_json(r)) as items from nav nav,query_table(nav.name) as r where navigation = true group by nav.label,nav.type,nav.id,nav.navigation,nav.name;");
        
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



/********************************/
/************* POST *************/
/********************************/

router.post(baseUrl, function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        
        var postData = req.body;

        // SQL Query > Insert Data
        client.query("insert into nav(modified,created,name,description,navigation,label) values(now(),now(),'" + postData.name + "','" + postData.description + "'," + postData.navigation + ",'" + postData.label + "')");

        // SQL Query > Select Data
        var query = client.query("select * from nav order by id desc");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });
    
});



/*******************************/
/************* PUT *************/
/*******************************/

router.put(baseUrl + "/:id", function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.id;

    var putData = req.body;

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("update nav set navigation='" + putData.navigation + "',label= '" + putData.label + "' where id = " + id + ";");

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM nav ORDER BY id desc");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });

});

// expose to node
module.exports = router;