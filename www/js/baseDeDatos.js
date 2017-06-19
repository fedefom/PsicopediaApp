﻿// Crea laa table en la base de datos si no existe
function populateDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS USUARIO (id INTEGER PRIMARY KEY AUTOINCREMENT, edad, genero, pais, provincia)');
}

// Busca en la tabla de la base de datos
function queryDB(tx) {
    tx.executeSql('SELECT * FROM USUARIO', [], querySuccess);
}

// Se ejecuta si busco con exito en la base de datos
//
function querySuccess(tx, results) {

    if (results.rows.length != 0) { // Verifica si obtuvo resultado
        window.location.href = "welcome.html"; // Manda directamente al welcome.html
    }

}

// Transaction success callback
//
function successCB() {
    alert("success!");
}

// Transaction error callback
//
function errorCB(err) {
    alert("Error processing SQL: " + err.code);
}

//function createDB() {
//    var db = window.openDatabase("Psicopedia", "1.0", "Psicopedia Demo", 200000);
//    db.transaction(populateDB, errorCB, successCB);
//}

// Inserta en la base de datos
function insertSql(tx) {
    var edad = document.getElementById("edad").value;
    var genero = document.getElementById("genero").value;
    var pais = document.getElementById("pais").value;
    var provincia = document.getElementById("provincia").value;

    tx.executeSql('INSERT INTO USUARIO (edad,genero,pais,provincia) VALUES ("' + edad
        + '","' + genero + '","' + pais + '","' + provincia + '")');
}

function dropSql(tx) {
    tx.executeSql('DROP TABLE IF EXISTS USUARIO');
    window.location.href = "index.html";
}

function insertDB() {
    var db = window.openDatabase("Psicopedia", "1.0", "Psicopedia Demo", 200000);
    db.transaction(insertSql); //Inserta en la tabla
}

function searchDB() {
    var db = window.openDatabase("Psicopedia", "1.0", "Psicopedia Demo", 200000); // Devuelve una instancia de la base de datos
    db.transaction(populateDB); //Crea la tabla
    db.transaction(queryDB); // Busca en la tabla
}

function deleteDB() {
    var db = window.openDatabase("Psicopedia", "1.0", "Psicopedia Demo", 200000);
    db.transaction(dropSql);
}