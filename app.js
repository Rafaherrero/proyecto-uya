(() => {
    'use strict';
    const express      = require('express'),
          logger       = require('morgan'),
          ejs          = require('ejs'),
          mongoose     = require('mongoose'),
          path         = require('path'),
          bodyParser   = require('body-parser'),
          cookieParser = require('cookie-parser'),
          passport     = require('passport'),
          session      = require('express-session'),
          flash        = require('connect-flash');

    let app = express();

    // Capturamos la variable de entorno NODE_ENV
    const env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = (env === 'development');

    // Cargar la configuración de mongoose
    var configDB = require('./config/database.js');

    // Conectarse a mongo
    mongoose.connect(configDB.url);

    // Usamos cookieParser para guardar el inicio de sesión
    app.use(cookieParser());

    // Configurar la sesión de express
    app.use(session({
        secret: 'rafadaniproyecto', // Clave de seguridad para firmar las cookies
        resave: false, // para no guardar la cookie en session store, crea condiciones de carrera
        saveUninitialized: true // crea una sesión no inicializada en el navegador
    }));

    // Inicializa passport
    app.use(passport.initialize());

    // Para guardar las sesiones, usa el express-session
    app.use(passport.session());

    // Flash para enviar mensajes relacionados con la sesión
    app.use(flash());

    // Usar bodyParser como Middleware
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // Transforma la petición HTTP en un JSON
    app.use(bodyParser.json());

    // Establecer la ruta de las vistas
    app.set('views', `${__dirname}/views`);

    // Cargar helpers de EJS
    require('express-helpers')(app);

    // Motor de las vistas, que podría ser Jade, Mustache. Pero en la práctica vamos
    // A usar EJS (EmbeddedJS)
    app.set('view engine', 'ejs');

    // Establecer el modo del logger, TODO: mirar el modo producción
    app.use(logger('dev'));

    require('./config/passport')(passport);
    require('./routes/routes.js')(app, passport); //Cargar todas las rutas

    // Usar el middleware de node-sass, para que compile en vivo y en directo
    app.use(require('node-sass-middleware')({
        src: path.join(__dirname, 'assets/frontend'),
        dest: path.join(__dirname, 'public'),
        outputStyle: 'compressed',
        sourceMap: false
    }));

    // servir de forma estática los elementos de public
    app.use(express.static(`${__dirname}/public`));

    // Si se produce un error en la ruta, enviamos un not found
    app.use((req, res, next) => {
        let err = new Error('Not Found');
        err.status = 404;
        next(err); // Dejamos el error lo maneje una de dos funciones
    });

    // Si estamos en un entorno de desarrollo (que se pasa poniéndolo en la consola)
    // Mostramos un error con la pila de llamadas para poder debugear
    if (app.get('env') === 'development') {
        app.use((err, req, res) => {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                title: '¡ERROR!'
            });
        });
    }

    // En cualquier otro caso, suponemos que NO estamos en un entorno de desarrollo
    // Por lo que iniciamos el modo producción, en el que no se muestra la pila de
    // llamadas
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.render('error', {
            message: 'Esta página no existe :(',
            error: {},
            title: 'error'
        });
    });

    module.exports = app;
})();
