$(document).ready(function () {
    //busqueda y carga de las secciones del menu desplegable del archivo Secciones.txt 
    var metodo = 'files/download';
    var datos = JSON.stringify({
        'path': "/Secciones.txt",
    });

    ConsultaSecciones(metodo, datos);
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
            $("#TituloArticulo").html("");
            //proceso los articulos
            for (var i = 0, len = resp.entries.length; i < len; i++) {
                //verifico si el articulo es correspondiente a la seccion seleccionada
                if (resp.entries[i].name.indexOf(Seccion) != -1) { 
                    var nombreArticulo = resp.entries[i].name.substring(resp.entries[i].name.lastIndexOf("-") +1).replace(".txt","");
                    Contenedor.innerHTML += "<div><a href=\"VistaComun.html?art=" + nombreArticulo +"\">" + nombreArticulo + "</a></div>";
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