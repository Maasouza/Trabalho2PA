var result;

window.onload = function(){
    initInputs();
    initBTN();
    gerenciarCheckBox();
        result="";
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
    buscaRequest(json,mostrarResultado,"buscar");
};

var buscaRequest = function(data,func,type){

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

var mostrarResultado = function(json){
   
    result = json;
    
    for(i = 0;i< result.length ; i++){
        $("#dResultado").append(criarObjeto(result[i].oi,"oi"+i));
        $("#dResultado").append(criarObjeto(result[i].mundo,"mundo"+i));
    }

};

var criarObjeto = function(texto,id){
    return "<input type='text' id='"+id+"' value='"+texto+"'/>"
}