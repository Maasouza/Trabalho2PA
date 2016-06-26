<%-- 
    Document   : busca
    Created on : 26/05/2016, 16:43:18
    Author     : Marcos Filho
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Pagina de catalogo</title>
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <script src="js/script.js"></script>
    </head>
    
    <body>
        <div id="container" style="margin-top:10%;">
            
            <div id="menu">
                <div align="center">
                    <a href="busca.jsp" >Busca</a>
                    <a href="#" class="active">Catalogação</a>
                </div>
            </div>
            
            <br><br>
          
            <div align="center">
                <form id="formCat" method="post" action="controller" name="formCat">
                    <input type="hidden" name="tratador" value="Trabalho1.TratadorCatalogo"/>
                    <input type="hidden" name="botaoEscolhido"/>
                    <input type="text" value="${sessionScope.idC}" readonly name="id" id="idInput" placeholder="ID"/><br><br>
                    <input type="text" name="titulo" value="${sessionScope.tituloC}" placeholder="Titulo"/>
                    <br><br>
                    <input type="text"  value="${sessionScope.autorC}"  name="autor" placeholder="Autor"/>
                    <br>
                    <input type="button" name="btnAdcionar" value="Adcionar" onclick="submitForm('formCat','Adcionar')"/>
                    <input type="button" name="btnDeletar" value="Deletar" onclick="submitForm('formCat','Deletar')"/><br>
                    <input type="button" name="btnAlterar" value="Alterar" onclick="submitForm('formCat','Alterar')"/>
                    <input type="button" name="btnLimpar" value="Limpar" onclick="submitForm('formCat','Limpar')"/>
                    <br>
                    <input type="button" name="btnVoltar" value="Voltar" onclick="submitForm('formCat','Voltar')"/>
                </form>
            </div>
            <div align="center">
                <br>
                <span>${sessionScope.infoCatalogo}</span>
            </div>
            
            <br>
            
                
        </div>
    </body>
</html>
