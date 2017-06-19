$(document).ready(function () {

    //obtengo cual es el articulo a mostrar
    var param = location.search.split("=");

    //obtengo el articulo
    articulo = param[1].replace(/%20/g, " ").replace("&cod", "").trim();

    //obtengo el articulo
    var codigo = param[2].replace(/%20/g, " ").trim();
    $("#TituloArticulo").append(articulo);

  //Buscar articulo
    Buscar(articulo);
    PegoImagen(codigo);

    //hago el hit para google analytics
    ga('send', {
        hitType: 'screenview',
        screenName: '/'+ articulo,
        appName: articulo
    });
});

function Buscar(articulo) {

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
       
            var resp = JSON.parse(request.responseText);
            for (var i = 0, len = resp.entries.length; i < len; i++) {
                //verifico si el articulo es correspondiente a la seccion seleccionada
                if (resp.entries[i].name.indexOf(articulo) != -1) {
                    var nombreArticulo = resp.entries[i].name;
                    LeoArticulo(nombreArticulo);
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

    request.send(datos);



}


function LeoArticulo(nombre) {

    var metodo = 'files/download';
    var datos = JSON.stringify({
        'path': "/Articulos/" + nombre,
    });
    var access_token = 'hD6ZEfkGwbAAAAAAAAAAB64YKvNF4qCgA026Y9mqceeaE4jdtPcFAL_vCZZU4zmy';
    var request = new XMLHttpRequest();

    request.open('POST', 'https://content.dropboxapi.com/2/' + metodo, false);
    request.setRequestHeader('Authorization', 'Bearer ' + access_token);
    request.setRequestHeader('Dropbox-API-Arg', datos);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var mitad = Math.trunc((request.responseText.length)/2);
            var primero = request.responseText.substring(0, request.responseText.indexOf(".", mitad)+1);
            var segundo = request.responseText.substring(request.responseText.indexOf(".", mitad)+1);
            $("#ContenidoPrincipal").append("<p id=\"contenido\">" + primero + "<p/>");
            $("#ContenidoPrincipal").append("<p id=\"contenido2\">" + segundo + "<p/>");
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



function PegoImagen(cod) {

    var imagenesArticulo;
        var access_token = 'hD6ZEfkGwbAAAAAAAAAAB64YKvNF4qCgA026Y9mqceeaE4jdtPcFAL_vCZZU4zmy';
        var request = new XMLHttpRequest();
        var datos = JSON.stringify({
            'path': "/Imagenes",

        });

        request.open('POST', 'https://api.dropboxapi.com/2/files/list_folder', false);
        request.setRequestHeader('Authorization', 'Bearer ' + access_token);
        request.setRequestHeader('Content-Type', 'application/json');

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                var primeraVez= true;
                var resp = JSON.parse(request.responseText);
                for (var i = 0, len = resp.entries.length; i < len; i++) {
                    //verifico si el articulo es correspondiente a la seccion seleccionada
                    if (resp.entries[i].name.indexOf(cod) != -1) {
                        insertar(resp.entries[i].name, primeraVez);
                        primeraVez= false;
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

        request.send(datos);


}

function insertar(nombre, primeraVez) {

    var datos = JSON.stringify({
        'path': "/Imagenes/" + nombre,
    });
    var access_token = 'hD6ZEfkGwbAAAAAAAAAAB64YKvNF4qCgA026Y9mqceeaE4jdtPcFAL_vCZZU4zmy';
    var request = new XMLHttpRequest();

    request.open('POST', 'https://api.dropboxapi.com/2/files/get_temporary_link', false);
    request.setRequestHeader('Authorization', 'Bearer ' + access_token);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var resp = JSON.parse(request.responseText);
            if (primeraVez) {
                $("#contenido").prepend("<img id=\"imagenPpal\" src=\"" + resp.link + "\"  />");
            } else {
                $("#contenido2").prepend("<div id=\"sec\"><img id=\"imagenSec\" src=\"" + resp.link + "\"  /></div>");
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
