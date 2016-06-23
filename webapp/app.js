var express = require('express');
var bodyParser = require('body-parser')
var pg = require('pg');

var conString = "postgres://postgres:marcos@localhost:5432/bibliopdf";

var client = new pg.Client(conString);

client.connect();


var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.post('/buscar', function (req, res) {
  
  var data = req.body;
  var json=[];

  
  
  res.send(json);

});


app.post('/deletar',function(req,res) {
	var data = req.body;
	var json=[];

	res.send(json);
}



app.listen(3000, function () {
  console.log('listening on port 3000!');
});

