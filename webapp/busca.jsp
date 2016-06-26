<%-- 
    Document   : busca
    Created on : 26/05/2016, 16:43:18
    Author     : Marcos Filho
--%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Pagina de busca</title>
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <script src="js/script.js"></script>        
    </head>
    
    <body>
        <div id="container">
            
            <div id="menu">
                <div align="center">
                    <a href="#" class="active">Busca</a>
                    <a href="catalogo.jsp">Catalogação</a>
                </div>
            </div>
            
            <br><br>
          
            <div id="msg" align="center">
                
            </div>
            
            <div align="center">
                <form id="formBusca" method="post" action="controller" name="formBusca">
                    <input type="hidden" name="tratador" value="Trabalho1.TratadorBusca"/>
                    <input type="hidden" name="botaoEscolhido"/>
                    <select name="tipo">
                        <option name="optBusca1" value="1" selected>Titulo</option>
                        <option name="optBusca2" value="0">Autor</option>
                    </select>
                    <input type="text" name="query" value="${sessionScope.query}" placeholder="Titulo Ex: Calculo ; Autor Ex: Stewart"/>
                    <input type="button" name="btnEnviar" value="Buscar" onclick="submitForm('formBusca','Buscar');"/>
                </form>
            </div>
            
            <br>
            
            
            <div align="center">
                
                <form id="formResultado" align="center" name="formResultado"  method="post">
                     <input type="hidden" name="tratador" value="Trabalho1.TratadorBusca"/>
                     <input type="hidden" name="botaoEscolhido"/>
                     <input type="hidden" name="idEscolhido"/>
                     <div id="info" align="center">
                         Registros encontrados: ${sessionScope.responseBuscaLen}
                     </div>
                    <c:forEach var="livro" items="${sessionScope.pageResult}">
                            <fieldset>
                                <legend align="center">
                                    <span id="tag">Titulo:</span> ${livro.getNome()}
                                </legend>
                                   <span id="tag">Autoria:</span>${livro.getAutor()} <br>
                                <input type="button" value="Alterar" onclick="submitFormResultado('formResultado','catalogo','${livro.getId()}')" />
                            </fieldset>
                    </c:forEach>   
                </form>
                     
                <div id="footer" align="center">
                        <form id="formPG" name="formResultado" method="post">
                            <input type="hidden" name="tratador" value="Trabalho1.TratadorBusca"/>
                            <input type="hidden" name="idPagina"/>
                            <input type="hidden" name="botaoEscolhido"/>
                            <br>
                            <c:forEach var="page" items="${sessionScope.pages}">
                                <a href="#" onclick="submitFormPages('formPG','pagina',${page});" >${page+1}</a>
                            </c:forEach>
                        </form>
                </div>     
                <br>
                
            </div>
            
            
            <br>      
        </div>



    </body>
</html>
