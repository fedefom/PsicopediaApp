
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

    };

    
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

//valida ingresos en modal
function validar() {
    var edad = document.getElementById("edad").value;
    var genero = document.getElementById("genero").value;
    var validarEdad;
    var validarGenero;


    if (edad == "Edad") {
        document.getElementById("edadMsj").innerText = "Debe completar la edad";
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

//// This is called with the results from from FB.getLoginStatus().
//function statusChangeCallback(response) {
//    console.log('statusChangeCallback');
//    console.log(response);
//    // The response object is returned with a status field that lets the
//    // app know the current login status of the person.
//    // Full docs on the response object can be found in the documentation
//    // for FB.getLoginStatus().
//    var page = document.getElementById("pagina").innerText;
//    console.log(page);
//    if (response.status === 'connected') {
//        // Logged into your app and Facebook.
//        window.location.href = page;
//        //testAPI();
//    } else {
//        page = document.getElementById("pagina").innerText = "completar.html";
//        console.log(page);
//    }
//}

//// This function is called when someone finishes with the Login
//// Button.  See the onlogin handler attached to it in the sample
//// code below.
//function checkLoginState() {
//    FB.getLoginStatus(function (response) {
//        statusChangeCallback(response);
//    });
//}

//window.fbAsyncInit = function () {
//    FB.init({
//        appId: '121460021782812',
//        status: true,
//        cookie: true,  // enable cookies to allow the server to access the session
//        xfbml: true,  // parse social plugins on this page
//        version: 'v2.9' // use graph api version 2.8
//    });

//    // Now that we've initialized the JavaScript SDK, we call
//    // FB.getLoginStatus().  This function gets the state of the
//    // person visiting this page and can return one of three states to
//    // the callback you provide.  They can be:
//    //
//    // 1. Logged into your app ('connected')
//    // 2. Logged into Facebook, but not your app ('not_authorized')
//    // 3. Not logged into Facebook and can't tell if they are logged into
//    //    your app or not.
//    //
//    // These three cases are handled in the callback function.

//    FB.getLoginStatus(function (response) {
//        statusChangeCallback(response);
//    });

//};

//// Here we run a very simple test of the Graph API after login is
//// successful.  See statusChangeCallback() for when this call is made.
//function testAPI() {
//    console.log('Welcome!  Fetching your information.... ');
//    FB.api('/me', { fields: 'name,email,age_range' }, function (response) {
//        console.log(response);
//        console.log('Successful login for: ' + response.name);
//        console.log('Successful login for: ' + response.email);
//        console.log('Successful login for: ' + response.age_range.min);
        
//        //FEDE COMPLETAR PARA QUE GRABE EL RANGO DE EDAD EN EL GA
//        window.location.href = "welcome.html";
//    });
//}

//function facebookLogin() {
//    FB.login(function (response) {
//        if (response.status === 'connected') {
//            // Logged into your app and Facebook.
//            var page = document.getElementById("pagina").innerText;
//            console.log(page);
//            window.location.href = page;
//        } else {
//            // The person is not logged into this app or we are unable to tell. 
//        }
//    }, { scope: 'public_profile,email' });
//}



