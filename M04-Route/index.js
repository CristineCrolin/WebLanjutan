var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var logger = require("morgan");

app.use(logger("dev"));

app.use(express.static(__dirname + "/publik"));

app.get("/api/:nim/:nama", function (req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.send(req.params);
});

var data = bodyParser.urlencoded({ extended: false });
app.post("/api/datamhs", data, function (req, res) {
  res.send(req.body);
});

app.listen(4000, function () {
  console.log("Server run");
});