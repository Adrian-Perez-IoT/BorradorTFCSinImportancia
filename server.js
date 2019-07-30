/*==* LIBRARYS REQUIRES  *==*/

//requiriendo acceso a la ENTIDAD base de datos
const db = require('./config/database'); // los metodos principales de la BD seran: acceder(), create(), read(), update(), delete(), guardarEvento(), guardarNotificacion()
//aqui inicio la realtime database y la mantengo asi hasta que se cierre voluntariamente, igual que mongo db

//requiriendo acceso al nodo zigbee coordinador 
//La entidad en escencia deberia llamarse NodoZigbee en vez de comunicNodoZigbe.
// Sus metodos principales serán: leerTramas(), simularTrama(tipoTrama), crearTrama(tipoTrama), 
//y una entidad llamada NOTIFICACION, con propiedades: fecha, hora, titulo, cuerpo, destinatario.  
// Metodos: notificarEvento(tokenDestinatario, tipoDeEvento), leerNotificacionesEnLaBD()
//entidad llamada EVENTO, con propiedades: nombreEvento, fecha, hora, sensorAsociado, sensoresAsociados, 
// metodos: guardarRegistroDelEventoEnLaBD(), leerEventosEnLaBD(intervaloFechas), bool:procesarTramas(tramas), tipoDeEvento:identificarEvento(trama),
const coordinador = require('./helpers/comunicNodoZigbee');

//requiriendo express para crear la logica que me permita la entrega de mis fucnionalidades. Tambien se usará para crear en un futuro una capa de seguridad adicional (ejemplo: accesos mediante IP, DSD)
const express = require('express');
const app = express();
const port = 3100;

//Eliminar el requerimiento de esta libreria y reemplazarlo por el requerimiento de un archivo Entidad llamado Xbee.js (Este archivo contiene toda la logica perteneciente a las tramas del nodo zigbee)
//requiriendo la libreria XBEE paraleer y escribir tramas de los nodos zigbee.  Creo que esto debe hacerse un un archivo .js aparte. y desde aqui solo requiero las unciones principales de ese archivo, pero con el nombre de la funcion mas general, como por ejemplo: 
var xbee_api = require('xbee-api');

//Este requerimiento parece que esta bien por que se hace uso de una Entidad general, quien contiene propiedades y metodos caracteristicos propios
const intruso = require('./app/api/models/movimientoModel');
var dates = require('./helpers/dates');



// /*==* SETTINGS *==*/

// // utilizando mi motor de plantillas: EJS
// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// // console.log(__dirname); // PARA SABER EL DIRECTORIO DONDE ESTA MI PROYECTO



/*==* ROUTERS REQUIRES  *==*/

//requiriendo rutas
const routes = require('./routes/routes');
const routesApi = require('./routes/routes-api'); // ruta de ejemplo.  Mas adelante la puedo eliminar cuando ya aprenda bien como se pasan datos al html
const routesTools = require('./routes/tools');


/*==* MIDDLEWARES *==*/

//Midleware que me permite trabajar con objetos JSON
app.use(express.json());

// Para acceder a las rutas PRIVADAS (ejemplo tools, informes, etc) se definido un middleware que validará al usuario.
function validateUser(req, res, next) {
    //esta ruta funcion la utilizaremos para recibir un boolean true en caso de que el usuario se haya logueado correctamente y asi poder: enviarle notificaciones.
    //llamamos a un metodo que fue creado en el archivo authentication.js
    //si devolvio error, entonces mostramos el mensaje con los detalles del error(contraseña erronea, usuario inexistente, etc) 
    //si no existen errores entonces, ¿añadimos al req.body.userId un ID de usuario decodificado?  Y por ultimo devolvemos next() 
}

//middleware para servir archivos estaticos contenidos en mi carpeta publica (style, bootstrap, imagenes, etc)
app.use(express.static('public'));
// app.use(express.static(__dirname + "/public")); // no sirve esta ruta asi más adelante eliminaré esta linea!



/*==* CALL ROUTES *==*/

app.use(routes);
app.use('/api', routesApi); // esto es solo un ejemplo.  Partiendo de aqui podemos rutear las APLICACIONES basicas de un servidor (API), esto es: /USUARIO, /POST, /CONFIGURACION, etc 
app.use('/tools', routesTools);


