//NOTA : en cada funcion de este modelo, deberia contener exclusivamente sentencias de comunicacion con mi base de datos ¿o no?

/**
 * Este modelo debe tener las sentencias atomicas para comunicarse con database firebase. 
 * las funciones de createNode(), redProperty(), simuleFrame() deberian estar en el nodoZigbeeController.js????
 */

var xbee_api = require('xbee-api'); // libreria para facilitar la gestion (leer y escribir tramas) de los nodos zigbee
var xbeeAPI = new xbee_api.XBeeAPI({
    api_mode: 1 //1 es predeterminado, 2 es con escape.
});


// Este MODELO se utilizará para crear ¿instancias? como Coordinador, Router o Terminal.  

let firmware, mac, lugarUbicacion;
let myData = {
    "firmware": "algoGlobal",
    "macAddres": "",
    "lugarUbicacion": ""
}

// mejorar en el futuro usando objeto JSON DATA


function createNode(dato) {
    // console.log(myData); //verifico que accedo al contexto global y no contexto local
    myData = {
        "firmware": dato.firmware,
        "macAddres": dato.macAddres,
        "lugarUbicacion": dato.lugarUbicacion
    }
    console.log("Se setearon los valores:", myData);
};

function readProperty() {
    console.log("entre a la funcion readPropiedades")
    return (this.myData);
}

function simuleFrame() {
    var raw_frame = Buffer.from([0x7E, 0x00, 0x12, 0x92, 0x00, 0x13, 0xA2, 0x00, 0x41, 0x6D, 0x73, 0xAF, 0xF9, 0x51, 0x01, 0x01, 0x00, 0x01, 0x00, 0x00, 0x01, 0x9A]);
    return xbeeAPI.parseFrame(raw_frame);
}

/**
 * Falta crear las siguientes funciones
 * analizeFrame()//analizo (con ayuda de la Libreria/Entidad SerialPort) TODOS los tramas capturados en mi puerto serial
 * readConfigNodo()//aqui obtengo cuales son los pines que estan seteados para que se comuniquen con los sensores.
 * identifyNodeType() esta funcion devuelve un string con el tipo de nodo que puede ser: coordinador, router, terminal. identificar el tipo de nodo depende de los parametros configurados en el xctu.
 * identifyOperationMode()// nos dice si el nodo esta en modo API=0 (necesario para utilizar la libreria npm xbee-api), o en modo transparente, etc del resultado de esta funcion depende que el backend app se configure correctamente para que funcione la solucion IoT.
 * createTrama()//Voy a crear una trama dependiendo del argumento recibido, por ejemplo NI que es un comando para preguntarle su nombre al nodo xbee(la respuesta pueden ser 4: coordinador, router, final, noDefinido )
 * readIdentificationName()//aqui hago uso del comando NI (node identificator) que me dice el nombre que tiene el nodo
 */

module.exports = { createNode, readProperty, simuleFrame };