$(document).ready(function () {

    //obtengo cual es el articulo a mostrar
    var param = location.search.split("=");
    //var articulo = param[1].replace("%20", "").replace("%20", " ");
    articulo = param[1].replace(/%20/g, " ");
    $("#TituloArticulo").append(articulo);

  //Buscar articulo
    Buscar(articulo);
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
            $("#ContenidoPrincipal").append(request.responseText);
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


