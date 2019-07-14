//importamos el SDK firebase para entornos privilegiados
var admin = require('firebase-admin');
// Fetch the service account key JSON file contents
var serviceAccount = require('./serviceAccountKey.json');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://backend-de7e2.firebaseio.com'
});


// Get a database reference to our blog
const db = admin.database();

function obtenerReferencia(esquema) {
    return db.ref(esquema);

}
//obtenemos una referencia al ¿Esquema? Evento
//var ref = db.ref("Evento");
//obtengo una referencia a la raiz de mi base de datos
var ref = db.ref();


function mostrarBD() {
    ref.once("value", function(snapshot) {
        console.log("++++++++++++++++++++++++++++++++++++");
        console.log(" El contenido de mi base de dato es:");
        console.log(snapshot.val());
        console.log("++++++++++++++++++++++++++++++++++++");
    });

}

//crud // las funciones CRUD tendré que crearlas en archivos.js separados dentro la carpeta MODELS
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

function notificar(token) {
    // This registration token comes from the client FCM SDKs.
    var registrationToken = 'dznNZn0BW8Q:APA91bFWHadyZWz_Ty21rqNzhgbZzl2xHwmDtmMzO08qLB8K1FwPcHsg08tXwA0JRVJwMZ1zp7oN0WRIKz5hsjYmZKSWIeBcOfzr2Av9TY5hAckZ4FvojFhJcrxHI-ecf3YGMlarPVfz';

    // See the "Defining the message payload" section below for details
    // on how to define a message payload.
    var payload = {
        notification: {
            title: 'Mi primer Titul de Notificaion',
            body: 'mi primer cuerpo de notifacions'
        }
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().sendToDevice(registrationToken, payload)
        .then(function(response) {
            // See the MessagingDevicesResponse reference documentation for
            // the contents of response.
            console.log('Successfully sent message:', response);
        })
        .catch(function(error) {
            console.log('Error sending message:', error);
        });

    // var message = {
    //     data: {
    //         score: '850',
    //         time: '2:45'
    //     },
    //     token: registrationToken
    // };

    // Send a message to the device corresponding to the provided
    // registration token.
    // admin.messaging().send(message)
    //     .then((response) => {
    //         // Response is a message ID string.
    //         console.log('Successfully sent message:', response);
    //     })
    //     .catch((error) => {
    //         console.log('Error sending message:', error);
    //     });

}

module.exports = { mostrarBD, crear, leer, actualizar, borrar, obtenerReferencia, notificar };
//module.exports = { db };