

function cargarVista() {
    document.getElementById("load").style.display = "none";
}

function EnviarMail() {
    var subject = $("#asunto").val();
    var cuerpo = $("#consulta").val();
    var link = "mailto:gpsicopedia@gmail.com" + "?subject=" + subject + "&body=" + cuerpo;
    window.location.href = link;
    $("#asunto").val("");
    $("#consulta").val("");  
}

function validarAsunto() {
    var asunto = document.getElementById("asunto").value;
    var mensaje = document.getElementById("asuntoMsj");
    if (asunto != "") {
        mensaje.style.display = "none";
        mensaje.innerText = "";
        EnviarMail();
    } else {
        mensaje.innerText = "El asunto es obligatorio";
        mensaje.style.display = "block";
    }
}

