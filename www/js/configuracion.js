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