/** Desglosaremos la siguiente ruta de funcionalidad /monitorear (que se creo para probar las herramientas) en componentes mas pequeños, que contengan funciones con nombres descriptivos, entendibles y manejables. 
 *  Las entidades y funciones descubiertas en el desglose son:
 *      Entidad: MONITOREAR. 
 *      Propiedades: intervalo de tiempo de funcionamiento, ¿sensores a funcionar asociados a la propiedad anterior de intervalo de tiempo?.  Trama? 
 *      Metodos: boolean iniciarMonitoreoPermanente(), boolean iniciarMonitoreoEnUnIntervaloDeTiempo(intervalo),  detenerMonitoreo()
 *      
 *      Entidad: EVENTO
 *      Pripiedades: fecha, hora, lugar, descripcion
 *      Metodos: 
 * 
 *      Entidad: Notificacion
 *      Pripiedades: fecha, hora, destinatario, titulo, detalles
 *      Metodos:
 * 
 *      Entidad: Usuario
 *      Pripiedades: nombre, dispositivoMovilAsociado/token, correoElectronico, numeroCelular, etc.
 *      Metodos:
 * 
 *      Entidad: DatabaseRealtime-->ERROR: para crear un registro, cada entidad anterior debe tener los sguientes metodos. DatabaseRealtime no es un esquema, porque solo tenemos 1 instancia y nada mas
 *      Pripiedades: 
 *      Metodos: Create(), Read(), Update(), Delete()
 * */

// Cuando el servidor backend reciba una peticion con la ruta a "http:localhost:4000/tools" se mostrará un tablero que ofrece las herramientas que el usuario (administrador) puede usar.
// Habrá una herramienta llamada "monitoreo permanente" que llamará a una funcion que 
// en un bucle infinito (o hasta que el usuario pulse STOP) atrape (en el puerto serial) constantemente las tramas recibidas y las analice para saber si los sensores detectaron algo sospechoso.
//  En caso de encontrar un sensor activado por alguna causa o evento de riesgo(movimiento, gas alto, apertura de puerta), el backend ¿llamará a la "RUTA QUE NOTIFICA"?(Respuesta:NO!) o ¿llamara al metodo Notificar de la entidad NOTIFICACION? (sin llamar a la ruta)???(Respuesta:SI!)
app.get('/222tools222', (req, res) => {
    var mytrama = coordinador.simularTramas(); // luego reemplazar esta funcion por la funcion que me obtiene tramas REALES constantemente desde mi puerto USB de la notebook
    var evento = coordinador.procesarDatos(mytrama); //envio la trama a una funcion para que procese si se debe o no debe activar la alarma 
    // si se detecto un evento de peligro entonces envio una notificacion al cliente.
    if (evento == "movimiento" || evento == "apertura" || evento == "gas") {
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

//Inicializar el servidor con el puerto pre-configurado
app.listen(port, (req, res) => {
    console.log(`El servidor ha sido inicializado: http://localhost:${port}`);
    console.log(`Listen in port ${port}`);
});

//Esta ruta esta de mas? La puedo borrar sin ocacionar problemas? (averiguar)
app.get('/favicon.ico', function(req, res) {
    res.sendStatus(204);
});

// Manejando errores HTTP 404 para solicitudes de contenido inexistente
app.use(function(req, res, next) {
    let err = new Error('Error pagina no encontrada');
    err.status = 404;
    next(err);
});

// Manejo de errores, respuestas con codigo HTTP 500, HTTP 404
app.use(function(err, req, res, next) {
    // console.log(err);  <<<< es necesario???
    if (err.status === 404)
        res.status(404).json({ message: " ERROR 404: Pagina no encontrada " });
    else
        res.status(500).json({ message: "ERROR 500: Error interno en el servidor!!" });
});



/**
 * Luego borrar lo de abajo
 */


// import Vue from "vue"; // Vue.js usa sintaxis ES6 y nodeJS no lo soporta, solamente soporta ES5.  Para usar ES6 se debe usar el Transpilador Babel

// db.mostrarBD();

let trama = coordinador.simularTramas(); //simular trama debe ser una funcion de una entidad llamada "ModuloXbee".  Luego crear el archivo modulo-xbee.js y tambien un archivo (Entidad) llamado ConexionSerial.js
console.log("+++++++++++++++++++++++++++     TRAMA SIMULADA     +++++++++++++++++++++++++++++++ \n");
console.log(trama);
console.log("+++++++++++++++++++++++++++     ==============     +++++++++++++++++++++++++++++++ \n");


let nodoCoordinador = require('./app/api/models/nodoZigbeeModel');

//este data lo debo obtener de un formulario cuando el usuario entra a la ruta "/configuracion" que tiene la vista para el alta del sensor
let data = {
    "firmware": "parametro",
    "macAddres": "parametro2",
    "lugarUbicacion": "parametro3"
};
nodoCoordinador.createNode(data);
console.log(nodoCoordinador.simuleFrame());