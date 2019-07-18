/**
 * @fileoverview    Mi servidor.js contiene la LOGICA DEL NEGOCIO en terminos generales para que el sistema de alarma brinde las 3 funcionalidades principales
 * @version         1.0
 * @author          Perez Adrian <perezjadrian@gmail.com>
 * @copyright           
 *
 * History
 * v2.2 – 
 * v2.0 – 
 * v1.1 – Se mejora el acceso a las funciones alojadas en otro archivo .js, para mejor legibilidad de las funciones del servidor backend 
 * v0.0 – Se experimenta el acceso a datos para la lectura del nodo y la lectura/escritura en la nube y Interfaz web
 * ----
 */

/* Sector para la programacion de las funcionalidades fundamentales (en forma de metodos y funciones - no hay acceso direco a la base de datos con sentencias o manejo de rutas especificasde cada entidad) del servidor backend.  
La comunicandose con firebase es privilegiada utilizando un archivo .json y se hace desde el archivo baseDeDatos.js  */
/* Definiremos las funciones y procedimientos fundamentales de la logica de negocio que brindara el servidor backend */
//hizimos un git pull para recuperar el codigo de la nube y AUTOMATICAMENTE intenta unir con el codigo con el que estoy trabajando localmente...

//importo las funciones de otro programa (database.js)

const db = require('./config/database');

const coordinador = require('./helpers/comunicNodoZigbee');

const express = require('express');
const app = express();
app.use(express.json());

const port = 4000;

var xbee_api = require('xbee-api'); // libreria para facilitar la gestion (leer y escribir tramas) de los nodos zigbee

const intruso = require('./app/api/models/intrusos');
var dates = require('./helpers/dates');

// import Vue from "vue"; // esta sintaxis es de ES6 y nodeJS no lo soporta, solamente soporta ES5.  Para usar ES6 se debe usar el Transpilador Babel

//requiriendo rutas
const routes = require('./routes/routes');
const routesApi = require('./routes/routes-api');


// db.mostrarBD();

var myobj = coordinador.simularTramas();
console.log("+++++++++++++++++++++++++++     TRAMA SIMULADA     +++++++++++++++++++++++++++++++ \n Objetos:");
console.log(myobj);
console.log("+++++++++++++++++++++++++++     ==============     +++++++++++++++++++++++++++++++ \n Objetos:");


/** settings */
// utilizando mi motor de plantillas: EJS
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// console.log(__dirname); // PARA SABER EL DIRECTORIO DONDE ESTA MI PROYECTO


/** middlewares */


/** rutas */
app.use(routes);
app.use('/api', routesApi);


// Cuando el servidor backend reciba una peticion con la ruta a "http:localhost:4000/start" se llamará a una funcion que 
// en un bucle infinito (o hasta que se de la orden de break) monitoree constantemente las tramas recibidas por el puerto serial. 
//  y en caso de encontrar un sensor activo, esté llamará a la "RUTA QUE NOTIFICA"
app.get('/monitorear', (req, res) => {
    var mytrama = coordinador.simularTramas(); // luego reemplazar esta funcion por la funcion que me obtiene tramas REALES constantemente desde mi puerto USB de la notebook
    var evento = coordinador.procesarDatos(mytrama); // envio la trama a una funcion para que procese si se debe o no debe activar la alarma 
    // si se detecto un evento de peligro entonces envio una notificacion al cliente
    if (evento == "movimientoPIR" || evento == "openMAGNETICO" || evento == "dangerGAS") {
        console.log("se detecto una amenaza del tipo: ", evento.toString());
        //creo un nuevo registro en mi realtime database
        var timestamp = dates.actual();
        var devolver = intruso.writeData(timestamp, evento);
    }
    //si la escritura de datos no devolvio ningun enrror, entonces le respondo al cliente que: el dato se cargo correctamente en la Realtime Database de Firebase
    if (devolver == undefined || devolver == null) {
        res.send('El dato se cargo correctamente en Realtime Database Firebase');
    }
    // res.json(devolver);
    //res.json(loquerecibi);
    //queda pendiente lo de la notificacion a mi app movil.  

})




//escuchar el puerto e inicializar el servidor
app.listen(port, (req, res) => {
    console.log(`El servidor ha sido inicializado: http://localhost:${port}`);
    console.log(`Listen in port ${port}`);

});


app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

// Manejando errores HTTP 404 para solicitudes de contenido inexistente
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Manejo de errores, respuestas con codigo HTTP 500, HTTP 404
app.use(function(err, req, res, next) {
    console.log(err);
    if (err.status === 404)
        res.status(404).json({ message: " ERROR 404: Pagina no encontrada " });
    else
        res.status(500).json({ message: "ERROR 500: Error interno en el servidor!!" });
});


// Para acceder a las rutas de monitoreoSSS hemos definido middleware para validar al usuario.
function validateUser(req, res, next) {
    //esta ruta funcion la utilizaremos para recibir un boolean true en caso de que el usuario se haya logueado correctamente y asi poder: enviarle notificaciones.
    //llamamos a un metodo que fue creado en el archivo authentication.js
    //si devolvio error, entonces mostramos el mensaje con el estado y datos de dicho error
    //sino, ¿añadimos al req.body.userId un ID de usuario decodificado?  Y por ultimo devolvemos next() 

}