// //librerias de acceso a mi documento o esquema o como se llame INTRUSOS
const db = require('../../../config/database');

//var refIntrusos = db.ref("Intruso");


function writeData(timestamp, evento) {
    //obtengo una referencia al esquema Intruso y le adiciono como clave primaria un timestamp
    var intrusosRef = db.obtenerReferencia('Intruso/' + timestamp);
    //variables auxiliares
    var d = new Date();
    var dia = d.getDate();
    var mes = d.getMonth();
    var anio = d.getFullYear();
    var concateno = dia + "/" + mes + "/" + anio;
    var hora = d.getHours();
    var minuto = d.getMinutes();
    var segundo = d.getSeconds();
    var conc2 = hora + ":" + minuto + ":" + segundo;
    //seteo los propiedades relevantes de la entidad 
    intrusosRef.set({
        fecha: concateno, //luego cambiar con una estructura mas adecuada que permita realizar operaciones de obtencion de intervalo de fechas
        hora: conc2,
        lugar: evento
    }, function(error) {
        if (error) {
            // The write failed...
            console.log("la escritura de intrusos fallo !"); // en mi appmovil (webapp) no existe el console.log asi que debo reemplazarlo por un alert()
        } else {
            console.log("Data saved successfully!");
        }
        // console.log("mostrando error", error);
        return error;

    })
}


// function procesarDatos() {
//     console.log("procesando datos en intrusos");
//}



module.exports = { writeData };