var express = require('express');
var bodyParser = require('body-parser')
var pg = require('pg');


var user = "postgres";
var pass = "marcos";
var db = "bibliopdf";

var conString = "postgres://"+user+":"+pass+"@localhost:5432/"+db;
	
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
 
 var types = pg.types;//arrumando o timestamp
 types.setTypeParser(1114, function(stringValue) {
 	 return stringValue;
 });

{
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

}
  pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
        }

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


});

app.post('/inserir',function(req,res){
	var result={};
	var data = req.body;
	sql = "INSERT INTO dadoscatalogo(titulo,autoria,veiculo,data_publicacao) values ($1,$2,$3,to_timestamp($4,'YYYY-MM-DD')) returning patrimonio;";
	  pg.connect(conString, function(err, client, done) {
	        // Handle connection errors
	        if(err) {
	          done();
	          console.log(err);
	          result.msg = "Erro ao criar novo registro !";
	          res.send(result);
	        }

	        //inserir na tabela principal
	        var query = client.query(sql,[data.titulo,data.autoria,data.veiculo,data.dpub]);
	        query.on('row',function(row){
	        	result.patrimonio = row.patrimonio;
	        });

	        // After all data is returned, close connection and return results
	        query.on('end', function() {
		        //inserir as palavras chaves
		        var chaves =  data.chave.split(' ');
		        sql = "INSERT INTO palavras_chave(palchave,patrimonio,palchavenormal) values (upper($1),$2,$3);";
		        
		        for(i=0;i<chaves.length;i++){
		        	client.query(sql,[chaves[i],result.patrimonio,result.chave]);
		    	}

		    	var autor = data.autoria.split(' ');

		        sql = "INSERT INTO palavrasautorianormal(palavra_autoria_normal,patrimonio) values (upper($1),$2)";
		        for(i=0;i<autor.length;i++){
		        	client.query(sql,[autor[i],result.patrimonio]);
		    	}

		    	var titulo = data.titulo.split(' ');

		        sql = "INSERT INTO palavrastitulonormal(palavra_titulo_normal,patrimonio) values (upper($1),$2);";
		        
		        for(i=0;i<titulo.length;i++){
		        	client.query(sql,[titulo[i],result.patrimonio]);
		    	}

		    	var veiculo = data.veiculo.split(' ');

		        sql = "INSERT INTO palavrasveiculonormal(palavra_veiculo_normal,patrimonio) values (upper($1),$2);";
		        
		        for(i=0;i<veiculo.length;i++){
		        	client.query(sql,[veiculo[i],result.patrimonio]);
		    	}

	            done();
	            result.msg = "Registro criado com sucesso!";
	            res.send(result);
	        });

	    });
});

app.post('/deletar',function(req,res) {
	var data = req.body;
	var json=[];
	var result = {};

	pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
        }

        // SQL Query > Delete Data
        query = client.query("DELETE FROM dadoscatalogo WHERE patrimonio=($1)", [data.patrimonio]);

  
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            res.send(result);
        });
    });
});

app.post('/update',function(req,res) {
	var data = req.body;
	var json=[];
	var result = {};

	pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
        }
 

	    query = client.query("UPDATE dadoscatalogo SET titulo = $1,autoria  = $2 , veiculo = $3 , data_publicacao = $4 WHERE patrimonio = $5", [data.titulo,data.autoria,data.veiculo,data.dpub,data.patrimonio]);

 

  
        // After all data is returned, close connection and return results
        query.on('end', function() {

        		client.query("DELETE FROM palavras_chave WHERE patrimonio=($1)", [data.patrimonio]);
                client.query("DELETE FROM palavrasautorianormal WHERE patrimonio=($1)", [data.patrimonio]);
                client.query("DELETE FROM palavrastitulonormal WHERE patrimonio=($1)", [data.patrimonio]);
                client.query("DELETE FROM palavrasveiculonormal WHERE patrimonio=($1)", [data.patrimonio]);



        		var chaves =  data.chave.split(' ');
		        sql = "INSERT INTO palavras_chave(palchave,patrimonio,palchavenormal) values (upper($1),$2,$3);";
		        
		        for(i=0;i<chaves.length;i++){
		        	client.query(sql,[chaves[i],data.patrimonio,result.chave]);
		    	}

		    	var autor = data.autoria.split(' ');

		        sql = "INSERT INTO palavrasautorianormal(palavra_autoria_normal,patrimonio) values (upper($1),$2)";
		        for(i=0;i<autor.length;i++){
		        	client.query(sql,[autor[i],data.patrimonio]);
		    	}

		    	var titulo = data.titulo.split(' ');

		        sql = "INSERT INTO palavrastitulonormal(palavra_titulo_normal,patrimonio) values (upper($1),$2);";
		        
		        for(i=0;i<titulo.length;i++){
		        	client.query(sql,[titulo[i],data.patrimonio]);
		    	}

		    	var veiculo = data.veiculo.split(' ');

		        sql = "INSERT INTO palavrasveiculonormal(palavra_veiculo_normal,patrimonio) values (upper($1),$2);";
		        
		        for(i=0;i<veiculo.length;i++){
		        	client.query(sql,[veiculo[i],data.patrimonio]);
		    	}

	            result.msg = "Registro alterado com sucesso!";

            done();
            result.patrimonio=data.patrimonio;
            result.suc = 1;
            res.send(result);
        });
    });
});


app.listen(3000, function () {
  console.log('listening on port 3000!');
});

