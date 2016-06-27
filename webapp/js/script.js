var result;
var pagina;

window.onload = function(){
    initInputs();
    initBTN();
    gerenciarCheckBox();
        result="";
        pagina=0;
};


var mudarPagina = function(atual,proxima){
    $(atual).hide();
    $(proxima).fadeIn('slow');
};

var mostraInput = function(inputID){
	
    $(inputID).fadeIn('fast');

};

var esconderInput = function(inputID){

	$(inputID).hide();

};

var initInputs = function(){

	$("#buscaA").hide();
	$("#buscaT").hide();
	$("#buscaV").hide();
	$("#buscaC").hide();
	$("#fsData").hide();
};

var initBTN = function(){

	var btnEntrar = document.getElementById("btnEntrar");
   		
   	btnEntrar.addEventListener("click",
   		function(){
   			mudarPagina("#dLogin","#dBusca");
		}
	);
    
    var btnCadastro = document.getElementById("btnCadastro");
    	
    btnCadastro.addEventListener("click",
    	function(){
    		mudarPagina("#dLogin","#dCadastro");
    	}
    );

    var btnCadastrar = document.getElementById("btnCadastrar");
    	
    btnCadastrar.addEventListener("click",
    	function(){
    		
    	}
    );

    var btnVoltarC = document.getElementById("btnVoltarC");
    	
    btnVoltarC.addEventListener("click",
    	function(){
    		mudarPagina("#dCadastro","#dLogin");
    	}
    );

    var btnSair = document.getElementById("btnSair");

    btnSair.addEventListener("click",
    	function(){
    		mudarPagina("#dBusca","#dLogin");
    	}
    );

    var btnBuscar = document.getElementById("btnBuscar");

    btnBuscar.addEventListener("click",
    	function(){
    		mudarPagina("#dBusca","#dResultado");
                enviarBusca();
    	}
    );

    var btnCatalogar = document.getElementById("btnCatalogar");

    btnCatalogar.addEventListener("click", 
        function(){
            mudarPagina("#dBusca","#dCatalogacao");
        }
    );

    var btnLimparC = document.getElementById("btnLimparC");
    btnLimparC.addEventListener("click",
        function(){
            document.getElementById("formCatalogo").reset();
        }
    );

    var btnVoltarCat = document.getElementById("btnVoltarCat");
    btnVoltarCat.addEventListener("click",
        function () {
             mudarPagina("#dCatalogacao","#dBusca");
        }
    );

    var btnLimpar = document.getElementById("btnLimparBusca");

    btnLimpar.addEventListener("click", 
    	function(){
    		document.getElementById("formBusca").reset();
				esconderInput('#buscaT');
				esconderInput('#buscaV');
				esconderInput('#buscaA');
				esconderInput('#buscaC');
				esconderInput('#fsData');
				mostraInput("#buscaP");
    	}
    );


    var btnAdcionarC = document.getElementById("btnAdcionarC");
    btnAdcionarC.addEventListener("click",
        function(){
            enviarInserir();
        }
    )

    var btnDeletarC = document.getElementById("btnDeletarC");
    btnDeletarC.addEventListener("click", 
        function(){
            enviarDelete();
        }
    );

    var btnEditarC = document.getElementById("btnEditarC");
    btnEditarC.addEventListener("click", 
        function(){
            enviarUpdate();
        }
    );

    var btnVoltarR = document.getElementById("btnVoltarR");
    btnVoltarR.addEventListener("click",
        function(){
            mudarPagina("#dResultado","#dBusca");
            $(".pagina").remove();

    });
};

var gerenciarCheckBox = function(){
	var cbxP = document.getElementById("cbP");
	var cbxT = document.getElementById("cbT");
	var cbxV = document.getElementById("cbV");
	var cbxA = document.getElementById("cbA");
	var cbxC = document.getElementById("cbC");
	var cbxD = document.getElementById("cbD");

	cbxP.addEventListener("click",
		function(event){
			if(cbxP.checked){

				cbxT.checked=false;
				cbxV.checked=false;
				cbxA.checked=false;
				cbxC.checked=false;
				cbxD.checked=false;
				esconderInput('#buscaT');
				esconderInput('#buscaV');
				esconderInput('#buscaA');
				esconderInput('#buscaC');
				esconderInput('#fsData');
				mostraInput("#buscaP");

			}else{

				esconderInput('#buscaP');
		
			}		
		}
	);

	cbxT.addEventListener("click",
		function(event){
			if(cbxT.checked){

				cbxP.checked = false;
				mostraInput("#buscaT");
				esconderInput('#buscaP');

			}else{

				esconderInput('#buscaT');
		
			}		
		}
	);

	cbxV.addEventListener("click",
		function(event){
			if(cbxV.checked){

				cbxP.checked = false;
				mostraInput("#buscaV");
				esconderInput('#buscaP');

			}else{

				esconderInput('#buscaV');
		
			}		
		}
	);

	cbxA.addEventListener("click",
		function(event){
			if(cbxA.checked){

				cbxP.checked = false;
				mostraInput("#buscaA");
				esconderInput('#buscaP');

			}else{

				esconderInput('#buscaA');
		
			}		
		}
	);	

	cbxC.addEventListener("click",
		function(event){
			if(cbxC.checked){

				cbxP.checked = false;
				mostraInput("#buscaC");
				esconderInput('#buscaP');

			}else{

				esconderInput('#buscaC');
		
			}		
		}
	);

	cbxD.addEventListener("click",
		function(event){
			if(cbxD.checked){

				cbxP.checked = false;
				mostraInput("#fsData");
				esconderInput('#buscaP');

			}else{

				esconderInput('#fsData');
		
			}		
		}
	);
};

