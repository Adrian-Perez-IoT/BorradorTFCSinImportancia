const express = require('express');
const app = express();
const port = 4000;

greeting = "\n hola mundo desde Express JS \n";
app.get('/', (req, res) => {
    //res.send("Mira mamá mi hola mundo desde Express Js =P");
    res.send();
})
app.listen(port, (req, res) => {
    console.log(greeting);
    console.log(`Listen in port ${port}`);
});



/* Sector para la lectura de frame en el backend */

var SerialPort = require('serialport');
var xbee_api = require('xbee-api');

var C = xbee_api.constants;
var xbeeAPI = new xbee_api.XBeeAPI();

var puerto = "/dev/ttyUSB0"; // buscar la manera de identificar en que puerto USB esta conectado el adaptador, a veces es USB1 otras veces es USB0
var serialport = new SerialPort(puerto, {
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: 'none',
    //parser: com.parsers.Readline();
});

serialport.pipe(xbeeAPI.parser);
xbeeAPI.builder.pipe(serialport);

serialport.on("open", function() {
    var frame_obj = { // AT Request to be sent
        type: C.FRAME_TYPE.AT_COMMAND,
        command: "NI",
        commandParameter: [],
    };
    xbeeAPI.builder.write(frame_obj);
});

// All frames parsed by the XBee will be emitted here
xbeeAPI.parser.on("data", function(frame) {
    if (frame.type == 136) { // nos sercioramos que el comando sea NI para mostrar el nombre del nodo zigbee        
        console.log("El backend esta correctamente conectado al nodo Zigbee Coordinador con nombre:", frame.commandData.toString('ascii'));
    } else {
        console.log("El frame numero _ _ _ caputardo en el puerto serial contiene los siguientes datos:", frame)
        if (JSON.stringify(frame.digitalSamples) == '{"DIO0":1}') {
            console.log("Se detecto evento de movimientos en la zona, se subira la fecha y hora al Reltime Database");
        }
    }
});




/* Sector para la programacion del servidor backend comunicandose con firebase */

var admin = require('firebase-admin');
// Fetch the service account key JSON file contents
var serviceAccount = require('/home/bandydos/BackendIoT/serviceAccountKey.json'); // cmbiar la ruta por otra que sea relativa a la del proyecto

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://backend-de7e2.firebaseio.com'
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database(); // Get a reference to the database service
var ref = db.ref("Evento");
ref.once("value", function(snapshot) {
    console.log("############# El contenido completo de mi base de dato es:");
    console.log(snapshot.val());
});










// Something we might want to send to an XBee...  -  Esto es un frame que podriamos enviar a algun XBee
var frame_obj = {
    type: C.FRAME_TYPE.AT_COMMAND,
    command: "NI",
    commandParameter: [],
};
//console.log(xbeeAPI.buildFrame(frame_obj));
//La esentencia anterior me va a mostrar lo siguiente: <Buffer 7e 00 04 08 01 4e 49 5f>


// Something we might receive from an XBee... -- Esto es un frame que podriamos RECIBIR  de algun XBee
//var raw_frame = Buffer.from([0x7E, 0x00, 0x13, 0x97, 0x55, 0x00, 0x13, 0xA2, 0x00, 0x40, 0x52, 0x2B, 0xAA, 0x7D, 0x84, 0x53, 0x4C, 0x00, 0x40, 0x52, 0x2B, 0xAA, 0xF0]);

//la trama ingresada a continucacion fue copiada manualmen del monitor xctu.  (de  forma analoga  puedo obtener la trama leyendo el puerto serial)
var raw_frame = Buffer.from([0x7E, 0x00, 0x12, 0x92, 0x00, 0x13, 0xA2, 0x00, 0x41, 0x6D, 0x73, 0xAF, 0xF9, 0x51, 0x01, 0x01, 0x00, 0x01, 0x00, 0x00, 0x00, 0x9B]);



//console.log(xbeeAPI.parseFrame(raw_frame));
// { type: 151,
//   id: 85,
//   remote64: '0013a20040522baa',
//   remote16: '7d84',
//   command: 'SL',
//   commandStatus: 0,
//   commandData: [ 64, 82, 43, 170 ] }

//console.log("Los datos crudos son:", xbeeAPI.parseFrame(raw_frame).commandData);

//console.log("Analiza los datos en el buffer:", xbeeAPI.parseRaw(raw_frame));