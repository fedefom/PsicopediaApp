﻿// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
//(function () {
//    "use strict";

//    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

//    function onDeviceReady() {
//        // Controlar la pausa de Cordova y reanudar eventos
//        document.addEventListener( 'pause', onPause.bind( this ), false );
//        document.addEventListener( 'resume', onResume.bind( this ), false );
        
<<<<<<< HEAD
        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.
        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    };

    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
})();

//Logueo con google
function onSignIn(googleUser) {
    var param = location.search.split("=");
    //var articulo = param[1].replace("%20", "").replace("%20", " ");
    if (param.length ==1) {

        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
        window.location.replace("welcome.html?google=true");
    } else {
        deslogueo = param[1].replace(/%20/g, " ");
        if (deslogueo == "false") {
            signOut();
        }
    }
}
//Deslogueo google
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
            console.log('User signed out.');
    });
    window.location.replace("index.html");
}


=======
//        // TODO: Cordova se ha cargado. Haga aquí las inicializaciones que necesiten Cordova.
//        var parentElement = document.getElementById('deviceready');
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//    };

//    function onPause() {
//        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
//    };

//    function onResume() {
//        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
//    };
//} )();


function elejirPais() {
    var pais = document.getElementById("pais").value;
    var provincia = document.getElementById("provincia");
    if (pais == "Argentina") {
        provincia.style.display = "block";
    } else {
        provincia.style.display = "none";
    }
}


function validar() {
    var edad = document.getElementById("edad").value;
    var genero = document.getElementById("genero").value;
    var pais = document.getElementById("pais").value;
    var provincia = document.getElementById("provincia").value;
    var validarEdad;
    var validarGenero;
    var validarPais;
    var validarProvincia;

    if (edad == 0) {
        document.getElementById("edadMsj").innerText = "Debe completar la edad";
        validarEdad = false;
    } else {
        document.getElementById("edadMsj").innerText = "";
        validarEdad = true;
    }
    if (genero == "Genero") {
        document.getElementById("generoMsj").innerText = "Debe elegir un genero";
        validarGenero = false;
    } else {
        document.getElementById("generoMsj").innerText = "";
        validarGenero = true;
    }
    if (pais == "Pais") {
        document.getElementById("paisMsj").innerText = "Debe elegir un pais";
        validarPais = false;
    } else {
        if (pais == "Argentina") {
            if (provincia == "Provincia") {
                document.getElementById("provinciaMsj").innerText = "Debe elegir una provincia";
                validarProvincia = false;
            } else {
                document.getElementById("provinciaMsj").innerText = "";
                validarProvincia = true;
            }
        }
        document.getElementById("paisMsj").innerText = "";
        validarPais = true;
    }

    if (validarEdad == true && validarGenero == true && validarPais && true) {
        if (pais == "Argentina") {
            if (validarProvincia == true) {
                return true;
            } else {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}



>>>>>>> 7dd7f0e937839ab1c3b2e08551cd30d4fc1bdb5f
