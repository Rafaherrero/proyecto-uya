(() => {
  'use strict'

  var fs = require('fs')
  var path = require('path')
  var Sequelize = require('sequelize')
  var env = process.env.NODE_ENV || 'development'
  var db = {}
  var sequelize = 0 // Se establece el valor justo un poquito más abajo

  if (env === 'test') {
    // En caso de estar realizando pruebas, conectarnos a una base de datos alternativa
    sequelize = new Sequelize('test', 'root', 'uya1234', {
      logging: false
    })
  } else {
    sequelize = new Sequelize('sharis', 'root', 'uya1234')
  }

  fs
    .readdirSync(__dirname)
    .filter(function (file) {
      return (file.indexOf('.') !== 0) && (file !== 'index.js') && (/.*\.js/.test(file))
    })
    .forEach(function (file) {
      var model = sequelize.import(path.join(__dirname, file))
      db[model.name] = model
    })

  Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db)
    }
  })

  db.sequelize = sequelize
  db.Sequelize = Sequelize

  db.sequelize.sync().then(function () {
    if (env !== 'test') {
      console.log('Conectado al servidor SQL')
    }
  }).error(function (error) {
    console.log('Error al conectar con el servidor SQL')
    console.log(error)
  })

  module.exports = db
})()
