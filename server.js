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

/* Sector para la programacion de las funcionalidades fundamentales del servidor backend.  
La comunicandose con firebase es privilegiada utilizando un archivo .json y se hace desde el archivo baseDeDatos.js  */
/* Definiremos las funciones y procedimientos fundamentales de la logica de negocio que brindara el servidor backend */

//importo las funciones de otro programa (database.js)
const bd = require('./config/database');
//const coordinador = require('./comunicNodoZigbee');
const coordinador = require('./helpers/comunicNodoZigbee');
//import { mostrarTramas } from './comunicNodoZigbee';

const express = require('express');
const app = express();
app.use(express.json());

const port = 4000;

var xbee_api = require('xbee-api'); // libreria para facilitar la gestion (leer y escribir tramas) de los nodos zigbee



bd.mostrarBD();

var myobj = coordinador.simularTramas();
console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ \n Objetos:");
console.log(myobj);



// Cuando el servidor backend reciba una peticion con la ruta a la raiz, le envio la vista de pagina home de mi "Solucion IoT - SmartHome"
// Además se verificara si el usuario inicio sesion, en caso contrario se le mostrará un "___boton___" de inicio de sesion
app.get('/', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a obtener estado en linea de los sensores, 
// Se llamara a una funcion que obtenga primero: el estado en linea de los sensores. y se enviara tal respuesta al cliente (que es el navegador webapp en android)
app.get('/', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a leer los datos de los sensores
// Se llamara a una funcion que obtenga primero: el estado en linea de los sensores, y en caso afirmativo procederemos a leer dichos datos de los sensores.
// El resultado de tal funcion que lea dichos datos, se enviará al cliente. 
app.get('/', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a de "generar informe"
// Se llamara a una funcion que obtenga los ultimos eventos registrados y hara un resumen de dichos eventos, resumiendo lo mas importante en una tabla:
// fecha hora, tipo de evento y tiempo de duracion del evento.
app.get('/', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a "configuraciones" (NOTA: el boton que llame a esta peticion, solo sera visible para los usuarios de tipo administrador)
// la funcion devolvera como primera respuesta una view que ofrece opciones de: 
// 1) Configurar fecha y hora de alarma.
// 2) Gestionar ABM de Usuarios.
app.get('/', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a "Configurar fecha y hora de alarma"
// la funcion devolvera como primera respuesta una view de calendario y horas, donde el usuario tendra las opciones de elegir: 
// 1) Un intervalo de fechas determinadas en el cual este activo el sistema de alarmas.
// 2) Un intervalo de horas determinadas en el cual este activo el sistema de alarmas.
app.get('/', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a "Gestionar usuarios"
// la funcion devolvera como primera respuesta una view de ABD, donde el usuario tendra 3 opciones de elegir: 
// 1) Dar de alta a un nuevo usuario.
// 2) Dar de baja a un usuario existente.
// 3) Modificar un usuario existente.  -->Se podra cambiar datos como su email, numero telefonico y tipo de usuario (para asar de usuario operador a usuario administrador).
app.get('/', (req, res) => {
    res.send();
    res.send();
})



// Cuando el servidor backend reciba una peticion con la ruta a "Notificar" se llamará a una funcion que notificacion que obtenga los numeros telefonicos de los destinatarios ( o email o lo que haga falta)
// y enviara los datos relevantes del evento (evento que se identifico en cuestion).  Antes se activara una sirena. 
app.get('/', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a "Start" se llamará a una funcion que 
// en un bucle infinito (o hasta que se de la orden de break) monitoree constantemente las tramas recibidas por el puerto serial. 
//  y en caso de encontrar un sensor activo, esté llamará a la "RUTA QUE NOTIFICA"
app.get('/start', (req, res) => {
    var mytrama = coordinador.simularTramas();
    var estado = coordinador.procesarDatos(mytrama);
    // si se detecto una activacion
    if (estado = "positivo") {
        console.log("se detecto una amenaza");
        //creo un nuevo registro en mi realtime database
        //bd.registroIntruso();
        console.log("supuestmente ya se agrego un nuevo hijo a la bd, en la tabla INTRUSOS");
    }
    res.send(mytrama);
    //res.json(loquerecibi);

})

// Utilizo express para gestionar las peticiones al servidor backend
app.get('/', (req, res) => {
    //res.json({ user: 'adrian' });
    res.send("esta respuesta envio el servidor al cliente frontend");
    res.send();
})

app.listen(port, (req, res) => {
    console.log(`Listen in port ${port}`);
});