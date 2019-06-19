/**
 * @fileoverview    Mi servidor.js contiene la logica de negocio general para el sistema de alarma 
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

/* Sector para la programacion de las funcionalidades fundamentales (en forma de metodos y funciones - no hay acceso direco a la base de datos con sentencias o manejo de rutas especificasde cada entidad) del servidor backend.  
La comunicandose con firebase es privilegiada utilizando un archivo .json y se hace desde el archivo baseDeDatos.js  */
/* Definiremos las funciones y procedimientos fundamentales de la logica de negocio que brindara el servidor backend */
//hizimos un git pull para recuperar el codigo de la nube y AUTOMATICAMENTE intenta unir con el codigo con el que estoy trabajando localmente...

//importo las funciones de otro programa (database.js)
const db = require('./config/database');
//const coordinador = require('./comunicNodoZigbee');
const coordinador = require('./helpers/comunicNodoZigbee');
//import { mostrarTramas } from './comunicNodoZigbee';

const express = require('express');
const app = express();
app.use(express.json());

const port = 4000;

var xbee_api = require('xbee-api'); // libreria para facilitar la gestion (leer y escribir tramas) de los nodos zigbee

const intruso = require('./app/api/models/intrusos');
var dates = require('./helpers/dates');







db.mostrarBD();

var myobj = coordinador.simularTramas();
console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Objetos:");
console.log(myobj);



// Cuando el servidor backend reciba una peticion con la ruta a la raiz, le envio la vista de pagina home de mi "Solucion IoT - SmartHome"
// Además se verificara si el usuario inicio sesion, en caso contrario se le mostrará un "___boton___" de inicio de sesion
app.get('/asdf', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a obtener estado en linea de los sensores, 
// Se llamara a una funcion que obtenga primero: el estado en linea de los sensores. y se enviara tal respuesta al cliente (que es el navegador webapp en android)
app.get('/fdas', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a leer los datos de los sensores
// Se llamara a una funcion que obtenga primero: el estado en linea de los sensores, y en caso afirmativo procederemos a leer dichos datos de los sensores.
// El resultado de tal funcion que lea dichos datos, se enviará al cliente. 
app.get('/32', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a de "generar informe"
// Se llamara a una funcion que obtenga los ultimos eventos registrados y hara un resumen de dichos eventos, resumiendo lo mas importante en una tabla:
// fecha hora, tipo de evento y tiempo de duracion del evento.
app.get('/asdfasd', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a "configuraciones" (NOTA: el boton que llame a esta peticion, solo sera visible para los usuarios de tipo administrador)
// la funcion devolvera como primera respuesta una view que ofrece opciones de: 
// 1) Configurar fecha y hora de alarma.
// 2) Gestionar ABM de Usuarios.
app.get('/f32f', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a "Configurar fecha y hora de alarma"
// la funcion devolvera como primera respuesta una view de calendario y horas, donde el usuario tendra las opciones de elegir: 
// 1) Un intervalo de fechas determinadas en el cual este activo el sistema de alarmas.
// 2) Un intervalo de horas determinadas en el cual este activo el sistema de alarmas.
app.get('/fsdf32', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a "Gestionar usuarios"
// la funcion devolvera como primera respuesta una view de ABD, donde el usuario tendra 3 opciones de elegir: 
// 1) Dar de alta a un nuevo usuario.
// 2) Dar de baja a un usuario existente.
// 3) Modificar un usuario existente.  -->Se podra cambiar datos como su email, numero telefonico y tipo de usuario (para asar de usuario operador a usuario administrador).
app.get('/fsf11212', (req, res) => {
    res.send();
    res.send();
})



// Cuando el servidor backend reciba una peticion con la ruta a "Notificar" se llamará a una funcion que notificacion que obtenga los numeros telefonicos de los destinatarios ( o email o lo que haga falta)
// y enviara los datos relevantes del evento (evento que se identifico en cuestion).  Antes se activara una sirena. 
app.get('/lkjhg', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a "http:localhost4000/start" se llamará a una funcion que 
// en un bucle infinito (o hasta que se de la orden de break) monitoree constantemente las tramas recibidas por el puerto serial. 
//  y en caso de encontrar un sensor activo, esté llamará a la "RUTA QUE NOTIFICA"
app.get('/start', (req, res) => {
    var mytrama = coordinador.simularTramas();
    var evento = coordinador.procesarDatos(mytrama);
    // si se detecto una activacion
    if (evento = "intrusoPIR") {
        console.log("se detecto una amenaza del tipo: movimiento en el lugar _ _ _ _  _");
        //creo un nuevo registro en mi realtime database
        var timestamp = dates.actual();
        var devolver = intruso.writeData(timestamp, evento);
    }
    if (devolver == null) {
        res.send('no se registraron errores y se cargo correctamente el registro en la nube');
    }
    res.json(devolver);
    //res.json(loquerecibi);
    //queda pendiente lo de la notificacion a mi app movil.  

})

// Utilizo express para gestionar las peticiones al servidor backend
app.get('/', (req, res) => {
    //res.json({ "tutorial": "Construyendo una API REST con NodeJS" });
    res.send("esta respuesta la envio el servidor para el navegador cliente frontend");
    res.send();
})

app.listen(port, (req, res) => {
    console.log(`El servidor ha sido inicializado: http://localhost:${port}`);
    console.log(`Listen in port ${port}`);

});

// Rutas publicas
//app.use('/users', users); //app.use('/myRuta', miArchivoUsersConRutas) Lo que hace es separar las rutas URLs en un archivo diferentes, como por ejemplo en el archivo ./routes/users.js

// Rutas privadas que solo pueden ser consumidas (con un token generado) cuando el usuario se a autenticado.
//app.use('/monitorear', validateUser, monitorear);

app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

// Para acceder a las rutas de monitoreoSSS hemos definido middleware para validar al usuario.
function validateUser(req, res, next) {
    //llamamos a un metodo que fue creado en el archivo authentication.js
    //si devolvio error, entonces mostramos el mensaje con el estado y datos de dicho error
    //sino, ¿añadimos al req.body.userId un ID de usuario decodificado?  Y por ultimo devolvemos next() 

}
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
        res.status(404).json({ message: "<<<<<<=======> Not found" });
    else
        res.status(500).json({ message: "=======>>>>>>> Error interno en el servidor!!" });
});