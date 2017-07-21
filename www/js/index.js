// Si quiere una introducción sobre la plantilla En blanco, vea la siguiente documentación:
// http://go.microsoft.com/fwlink/?LinkID=397704
// Para depurar código al cargar la página en cordova-simulate o en dispositivos o emuladores Android: inicie la aplicación, establezca puntos de interrupción 
// y ejecute "window.location.reload()" en la Consola de JavaScript.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Controlar la pausa de Cordova y reanudar eventos
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );

        var parentElement = document.getElementById('deviceready');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');


        //window.ga.startTrackerWithId('UA-100822752-1');
        //window.analytics.debugMode();
    };


    //$(document).ready(function () {
    //    jQuery.loadScript = function () {
    //        jQuery.ajax({
    //            url: 'https://apis.google.com/js/platform.js',
    //            dataType: 'script',
    //            success: function (result) {
    //                crearboton();
    //            },
    //            async: true
    //        });
    //    }

    //    var cont = document.getElementById('logueos');
    //    cont.innerHTML += '<div id="signInButton" class="g-signin2" data-onsuccess="onSignIn">este</div>';
    //});


    //function crearboton() {
       
    //}
    function onPause() {
        // TODO: esta aplicación se ha suspendido. Guarde el estado de la aplicación aquí.
    };

    function onResume() {
        // TODO: esta aplicación se ha reactivado. Restaure el estado de la aplicación aquí.
    };
})();

//function onGapiLoaded() {
//    auth = gapi.auth2.init({
//        client_id: "248584404173-10svpq42vv5ugqaig09mlj7gtukua0es.apps.googleusercontent.com",
//        scope: "gpsicopedia@gmail.com"

//    });

//    console.log("signed in: " + auth.isSignedIn.get());

//    auth.isSignedIn.listen(function (signedIn) { console.log("signedin: " + signedIn) });

//    gapi.signin2.render("signInButton", {
//        'width': 230,
//        'height': 50,
//        'longtitle': true,
//        'theme': 'dark',
//        'onsuccess': onSignIn
//    });
//}

//function onSignIn(googleUser) {
//    // Useful data for your client-side scripts:
//    var profile = googleUser.getBasicProfile();
//    console.log("Name: " + profile.getName());
//};





//////Logueo con google
//function onSignIn(googleUser) {
//    var param = location.search.split("=");
//    //var articulo = param[1].replace("%20", "").replace("%20", " ");
//    if (param.length ==1) {

//        var profile = googleUser.getBasicProfile();
//        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//        console.log('Name: ' + profile.getName());
//        console.log('Image URL: ' + profile.getImageUrl());
//        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
//        window.location.replace("welcome.html?google=true");
//    } else {
//        deslogueo = param[1].replace(/%20/g, " ");
//        if (deslogueo == "false") {
//            signOut();
//        }
//    }
//}
//////Deslogueo google
//function signOut() {
//    var auth2 = gapi.auth2.getAuthInstance();
//    auth2.signOut().then(function () {
//            console.log('User signed out.');
//    });
//    window.location.replace("index.html");
//}

function abrirModal() {
    activar();
    $(document).ready(function () {
        $("#modalBtn").click(function () {
            $("#myModal").modal();
        });
    });
}

function cerrarModal() {
    desactivar();
    $('#myModal').modal('hide');
}

function activar() {
    document.getElementById("edad").disabled = false;
    document.getElementById("genero").disabled = false;
}

function desactivar() {
    document.getElementById("edad").disabled = true;
    document.getElementById("genero").disabled = true;
}


function validar() {
    var edad = document.getElementById("edad").value;
    var genero = document.getElementById("genero").value;
    var validarEdad;
    var validarGenero;


    if (edad == "Edad") {
        document.getElementById("edadMsj").innerText = "Debe seleccionar un rango de edad";
        validarEdad = false;
    } else {
        document.getElementById("edadMsj").innerText = "";
        validarEdad = true;
    }
    if (genero == "Genero") {
        document.getElementById("generoMsj").innerText = "Debe seleccionar un genero";
        validarGenero = false;
    } else {
        document.getElementById("generoMsj").innerText = "";
        validarGenero = true;
    }

    if (validarEdad == true && validarGenero == true) {
        insertDB();
        ga('send', {
        hitType: 'screenview',
        screenName: '/' + edad,
        appName: edad
        });
        ga('send', {
            hitType: 'screenview',
            screenName: '/' + genero,
            appName: genero
        });
        cerrarModal();
        return true;

    } else {
        return false
    }
}

