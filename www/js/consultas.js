

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

function validarAsunto() {
    var asunto = document.getElementById("asunto").value;
    if (asunto != "") {
        EnviarMail();
    } else {
        alert("El asunto es obligatorio");
    }
}

