//comunicacion serial con la red WPAN
//Las funciones principales que estaran en este programa "comunicacNodoZigbee.js" son:
//lecturaPermanenteDeTramas()
//IdentificacionDelTipoDeTrama()
//EnvioDeTramaAlRouter() -->Esto puede servir para consultar el NI Router, como asi tambien para reconfigurar sus lineas de DIO como digitalInput, resistencia pull-up / pull-down, etc

/* Sector para la lectura de los frame de los nodos Zigbee */

var SerialPort = require('serialport'); // hago uso de la libreria serialport para acceder a los bits transmitidos por el puerto USB de la Notebook
var xbee_api = require('xbee-api'); // libreria para facilitar la gestion (leer y escribir tramas) de los nodos zigbee

var C = xbee_api.constants; //contiene los ctipos de trama representados en una constante (para no utilizar los simbolos hexadecimales) como por ejemplo "NI" para saber el nombre identificador del nodo.
// Para obtener una instancia xbeeAPI de la clase XBeeAPI
var xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 1 //1 es predeterminado, 2 es con escape.
});

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

function mostrarTramas() {
    // All frames parsed by the XBee will be emitted here
    xbeeAPI.parser.on("data", function(frame) {
        console.log("\n============================================");
        console.log(" Tramas capturada en mi puerto serial:");
        console.log(frame);
        if (frame.type == 136) { // nos sercioramos que el comando sea NI para mostrar el nombre del nodo zigbee        
            console.log("El backend se encuentra conectado fisicamente al nodo Zigbee con nombre:", frame.commandData.toString('ascii'));
        } else {
            if (JSON.stringify(frame.digitalSamples) == '{"DIO0":1}') {
                console.log("¡¡¡¡¡¡ < < < ALERTA > > > !!!!!!!\nSe detecto un evento del tipo MOVIMIENTO en la zona _ _ _ _ _. \n Se registrará la fecha y hora en la Reltime Database");
            }
        }
    });
}


function simularTramas() {
    var raw_frame = Buffer.from([0x7E, 0x00, 0x12, 0x92, 0x00, 0x13, 0xA2, 0x00, 0x41, 0x6D, 0x73, 0xAF, 0xF9, 0x51, 0x01, 0x01, 0x00, 0x01, 0x00, 0x00, 0x01, 0x9A]);
    //return JSON.stringify(xbeeAPI.parseFrame(raw_frame));
    return xbeeAPI.parseFrame(raw_frame);
}


function procesarDatos(mytrama) {
    //console.log("asdflasdflasldf", mytrama);
    if (JSON.stringify(mytrama.digitalSamples) == '{"DIO0":1}') {
        //console.log("¡¡¡¡¡¡ < < < ALERTA > > > !!!!!!!\nSe detecto un evento del tipo MOVIMIENTO en la zona _ _ _ _ _. \n Se registrará la fecha y hora en la Reltime Database");
        return 'positivo';
    }
}
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


// agregar los argumentos para que pueda acceder a las variables de este archivo, en server.js  que contiene la logica general de negocio. 
module.exports = { mostrarTramas, simularTramas, procesarDatos };
//exports.mostrarTramas = mostrarTramas;
//module.exports = xbeeAPI;