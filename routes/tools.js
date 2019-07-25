const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("Aqui debo mostrar la vista de mi panel de herramientas, donde contiene iconos de: monitor, generacion de informes, gestion de usarios, etc.");
});

router.get('/monitor', (req, res) => {
    // res.json({
    //     miPrimerAPI: 'Funciona!'
    // })
    // res.send("estoy en la direccion raiz, dentro de mi archivo monitor.js");
    res.render('./pages/monitor.ejs');
});

router.get('/controlRemote', (req, res) => {
    // res.json({
    //     miPrimerAPI: 'Funciona!'
    // })
    // res.send("estoy en la direccion raiz, dentro de mi archivo monitor.js");
    res.render('./pages/controlRemote.ejs');
});


// evaluo cual de los 2 botones (onn/off) se preciono en el pir 1 pir 2 mq2 mag y segun ese dato, llamo a la funcion correspondiente.
// osea, habra 8 funciones: ejemplo, activarPir1(), desactivarPir1(),  activarPir2(), desactivarPir2(), activarMq2(), desactivarMq2(),
// activarMag(), desactivarMag().  NOTA: cuando el usuario administrador commpra un nuevo sensor y le da de alta en el sistema, entonces:
// ¿como creo las funciones de activarSensorNuevo(), desactivarSensorNuevo() ??
router.post('/controlRemote', (req, res) => {
    // res.json({
    //     miPrimerAPI: 'Funciona!'
    // })
    // res.send("estoy en la direccion raiz, dentro de mi archivo monitor.js");
    res.render('./pages/controlRemote.ejs');
});


module.exports = router;

// //ruta al panel de ¿Funcionalidades? donde podre manualmente empezar/detener el monitoreo(procesamiento de datos) y generar informes
// router.get('/tools', (req, res) => {
//     // res.send("en es ta pestaña (SPA) debo poner formularios, botonos y todos lo necesario para que el usario final pueda empezar/detener el monitoreo.  Y además generar informes de eventos");
//     res.render('tools.ejs');
// }); //¿Me convendria poner un archivo router-tools.js ?