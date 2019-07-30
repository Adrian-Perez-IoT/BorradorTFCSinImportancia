// con este ¿objeto? podremos crear cada uno de los tres tipos de sensores
// aqui pongo el CRUD del sensor y para esto, necesitaré requerir al archivo database.js



let myData = {
    "id": "",
    "model": "",
    "type": "",
    "lugarUbicacion": "",
    "status": ""

}

// mejorar en el futuro usando objeto JSON DATA


function create(dato) {
    // console.log(myData); //verifico que accedo al contexto global y no contexto local
    myData = {
        "id": dato.id,
        "model": dato.model,
        "type": dato.type,
        "lugarUbicacion": dato.lugarUbicacion,
        "status": dato.status
    }
    console.log("Se setearon los valores:", myData);
};

function readProperty() {
    console.log("entre a la funcion readPropiedades")
    return (this.myData);
}

function readStatus() {
    //me dice si el sensor esta activo o inactivo.  
    // Con esta informacion puedo determinar si debo o no debo notificar al usuario cuando
    // analizo una trama con digitalSamples de determinado pin=1
    return (this.myData.status);
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