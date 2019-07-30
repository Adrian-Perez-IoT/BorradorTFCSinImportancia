// Controller: EVENTO
//     
//         *   Metodos: identificarTipo() por ejemplo movimiento, gas, apertura o nulo {esto va en el controller y no en el model}
//En este modelo en lugar de declarar metodo identificarTipo(), debo poner los metodos CRUD de los eventos.


/**
 * Esta funcion analiza una trama y determina si los pines digital input del nodo router
 * recibieron alguna señal HIGH proveniente de un sensor.
 * 
 */
function analizarTrama(frame) {

    if (JSON.stringify(trama.digitalSamples) === '{"DIO0":1}') {
        return 'movimiento';
        //return 'gas'; // si {"DIO1":1}
        //return 'apertura'; // si {"DIO2":1}
        //return 'todoEnOrden'; //cuando ningun sensor disparo un evento
    }
}