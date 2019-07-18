const express = require('express');
const router = express.Router();

// Utilizo express para gestionar las peticiones al servidor backend

/* RUTAS ¡GENERALES! */

// Cuando el servidor backend reciba una peticion con la ruta a la raiz, le envio la vista de pagina home de mi "Solucion IoT - SmartHome" donde el administrador tendra la opcion de loguearse
// Antes de loguearse, se debe  verificar si el usuario no habia inicio sesion anteriormente.  en caso contrario se le mostrará un "___boton___" de inicio de sesion
// NOTA: luego de hacer click en el boton "LOGIN", el servidor llama a la ruta https:localhost:4000/login la cual contendrá un formulario de inicio de sesion.  Luego de loguearse correctamente, se
// llamará otra vista que contendra los datos del usuario logueado y un boton de "start system" que permitirá inicar el sistema de alarma.
router.get('/', (req, res) => {
    // res.send("Aqui el backend app le envia a la app cliente el .html con: la vista HOME que describe mi 'Solición IoT'.  Tambien hay un boton de Login para que el administrador (osea el dueño de la casa) inicie sesion y comienze a funconar el sistema de alarma");
    res.render('index.ejs');
});

router.get('/login', (req, res) => {
    // res.send("Estoy en el login");
    res.render('login.ejs');
});

//ruta al panel de administracion.  
//ruta al monitoreo en tiempo real.
//ruta a la generacion de informes.

/* RUTAS RELATIVAS DE LA LOGICA DE NEGOCIO*/
// Cuando el servidor backend reciba una peticion con la ruta a obtener estado en linea de los sensores, 
// Se llamara a una funcion que obtenga primero: el estado en linea de los sensores. y se enviara tal respuesta al cliente (que es la webapp de android)
router.get('/fdas', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a leer los datos de los sensores
// Se llamara a una funcion que obtenga primero: el estado en linea de los sensores, y en caso afirmativo procederemos a leer dichos datos de los sensores.
// El resultado de tal funcion que lea dichos datos, se enviará al cliente. 
router.get('/32', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a de "generar informe"
// Se llamara a una funcion que obtenga los ultimos eventos registrados y hara un resumen de dichos eventos, resumiendo lo mas importante en una tabla:
// fecha hora, tipo de evento y tiempo de duracion del evento.
router.get('/asdfasd', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a "configuraciones" (NOTA: el boton que llame a esta peticion, solo sera visible para los usuarios de tipo administrador)
// la funcion devolvera como primera respuesta una view que ofrece opciones de: 
// 1) Configurar fecha y hora de alarma.
// 2) Gestionar ABM de Usuarios.
router.get('/f32f', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a "Configurar fecha y hora de alarma"
// la funcion devolvera como primera respuesta una view de calendario y horas, donde el usuario tendra las opciones de elegir: 
// 1) Un intervalo de fechas determinadas en el cual este activo el sistema de alarmas.
// 2) Un intervalo de horas determinadas en el cual este activo el sistema de alarmas.
router.get('/fsdf32', (req, res) => {
    res.send();
    res.send();
})

// Cuando el servidor backend reciba una peticion con la ruta a "Gestionar usuarios"
// la funcion devolvera como primera respuesta una view de ABD, donde el usuario tendra 3 opciones de elegir: 
// 1) Dar de alta a un nuevo usuario.
// 2) Dar de baja a un usuario existente.
// 3) Modificar un usuario existente.  -->Se podra cambiar datos como su email, numero telefonico y tipo de usuario (para asar de usuario operador a usuario administrador).
router.get('/fsf11212', (req, res) => {
    res.send();
    res.send();
})



// Cuando el servidor backend reciba una peticion con la ruta a "Notificar" se llamará a una funcion de notificacion que obtenga el token de los destinatarios
// y enviara los datos relevantes del evento (evento que se identifico en cuestion).  Antes se activara una sirena. 
router.get('/notificar', (req, res) => {
    //Envia mensaje a dispositivo especifico
    // This registration token comes from the client FCM SDKs.
    db.notificar();



    res.send("entre a la ruta notificar");
})

module.exports = router;



// Rutas publicas
//app.use('/users', users); //app.use('/myRuta', miArchivoUsersConRutas) Lo que hace es separar las rutas URLs en un archivo diferentes, como por ejemplo en el archivo ./routes/users.js

// Rutas privadas que solo pueden ser consumidas (con un token generado) cuando el usuario se a autenticado.  Verificaréos si el usuario fue autenticado utilizando la funcion "validateUser"
//app.use('/monitorear', validateUser, monitorear);