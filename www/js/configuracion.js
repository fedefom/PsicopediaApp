function cargarDatos() {
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
        edad.value = results.rows.item(0).edad;
        $(function () {
            var temp = results.rows.item(0).genero;
            $("#genero").val(temp);
        });

    }
}

function updateDatos() {
    var db = window.openDatabase("Psicopedia", "1.0", "Psicopedia Demo", 200000);
    db.transaction(updateDB);
    return true;
}

function updateDB(tx) {
    var edad = document.getElementById("edad").value;
    var genero = document.getElementById("genero").value;
    tx.executeSql('UPDATE USUARIO SET EDAD = ' + edad + ' , genero = "' + genero + '" WHERE ID = 1');
}