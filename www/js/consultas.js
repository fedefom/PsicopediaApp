﻿// This is called with the results from from FB.getLoginStatus().
//function statusChangeCallback(response) {
//    console.log('statusChangeCallback');
//    console.log(response);
//    if (response.status === 'connected') {
//        // Logged into your app and Facebook.
//        testAPI();
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

function cargarVista() {
    document.getElementById("load").style.display = "none";
}
//obtengo el asunto, cuerpo.
function EnviarMail() {
    var subject = $("#asunto").val();
    var cuerpo = $("#consulta").val();
    var link = "mailto:gpsicopedia@gmail.com" + "?subject=" + subject + "&body=" + cuerpo;
    window.location.href = link;
    $("#asunto").val("");
    $("#consulta").val("");
}


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
//    FB.api('/me', { fields: 'email' }, function (response) {
//        console.log('Successful login for: ' + response.email);
//        document.getElementById("mail").value = response.email;
//    });
//}