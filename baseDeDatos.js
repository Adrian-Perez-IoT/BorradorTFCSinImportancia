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
var ref = db.ref("Evento");

function mostrarTodaBD() {
    console.log("hola desde mi funcion mostrarTodaBD");
    ref.once("value", function(snapshot) {
        console.log("++++++++++++++++++++++++++++++++++++");
        console.log(" El contenido completo de mi base de dato es:");
        console.log(snapshot.val());
    });
}

module.exports = { mostrarTodaBD };