function buscarDatos() {
    var db = window.openDatabase("Psicopedia", "1.0", "Psicopedia Demo", 200000);
    db.transaction(getDatosDB);
}

function getDatosDB(tx) {
    tx.executeSql('SELECT * FROM USUARIO', [], querySuccess, errorCB);
}

function querySuccess(tx, results) {
    var edad = document.getElementById("edad");
    var genero = document.getElementById("genero");
    if (results.rows.length != 0) {
        
        $(function () {
            var tempEdad = results.rows.item(0).edad;
            var tempGenero = results.rows.item(0).genero;
            $("#edad").val(tempEdad);
            $("#genero").val(tempGenero);
        });
    }
    document.getElementById("load").style.display = "none";
}

function updateDatos() {
    var db = window.openDatabase("Psicopedia", "1.0", "Psicopedia Demo", 200000);
    db.transaction(updateDB);
    return true;
}

function updateDB(tx) {
    var edad = document.getElementById("edad").value;
    var genero = document.getElementById("genero").value;
    tx.executeSql('UPDATE USUARIO SET EDAD = "' + edad + '" , genero = "' + genero + '" WHERE ID = 1');
}

//// This is called with the results from from FB.getLoginStatus().
//function statusChangeCallback(response) {
//    console.log('statusChangeCallback');
//    console.log(response);
//    if (response.status === 'connected') {
//        // Logged into your app and Facebook.
//        testAPI();
//        document.getElementById("divFace").style.display = "block";
//        document.getElementById("divDatos").style.display = "none";
//    } else {
//        buscarDatos();
//    }
//    validarLogeoAnonimo();
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
//    FB.api('/me', function (response) {
//        console.log('Successful login for: ' + response.name);
//        //FEDE COMPLETAR PARA QUE GRABE EL RANGO DE EDAD EN EL GA
//        var nombre = document.getElementById("name");
//        nombre.innerHTML = "<strong>Nombre: </strong>" + response.name;
//    });
//}

//function logout() {
//    FB.logout(function (response) {
//        // Person is now logged out
//        window.location.href = "index.html";
//    });
//}