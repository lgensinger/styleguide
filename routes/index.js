// settings
var express = require("express");
var router = express.Router();
var pg = require("pg");
var conString = process.env.DATABASE_URL || "postgres://postgres:iamsocool@localhost/postgres";

module.exports = router;