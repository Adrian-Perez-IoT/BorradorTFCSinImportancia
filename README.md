/**
 * @fileoverview    Mi servidor Backend app contiene la LOGICA DEL NEGOCIO. para que el sistema brinde las funciones de alarma que ayuden a proteger el inmueble.  Las funcionalidades principales del backend son 3: 

-1) Dar de alta (GESTIONAR) a los sensores que se usaran (segun el modelo y la ubicacion)
 0) Capturar los datos provistos por los sensores.
 1) Notificar a los clientes cuando se activa la alarma.
 2) Generar informe con el historial de eventos.
 3) Configurar el sistema (programar fechas y horas de activacion. Gestionar usuarios.  Gestionar sensores).
 
 
/* Sector para la programacion de las funcionalidades fundamentales (en forma de metodos y funciones - no hay acceso direco a la base de datos con sentencias o manejo de rutas especificasde cada entidad) del servidor backend.  

La comunicandose con firebase se realiza mediante el SKD admin y serviceAccouuntKey.json. Y se hace desde el archivo database.js  
