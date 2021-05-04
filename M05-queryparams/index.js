var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var logger = require("morgan");

app.use(logger("dev"));

app.get("/api/:nim/:nama", function (req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.send(req.params);
});

app.get("/api/cari", function (req, res, next) {
  var nama = req.query.nama;
  console.log("nama : ${nama}");
  var umur = req.query.umur;
  console.log("umur : ${umur}");
  res.send(umur);
});

app.listen(4000, function () {
  console.log("Server run");
});