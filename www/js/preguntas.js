$(document).ready(function () {
    ObtenerPreguntas("00");
});


function ObtenerPreguntas(codigo) {
    var metodo = 'files/download';
    var datos = JSON.stringify({
        'path': "/Preguntas/preguntas.txt",
    });

    var access_token = 'hD6ZEfkGwbAAAAAAAAAAB64YKvNF4qCgA026Y9mqceeaE4jdtPcFAL_vCZZU4zmy';
    var request = new XMLHttpRequest();

    request.open('POST', 'https://content.dropboxapi.com/2/' + metodo, false);
    request.setRequestHeader('Authorization', 'Bearer ' + access_token);
    request.setRequestHeader('Dropbox-API-Arg', datos);
    request.overrideMimeType('text/xml; charset=iso-8859-1')
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            //resp obtengo las secciones
            var resp = request.responseText;
            var preguntas = resp.split(";");
            $("#ContenidoPrincipal").html("");
            var elem = document.getElementById("ContenidoPrincipal");
            var azul = true;

            
            for (var i = 0, len = preguntas.length; i < len; i++) {
                if (codigo.length < 3) {
                    if (preguntas[i].indexOf(codigo) != -1) {
                        var pregunta = preguntas[i].split("-");
                        elem.innerHTML += '<button class="btn btn-info btn-block preguntas-btn" codigo="' + pregunta[0].trim() + '"  onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</button>';
                        //if (azul) {
                        //    elem.innerHTML += '<div class="preguntasAzul" codigo="' + pregunta[0].trim() + '"  onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                        //    azul = false;
                        //} else {
                        //    elem.innerHTML += '<div class="preguntasGris"codigo="' + pregunta[0].trim() + '" onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                        //    azul = true;
                        //}
                    }
                } else {
                    if (codigo.indexOf('0') != -1) {
                        if (codigo.charAt(1) == 0) {
                            codigo_Primer = codigo.charAt(0);
                            if (preguntas[i].trim().charAt(0) == codigo_Primer && preguntas[i].trim().charAt(1) != 0 && preguntas[i].indexOf("0") != -1) {
                                var pregunta = preguntas[i].split("-");
                                elem.innerHTML += '<button class="btn btn-info btn-block preguntas-btn" codigo="' + pregunta[0].trim() + '"  onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</button>';
                                //if (azul) {
                                //    elem.innerHTML += '<div class="preguntasAzul" codigo="' + pregunta[0].trim() + '"  onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                                //    azul = false;
                                //} else {
                                //    elem.innerHTML += '<div class="preguntasGris"codigo="' + pregunta[0].trim() + '" onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                                //    azul = true;
                                //}
                            }
                        } else {
                            codigo_Primer = codigo.charAt(0);
                            if (codigo.charAt(1) == 0) {
                                if (preguntas[i].trim().charAt(0) == codigo_Primer && preguntas[i].trim().charAt(1) != 0 && preguntas[i].indexOf("0") != -1) {
                                    var pregunta = preguntas[i].split("-");
                                    elem.innerHTML += '<button class="btn btn-info btn-block preguntas-btn" codigo="' + pregunta[0].trim() + '"  onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</button>';
                                    //if (azul) {
                                    //    elem.innerHTML += '<div class="preguntasAzul" codigo="' + pregunta[0].trim() + '"  onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                                    //    azul = false;
                                    //} else {
                                    //    elem.innerHTML += '<div class="preguntasGris"codigo="' + pregunta[0].trim() + '" onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                                    //    azul = true;
                                    //}
                                }
                            } else {
                                if (preguntas[i].trim().charAt(0) == codigo_Primer && preguntas[i].trim().charAt(1) != 0 && preguntas[i].trim().charAt(1) == codigo.charAt(1) && preguntas[i].indexOf("0") == -1) {
                                    var pregunta = preguntas[i].split("-");
                                    elem.innerHTML += '<button class="btn btn-info btn-block preguntas-btn" codigo="' + pregunta[0].trim() + '"  onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</button>';
                                    //if (azul) {
                                    //    elem.innerHTML += '<div class="preguntasAzul" codigo="' + pregunta[0].trim() + '"  onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                                    //    azul = false;
                                    //} else {
                                    //    elem.innerHTML += '<div class="preguntasGris"codigo="' + pregunta[0].trim() + '" onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                                    //    azul = true;
                                    //}
                                }
                            }
                        }

                }
            }
            }
            var contenido = $("#ContenidoPrincipal").html();
            if (contenido == "") {
                RedireccionarArticulo(codigo);
            }


        } else {
            // En caso de error
            console.log('No se pudo leer el archivo');
        }
    };

    request.onerror = function () {
        console.log('No existe el archivo');
    };

    request.send();
}



function RedireccionarArticulo(codigo) {

    var access_token = 'hD6ZEfkGwbAAAAAAAAAAB64YKvNF4qCgA026Y9mqceeaE4jdtPcFAL_vCZZU4zmy';
    var request = new XMLHttpRequest();
    var datos = JSON.stringify({
        'path': "/Articulos",

    });

    request.open('POST', 'https://api.dropboxapi.com/2/files/list_folder', false);
    request.setRequestHeader('Authorization', 'Bearer ' + access_token);
    request.setRequestHeader('Content-Type', 'application/json');
    request.overrideMimeType('text/xml; charset=iso-8859-1')
    request.onload = function () {
        var redireccion = "";
        if (request.status >= 200 && request.status < 400) {
            var resp = JSON.parse(request.responseText);
            for (var i = 0, len = resp.entries.length; i < len; i++) {
                if (resp.entries[i].name.indexOf(codigo) != -1){
                    //verifico si el articulo es correspondiente a la seccion seleccionada
                    if ( resp.entries[i].name.split("-").length == 4) {
                        var items = resp.entries[i].name.split("-");
                        var seccion = items[0];
                        var codArticulo = items[1];
                        var nombreArticulo = items[2];
                        var vista = items[3].replace(".txt", "");
                        //window.ga.trackView(nombreArticulo);
                        switch (vista.trim()) {
                            case "1":
                                redireccion = "Vista1.html?art=" + nombreArticulo + "&cod=" + codArticulo;
                                break;
                            case "2":
                                redireccion = "Vista2.html?art=" + nombreArticulo + "&cod=" + codArticulo;
                                break;
                            case "3":
                                redireccion = "Vista3.html?art=" + nombreArticulo + "&cod=" + codArticulo;
                                break;
                            default:
                                redireccion = "Vista1.html?art=" + nombreArticulo + "&cod=" + codArticulo;
                                break;
                        }

                        }
                }
            }
            if (redireccion != "") {
                Redireccionar(redireccion);
            } else {
                $("#ContenidoPrincipal").append("<p>No existe el articulo buscado.</p>")
            }


        } else {
            // En caso de error
            console.log('No se pudo leer el archivo');
        }
    };

    request.onerror = function () {
        console.log('No existe el archivo');
    };

    request.send(datos);



}
function Redireccionar(url) { 
    window.location= url
    //var Contenedor = document.getElementById("ContenidoPrincipal");
    //Contenedor.innerHTML += "<div><a id=\"redirect\"href=\"" + url + "\">este</a></div>";
    //document.getElementById('redirect').click();

}