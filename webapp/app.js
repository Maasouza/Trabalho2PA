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

 var types = pg.types;//arrumando o timestamp
 types.setTypeParser(1114, function(stringValue) {
 	 return stringValue;
 });

app.post('/buscar', function (req, res) {
  
  var result=[];
  var data = req.body;
  var valores = [];
  countAND = 1;
  countOr = 1;
  count = 1;
 
  var sqlBase = "SELECT * FROM dadoscatalogo ";
  var sqlAND = " WHERE ";
  var linker = " AND ";
  var sqlOR = " ";
  var sql = "";




	if(data.patrimonio!=null){
	  	if(data.patrimonio!=""){
	  		sqlBase += " where patrimonio = to_number($1,'9999999')";
	  		valores.push(data.patrimonio);
	  		sql = sqlBase;
	 	}
    }else{
    	if(data.titulo!=null){

    		if(data.titulo[1]=="OU"){
    				sqlOR +="( titulo like $"+count+" ";
    				count++;
    				countOr++;
    				valores.push(data.titulo[0]);
    		}else{
    				sqlAND +="( titulo like $"+count+" ";
    				count++;
    				countAND++;
    				valores.push(data.titulo[0]);
    		}
    	}

    	if(data.autor!=null){
    		if(data.autor[1]=="OU"){
    			if(countOr==1){
    				sqlOR +="( autoria like $"+count+" ";
    				valores.push(data.autor[0]);
    			}else{
    				sqlOR +="OR autoria like $"+count+" ";
    				valores.push(data.autor[0]);
    			}
    			count++;
    			countOr++;
    		}else{
    			if(countAND==1){
    				sqlAND +="( autoria like $"+count+" ";
    				valores.push(data.autor[0]);
    			}else{
    				sqlAND +="AND autoria like $"+count+" ";
    				valores.push(data.autor[0]);
    			}
     				count++;
    				countAND++;   				
    		}
    	}

    	if(data.veiculo!=null){

    		if(data.veiculo[1]=="OU"){
    			if(countOr==1){
    				sqlOR +="( veiculo like $"+count+" ";
    				valores.push(data.veiculo[0]);
    			}else{
    				sqlOR +="OR veiculo like $"+count+" ";
    				valores.push(data.veiculo[0]);
    			}
    			count++;
    			countOr++;
    		}else{
    			if(countAND==1){
    				sqlAND +="( veiculo like $"+count+" ";
    				valores.push(data.veiculo[0]);
    			}else{
    				sqlAND +="AND veiculo like $"+count+" ";
    				valores.push(data.veiculo[0]);
    			}
     				count++;
    				countAND++;   				
    		}
    	}

    	if(data.data!=null){

    		if(data.data[2]=="OU"){
    			if(countOr==1){
    				if(data.data[0]!=""){
    					sqlOR +="( data_publicacao > to_timestamp($"+count+",'YYYY-MM-DD') ";
    					valores.push(data.data[0]);
    					count++;
    					    				countOr++;

    				}
    				if(data.data[1]!=""){
    					sqlOR +="( data_publicacao < to_timestamp($"+count+",'YYYY-MM-DD') ";
    					valores.push(data.data[1]);
    					count++;
    					    				countOr++;

    				}

    			}else{
    				if(data.data[0]!=""){
    					sqlOR +="OR data_publicacao > to_timestamp($"+count+",'YYYY-MM-DD') ";
    					valores.push(data.data[0]);
    					count++;
    					    				countOr++;

    				}
    				if(data.data[1]!=""){
    					sqlOR +="OR data_publicacao < to_timestamp($"+count+",'YYYY-MM-DD') ";
    					valores.push(data.data[1]);
    					count++;
    					    				countOr++;

    				}
    			}
    		}else{
    			if(countAND==1){
    				if(data.data[0]!=""){
    					sqlAND +="( data_publicacao > to_timestamp($"+count+",'YYYY-MM-DD') ";
    					valores.push(data.data[0]);
    					count++;
    					    				countAND++;

    				}
    				if(data.data[1]!=""){
    					sqlAND +="( data_publicacao < to_timestamp($"+count+",'YYYY-MM-DD') ";
    					valores.push(data.data[1]);
    					count++;
    					    				countAND++;

    				}

    			}else{
    				if(data.data[0]!=""){
    					sqlAND +="AND data_publicacao > to_timestamp($"+count+",'YYYY-MM-DD') ";
    					valores.push(data.data[0]);
    					count++;
    					    				countAND++;

    				}
    				if(data.data[1]!=""){
    					sqlAND +="AND data_publicacao < to_timestamp($"+count+",'YYYY-MM-DD') ";
    					valores.push(data.data[1]);
    					count++;
    					    				countAND++;

    				}
    			}  				
    		}
    	}
    }

    if(countAND>1 && countOr>1){
    	sqlAND+=")";
    	sqlOR+=")"
    	sql = sqlBase + sqlAND + linker + sqlOR ;
    }

    if(countAND>1 && countOr==1){
    	sqlAND+=")";
    	sql = sqlBase + sqlAND ;
    }

    if(countAND==1 && countOr>1){
    	sqlOR+=")"
    	sql = sqlBase +"WHERE" + sqlOR ;
    }

    if(countAND==1 && countOr==1){

    	sql = sqlBase ;
    }

    console.log(sql);

   


  pg.connect(conString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
        }
        if(valores.length>0){
	        var query = client.query(sql,valores);
	    	
	        // Stream results back one row at a time
	        query.on('row', function(row) {
	            result.push(row);
	        });

	        // After all data is returned, close connection and return results
	        query.on('end', function() {
	            done();
	            res.send(result);
	        });
    	}else{

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
	    }

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
		        	client.query(sql,[chaves[i],result.patrimonio,data.chave]);
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