var enviarBusca = function (){
        
    var cbxP = document.getElementById("cbP");
    var cbxT = document.getElementById("cbT");
    var cbxV = document.getElementById("cbV");
    var cbxA = document.getElementById("cbA");
    var cbxC = document.getElementById("cbC");
    var cbxD = document.getElementById("cbD");
        
    var json={};
    
    if(cbxP.checked){
        var valor = document.getElementById("buscaP").value;
        json.patrimonio = valor;
    }else{
        if(cbxT.checked){
            var valor = document.getElementById("buscaT").value;
            var select = document.getElementById("selectT");
            var tipo = select.options[select.selectedIndex].text;
            json.titulo = [valor,tipo];
        }           
        if(cbxV.checked){
            var valor = document.getElementById("buscaV").value;
            var select = document.getElementById("selectV");
            var tipo = select.options[select.selectedIndex].text;
            json.veiculo = [valor,tipo];
        } 
        if(cbxA.checked){
            var valor = document.getElementById("buscaA").value;
            var select = document.getElementById("selectA");
            var tipo = select.options[select.selectedIndex].text;
            json.autor = [valor,tipo];
        } 
        if(cbxC.checked){
            var valor = document.getElementById("buscaC").value;
            var select = document.getElementById("selectP");
            var tipo = select.options[select.selectedIndex].text;
            json.chave = [valor,tipo];
        } 
        if(cbxD.checked){
            var valorI = document.getElementById("buscaDd").value;
            var valorF = document.getElementById("buscaDa").value;
            var select = document.getElementById("selectD");
            var tipo = select.options[select.selectedIndex].text;
            json.data = [valorI,valorF,tipo];
        } 
    }
    mandarRequest(json,mostrarResultado,"buscar");
};

var enviarInserir = function(){
    
    json={
        "titulo":document.getElementById("catalogoT").value,
        "autoria":document.getElementById("catalogoA").value,
        "veiculo":document.getElementById("catalogoV").value,
        "chave":document.getElementById("catalogoC").value,
        "dpub":document.getElementById("catalogoD").value
    }
    mandarRequest(json,mostrarMsg,"inserir");
}

var enviarDelete = function(){
    json={
        "patrimonio":document.getElementById("catalogoP").value
    }

    mandarRequest(json,mostrarMsg,"deletar");
}

var enviarUpdate = function(){
    json={
        "patrimonio":document.getElementById("catalogoP").value,
        "titulo":document.getElementById("catalogoT").value,
        "autoria":document.getElementById("catalogoA").value,
        "veiculo":document.getElementById("catalogoV").value,
        "chave":document.getElementById("catalogoC").value,
        "dpub":document.getElementById("catalogoD").value
    }
    mandarRequest(json,mostrarMsg,"update")
}

var mandarRequest = function(data,func,type){

    var objPedidoAJAX = new XMLHttpRequest();
    objPedidoAJAX.open("POST", "http://localhost:3000/"+type);
    objPedidoAJAX.setRequestHeader("Content-Type","application/json;charset=UTF-8");
    // Prepara recebimento da resposta: tipo da resposta JSON!
    objPedidoAJAX.responseType = 'json';
    objPedidoAJAX.onreadystatechange =
        function() {
            if(objPedidoAJAX.readyState===4 && objPedidoAJAX.status===200){
                func(objPedidoAJAX.response);
            }
        };
    // Envio do pedido
    
    objPedidoAJAX.send(JSON.stringify(data));

};

var mostrarMsg = function (json){
    if(json.patrimonio!=null){
        document.getElementById("catalogoP").value=json.patrimonio;
        if(json.suc){
            alert(json.msg)
        }
    }else{
        document.getElementById("formCatalogo").reset();
    }
}


var mostrarResultado = function(json){
   
    result = json;
    var nresults = 5;


    for(i=0;i<nresults;i++){
        $("#dpagina").append("<fieldset class='resultado'>"+
            "<legend>"+result[i].titulo+"</legend>"+
            "Patrimonio : "+result[i].patrimonio+
            "<br>Autoria : "+result[i].autoria+
            "<br>Veículo : "+result[i].veiculo+
            "<br>Data de publicação :"+result[i].data_publicacao+
            "<br><button onclick='editarRegistro("+i+")'>Editar</button>"+
            "</fieldset>");
    }


    if(result.length%nresults==0){

        for(i = 0 ; i <  Math.floor(result.length/nresults) ;i++){
            $("#dpaginas").append("<a class='pagina' onclick='selPagina("+ i +")' >"+(i+1)+"</a>");
        }

    }else{

        for(i = 0;i < Math.floor(result.length/nresults) + 1 ; i++ ){
            $("#dpaginas").append("<a class='pagina' onclick='selPagina("+ i +")' >"+(i+1)+"</a>");
        }

    }
};


var selPagina = function(pg){
    $(".resultado").remove();
    for(i=pg*5;i<Math.min((pg+1)*5,result.length);i++){
        $("#dpagina").append("<fieldset class='resultado'>"+
            "<legend>"+result[i].titulo+"</legend>"+
            "Patrimonio : "+result[i].patrimonio+
            "<br>Autoria : "+result[i].autoria+
            "<br>Veículo : "+result[i].veiculo+
            "<br>Data de publicação :"+result[i].data_publicacao+
            "<br><button onclick='editarRegistro("+i+")'>Editar</button>"+
            "</fieldset>");
    }

};