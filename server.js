/**
 * @fileoverview    Mi servidor.js contiene la logica de negocio para el sistema de alarma 
 * @version         1.0
 * @author          Perez Adrian <perezjadrian@gmail.com>
 * @copyright           
 *
 * History
 * v2.2 – Se mejoró el efecto de expansión de los submenús dándole efecto aceleración
 * v2.0 – Se evitó que quedaran supersupuestos textos de submenús
 * v1.1 – Se mejora el acceso a las funciones alojadas en otro archivo .js, para mejor legibilidad de las funciones del servidor backend 
 * v0.0 – Se experimenta el acceso a datos para la lectura del nodo y la lectura/escritura en la nube y Interfaz web
 * ----
 */


// Sector para el uso de Express con los datos obtenidos del sensor

const express = require('express');
const app = express();
const port = 4000;

cadenaCualquiera = "\n hola mundo desde Express JS \n";
// app.get('/', (req, res) => {
//     res.send("Mira mamá mi hola mundo desde Express Js ");
//     res.send();
// })
app.listen(port, (req, res) => {
    console.log(cadenaCualquiera);
    console.log(`Listen in port ${port}`);
});


/* Sector para la programacion de las funcionalidades fundamentales del servidor backend.  
La comunicandose con firebase es privilegiada utilizando un archivo .json y se hace desde el archivo baseDeDatos.js  */
/* Definiremos las funciones y procedimientos fundamentales de la logica de negocio que brindara el servidor backend */

//importo las funciones de otro programa (database.js)
const bd = require('./baseDeDatos');
console.log("llamo desde mi server.js a las funciones de otros archivos .js");
bd.mostrarTodaBD();

const coordinador = require('./comunicNodoZigbee');
coordinador.mostrarTramas();