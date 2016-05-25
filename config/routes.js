(() => {
  'use strict'
  module.exports = (app, passport) => {
    var UsersController = controller('users', passport)
    var RutasController = controller('rutas')
    var CiudadesController = controller('ciudades')

    get(app, '/users', UsersController, 'index') // Obtener una lista de usuarios

    post(app, '/users/signup', UsersController, 'create') // Registrarse
    post(app, '/users/login', UsersController, 'login') // Iniciar sesión
    post(app, '/users/logout', UsersController, 'logout') // Cerrar sesión

    get(app, '/users/:nick', UsersController, 'show') // Obtener la información del usuario 'nick'
    post(app, '/users/:nick/rutas', RutasController, 'create') // Crear una ruta para el usuario 'nick'
    get(app, '/rutas/:id', RutasController, 'show') // Crear una ruta para el usuario 'nick'
    get(app, '/rutas', RutasController, 'index') // Obtener las rutas que coinciden con la búsqueda
    get(app, '/ciudades', CiudadesController, 'index')  // Obtener la lista de ciuades
    post(app, '/users/validar', UsersController, 'validar')  // Validar el formato de un usuario
  }

  function controller (name, param) {
    const Controller = require(`../app/controllers/${name}.js`)
    return new Controller(param)
  }

  function get (app, path, controller, method) {
    app.get(path, controller[method].bind(controller))
  }

  function post (app, path, controller, method) {
    app.post(path, controller[method].bind(controller))
  }
})()
