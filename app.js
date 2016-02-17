var express = require("express");
var bodyParser = require("body-parser");
var app = express();

// set up the request body parser
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// backend API
app.use(require("./routes/database"));
app.use(require("./routes/item"));
app.use(require("./routes/file"));
app.use(require("./routes/section"));
app.use(require("./routes/app"));
app.use(require("./routes/stack"));

// static front end
app.use("/", express.static(__dirname + "/www"));

var server = app.listen(3005, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('app listening at http://%s:%s', host, port);
    
});

module.exports = app;