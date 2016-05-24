(() => {
  'use strict'
  module.exports = (app, passport) => {
    var UsersController = controller('users', passport)
    var RutasController = controller('rutas')
    var CiudadesController = controller('ciudades')

    get(app, '/users', UsersController, 'index')

    post(app, '/users/signup', UsersController, 'create')
    post(app, '/users/login', UsersController, 'login')
    post(app, '/users/logout', UsersController, 'logout')

    get(app, '/users/:nick', UsersController, 'show')
    post(app, '/users/:nick/rutas', RutasController, 'create')
    get(app, '/ciudades', CiudadesController, 'index')
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
