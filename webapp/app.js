var express = require('express');
var bodyParser = require('body-parser')
var pg = require('pg');

var conString = "postgres://postgres:marcos@localhost:5432/bibliopdf";
	
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.post('/buscar', function (req, res) {
  
  var result=[];
  var data = req.body;
  var sql = "SELECT * FROM dadoscatalogo;";
  var valores = [];
  count = 1;
 
 // if(data.patrimonio!=null){
 //  	if(data.patrimonio!=""){
 //  		query += "where patrimonio like $1";
 //  	}
 //  }else{
	//  if(data.titulo != null){
	//  	query +=" where titulo = $1"
	//  	valores.append(data.titulo[0])
	//  	count++;
	//  }
	//  if(data.autoria != null){
	//  	if(count > 1){
	//  		query+=" "+data.autoria[1]+" autoria like $"+count;
	//  	}else{
	//  		query+=" where autoria like $1"
	//  	}
	//  	count++;
	//  }
	//  if(data.veiculo != null){
	//  	if(count > 1){
	//  		query+=" "+data.veiculo[1]+" veiculo like $"+count;
	//  	}else{
	//  		query+=" where veiculo like $1"	
	//  	}
	//  	count++;
	//  }
 //  }

  console.log(sql);
  pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
        }

        // SQL Query > Insert Data
        var query = client.query(sql);

        // Stream results back one row at a time
        query.on('row', function(row) {
            result.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            res.send(result);
        });


    });

  console.log("resultado"+result);


});


app.post('/deletar',function(req,res) {
	var data = req.body;
	var json=[];

	res.send(json);
});


app.listen(3000, function () {
  console.log('listening on port 3000!');
});

