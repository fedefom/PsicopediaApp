$(document).ready(function () {
    //busqueda y carga de las secciones del menu desplegable del archivo Secciones.txt 
    var metodo = 'files/download';
    var datos = JSON.stringify({
        'path': "/Secciones.txt",
    });

    ConsultaSecciones(metodo, datos);
    ObtenerPreguntas("00");
});

function openNav() {
    document.getElementById("mySidenav").style.width = "300px";
    var botoncerrar = document.getElementById("cerrarBtn");
    botoncerrar.addEventListener('click', closeNav);
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

document.addEventListener('DOMContentLoaded', bind_click);

function bind_click() {
    var botonAbrir = document.getElementById("AbrirBtn");
    botonAbrir.addEventListener('click', openNav);
}
//obtengo las secciones (realizo la consulta en busqueda de secciones(Secciones.txt))
function ConsultaSecciones(metodo, datos) {
    var access_token = 'hD6ZEfkGwbAAAAAAAAAAB64YKvNF4qCgA026Y9mqceeaE4jdtPcFAL_vCZZU4zmy';
    var request = new XMLHttpRequest();

    request.open('POST', 'https://content.dropboxapi.com/2/' + metodo, false);
    request.setRequestHeader('Authorization', 'Bearer ' + access_token);
    request.setRequestHeader('Dropbox-API-Arg', datos);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            //resp obtengo las secciones
            var resp = request.responseText;
            //Proceso los datos(Secciones)
            MostrarSecciones(resp);
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
                        if (azul) {
                            elem.innerHTML += '<div class="preguntasAzul" codigo="' + pregunta[0].trim() + '"  onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                            azul = false;
                        } else {
                            elem.innerHTML += '<div class="preguntasGris"codigo="' + pregunta[0].trim() + '" onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                            azul = true;
                        }
                    }
                } else {
                    if (codigo.charAt(1) == 0) {
                        codigo_Primer = codigo.charAt(0);
                        if (preguntas[i].trim().charAt(0) == codigo_Primer && preguntas[i].trim().charAt(1) != 0 && preguntas[i].indexOf("0") != -1) {
                            var pregunta = preguntas[i].split("-");
                            if (azul) {
                                elem.innerHTML += '<div class="preguntasAzul" codigo="' + pregunta[0].trim() + '"  onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                                azul = false;
                            } else {
                                elem.innerHTML += '<div class="preguntasGris"codigo="' + pregunta[0].trim() + '" onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                                azul = true;
                            }
                        }
                    } else {
                        codigo_Primer = codigo.charAt(0);
                        if (codigo.charAt(1) == 0) {
                            if (preguntas[i].trim().charAt(0) == codigo_Primer && preguntas[i].trim().charAt(1) != 0 && preguntas[i].indexOf("0") != -1) {
                                var pregunta = preguntas[i].split("-");
                                if (azul) {
                                    elem.innerHTML += '<div class="preguntasAzul" codigo="' + pregunta[0].trim() + '"  onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                                    azul = false;
                                } else {
                                    elem.innerHTML += '<div class="preguntasGris"codigo="' + pregunta[0].trim() + '" onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                                    azul = true;
                                }
                            }
                        } else {
                            if (preguntas[i].trim().charAt(0) == codigo_Primer && preguntas[i].trim().charAt(1) != 0 && preguntas[i].trim().charAt(1) == codigo.charAt(1) && preguntas[i].indexOf("0") == -1) {
                                var pregunta = preguntas[i].split("-");
                                if (azul) {
                                    elem.innerHTML += '<div class="preguntasAzul" codigo="' + pregunta[0].trim() + '"  onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                                    azul = false;
                                } else {
                                    elem.innerHTML += '<div class="preguntasGris"codigo="' + pregunta[0].trim() + '" onclick="ObtenerPreguntas(\'' + pregunta[0].trim() + '\')">' + pregunta[1].trim() + '</div>';
                                    azul = true;
                                }
                            }
                        }
                    }

                }
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


function MostrarSecciones(resp) {
    var elem = document.getElementById("mySidenav");
    var Secciones = resp.split(";");
    for (var i = 0, len = Secciones.length; i < len; i++) {
        if (Secciones[i]!="")
            elem.innerHTML += '<div onclick="MostrarListadoArticulosSegunSeccion(\'' + Secciones[i].trim() + '\')"><a><label>' + Secciones[i] + '</label></a></div>';
    }
    elem.innerHTML += '<h3>Opciones</h3>';

}
//Cuando se selecciona una seccion del menu desplegable, aca se obtiene los articulos relacionados a dicha seccion para mostrarla en el ContenedorPrincipal
function MostrarListadoArticulosSegunSeccion(Seccion) {

    var access_token = 'hD6ZEfkGwbAAAAAAAAAAB64YKvNF4qCgA026Y9mqceeaE4jdtPcFAL_vCZZU4zmy';
    var request = new XMLHttpRequest();
    var datos = JSON.stringify({
        'path': "/Articulos",

    });

    request.open('POST', 'https://api.dropboxapi.com/2/files/list_folder', false);
    request.setRequestHeader('Authorization', 'Bearer ' + access_token);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            //Limpio el contenedor principal
            $("#ContenidoPrincipal").html("");
            var Contenedor = document.getElementById("ContenidoPrincipal");
            Contenedor.innerHTML += "<div><H5>Articulos acerca de " + Seccion + "</H5></div>";
            var resp = JSON.parse(request.responseText);
            //proceso el nombre de cada articulo de la categoria seleccionada
            var HayContenido = false;
            //proceso los articulos
            for (var i = 0, len = resp.entries.length; i < len; i++) {
                //verifico si el articulo es correspondiente a la seccion seleccionada
                if (resp.entries[i].name.indexOf(Seccion) != -1) { 
                    var nombreArticulo = resp.entries[i].name.substring(resp.entries[i].name.lastIndexOf("-") +1).replace(".txt","");
                    Contenedor.innerHTML += "<div><p>" + nombreArticulo + "</p></div>";
                    HayContenido = true;
                }
            }
            //Verifico si se encontraron articulos, en caso contrario lo notifico
            if (!HayContenido) {
                Contenedor.innerHTML += "<div><p>No hay articulos relacionados</p></div>";
            }
            //minimizo el menu desplegable
            closeNav();
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