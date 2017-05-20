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
            elem.innerHTML += '<div><a href="#"><label>' + Secciones[i] + '</label></a></div>';
    }
    elem.innerHTML += '<h3>Opciones</h3>';

}
