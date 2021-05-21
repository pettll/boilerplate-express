var express = require('express');
var bodyParser = require('body-parser')
var app = express();
console.log("Hello World")

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/',function(req, res) {
  res.sendFile(__dirname + "/views/index.html")
})


app.use("/public", express.static(__dirname + "/public"));

app.use(function(req, res, next) {
  console.log(req.method + " " +  req.path + " - " + req.ip);
  next();
})

app.get("/json", function(req, res) {
  let message = process.env.MESSAGE_STYLE === "uppercase" ? "HELLO JSON" : "Hello json";
  res.json({"message": message})
})

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();  
  next();
}, function(req, res) {
  res.send({time: req.time});
});



app.get('/:word/echo', function(req, res) {
  res.json({echo: req.params.word})
})

let nameHandler = function(req, res) {
  let name = {}
  let fname = req.query.first ? req.query.first : null;
  let lname =  req.query.last ? req.query.last : null;
  name.name = fname && lname ? fname + ' ' + lname : null;
  res.json(name)
}


let namePostHandler = function(req, res) {
  let name = {}
  let fname = req.body.userId ? req.body.userId : null;
  let lname =  req.body.bookId ? req.body.bookId : null;
  name.name = fname && lname ? fname + ' ' + lname : null;
  res.json(name)
}

app.route('/name').get(nameHandler).post(namePostHandler);






























 module.exports = app;
