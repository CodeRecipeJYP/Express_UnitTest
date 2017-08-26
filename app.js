'use strict';

var express = require("express");
var jsonParser = require("body-parser").json;
var logger = require("morgan");
var app = express();


app.use(logger("dev"));
app.use(jsonParser());


var mongoose = require('mongoose');
var DB_URI = require('./consts/config').DB_URI;
mongoose.connect(DB_URI("test", "jibcon-account-shard-0"),
    {
        useMongoClient: true
        /* other options */
    }
);
var db = mongoose.connection;

db.on("error", function(err) {
    console.error("connection error:", err);
});

db.once("open", function() {
    console.log("db connection successful");
});



var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Express server is listening on port", port);
});