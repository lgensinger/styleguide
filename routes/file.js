// settings
var express = require("express");
var fs = require("fs");
var router = express.Router();
var pg = require("pg");
var conString = process.env.DATABASE_URL || "postgres://postgres:iamsocool@localhost/postgres";
var baseUrl = "/api/file";

/*******************************/
/************* GET *************/
/*******************************/

// get all files
router.get(baseUrl, function(req, res) {
    console.log("********** all files **************")
    var results = [];
    
    // get a postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
                
        // SQL query
        var query = client.query("select * from upload;");
        
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
console.log(req.files);
    var results = [];

    // Get a Postgres client from the connection pool
    /*pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }
        
		// files objects
        var postData = req.body;
		
		// loop through each file
		for (var i=0; i < postData.length; i++) {
			
			// SQL Query > Insert Data
        	client.query("insert into upload (modified,created,name) values(now(),now(), '" + postData[i].name + "');");
			
		};

        // SQL Query > Select Data
        var query = client.query("select * from upload");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });

    });*/
	
	// write file to local folder
	fs.writeFile("./www/assets/uploads/test.txt", "hello world", function(err) {
		if (err) return console.log(err);
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



/**********************************/
/************* DELETE *************/
/**********************************/

router.delete(baseUrl + "/:id", function(req, res) {

    var results = [];

    // Grab data from the URL parameters
    var id = req.params.id;

    // Get a Postgres client from the connection pool
    pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Delete Data
        client.query("DELETE FROM item WHERE id=" + id + ";");

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM item ORDER BY id ASC");

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