﻿$(document).ready(function () {
    var param = location.search.split("?");
    //busqueda y carga de prevencion
    var metodo = 'files/download';
    var datos = JSON.stringify({
        'path': "/quienesSomos.txt",
    });

    Obtener(metodo, datos);
});

//obtengo la informacion de quienes somos
function Obtener(metodo, datos) {
    var access_token = 'hD6ZEfkGwbAAAAAAAAAAB64YKvNF4qCgA026Y9mqceeaE4jdtPcFAL_vCZZU4zmy';
    var request = new XMLHttpRequest();

    request.open('POST', 'https://content.dropboxapi.com/2/' + metodo, false);
    request.setRequestHeader('Authorization', 'Bearer ' + access_token);
    request.setRequestHeader('Dropbox-API-Arg', datos);
    request.overrideMimeType('text/xml; charset=iso-8859-1')
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var resp = request.responseText.toString();
            resp = resp.replace(/\n/g, "</p><br /><p>")
            //resp = resp.replace("\n", "</p><br /><p>");
            var elem = document.getElementById("tablaQuienes");
            elem.innerHTML += '<p>' + resp + '</p>';
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
