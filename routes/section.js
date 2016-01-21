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
        var query = client.query("create or replace function query_table(_tbl regclass)returns table(name text,id integer)as $body$ begin return query execute'select name, id from '||_tbl;end;$body$ language plpgsql;select db.label as nav,db.type as type,array_agg(row_to_json(r))as items from db db,query_table(db.name)as r where navigation=true group by db.label,db.type;");
        
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
        client.query("insert into db(modified,created,name,description,navigation,label) values(now(),now(),'" + postData.name + "','" + postData.description + "'," + postData.navigation + ",'" + postData.label + "')");

        // SQL Query > Select Data
        var query = client.query("select * from db order by id desc");

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
        client.query("update db set name='" + putData.name + "',description='" + putData.description + "',navigation='" + putData.navigation + "',label= '" + putData.label + "' where id = " + id + ";");

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM db ORDER BY id desc");

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