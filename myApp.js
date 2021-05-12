var express = require('express');
var app = express();
console.log("Hello World")

app.get('/',function(req, res) {
  absolutePath = __dirname + "/views/index.html"

  res.sendFile(absolutePath)
})



































 module.exports = app;
