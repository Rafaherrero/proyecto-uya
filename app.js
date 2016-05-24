(() => {
  'use strict'
  const express = require('express')
  const logger = require('morgan')
  const bodyParser = require('body-parser')
  const cookieParser = require('cookie-parser')
  const passport = require('passport')
  const session = require('express-session')

  let app = express()

  // Capturamos la variable de entorno NODE_ENV
  const env = process.env.NODE_ENV || 'development'
  app.locals.ENV = env
  app.locals.ENV_DEVELOPMENT = (env === 'development')

  // Usamos cookieParser para guardar el inicio de sesión
  app.use(cookieParser())

  // Configurar la sesión de express
  app.use(session({
    secret: 'rafadaniproyecto', // Clave de seguridad para firmar las cookies
    resave: false, // para no guardar la cookie en session store, crea condiciones de carrera
    saveUninitialized: true // crea una sesión no inicializada en el navegador
  }))

  // Usar bodyParser como Middleware
  app.use(bodyParser.urlencoded({
    extended: true
  }))

  // Transforma la petición HTTP en un JSON
  app.use(bodyParser.json())

  // Inicializa passport
  app.use(passport.initialize())

  // Para guardar las sesiones, usa el express-session
  app.use(passport.session())

  // Establecer la ruta de las vistas
  app.set('views', `${__dirname}/views`)

  // Establecer el modo del logger, si estamos en pruebas no se activa
  if (env !== 'test') {
    app.use(logger('dev'))
  }

  require('./config/passport')(passport)

  // Cargar las routas, le pasamos la aplicación, la base de datos y passport
  require('./config/routes')(app, passport)

  // Si se produce un error en la ruta, enviamos un not found
  app.use((req, res, next) => {
    let err = new Error('Not Found')
    err.status = 404
    next(err) // Dejamos el error lo maneje una de dos funciones
  })

  // Si estamos en un entorno de desarrollo (que se pasa poniéndolo en la consola)
  // Mostramos un error con la pila de llamadas para poder debugear
  if (app.get('env') === 'development') {
    app.use((err, req, res) => {
      res.status(err.status || 500).send(err)
    })
  }

  // En cualquier otro caso, suponemos que NO estamos en un entorno de desarrollo
  // Por lo que iniciamos el modo producción, en el que no se muestra la pila de
  // llamadas
  app.use((err, req, res) => {
    res.status(err.status || 500).send('Server side error')
  })

  module.exports = app
})()
