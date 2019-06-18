//importamos el SDK firebase para entornos privilegiados
var admin = require('firebase-admin');
// Fetch the service account key JSON file contents
var serviceAccount = require('./serviceAccountKey.json');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://backend-de7e2.firebaseio.com'
});

var db = admin.database();
//obtenemos una referencia al ¿Esquema? Evento
//var ref = db.ref("Evento");
var ref = db.ref();


function mostrarBD() {
    ref.once("value", function(snapshot) {
        console.log("++++++++++++++++++++++++++++++++++++");
        console.log(" El contenido de mi base de dato es:");
        console.log(snapshot.val());
        console.log("++++++++++++++++++++++++++++++++++++");
    });

}

//crud
function crear() {
    var userRef = ref.child("users");
    userRef.set({
        asdfasdfalanisawarome: {
            dateOfBirth: "asdfasdfasdfJune 23, 1912",
            nombre: "asdfasdfdsfAlan Turing"
        },
        asdfasdfgracehop: {
            nacimiento: "asdfasdffdaDiciembre 9 , 1906",
            nombre: "asdafdsfasGrace Hopper"
        }
    });
}

function leer() {}

function actualizar() {}

function borrar() {}

module.exports = { mostrarBD, crear, leer, actualizar, borrar };