(() => {
  'use strict'

  class UsersController {
    constructor () {
      var models = require('../models/index')
      this.Ruta = models.Ruta
      this.Usuario = models.Usuario
    }

    index (req, res) {
      this.Ruta.findAll({}).then((rutas) => {
        res.send('Conectado')
      })
    }

    create (req, res, done) {
      if (req.session.authenticated !== req.params.nick) {
        res.status(403).send('No puedes crearle rutas a otros usuarios')
        return
      }
      if (!req.body.origen) {
        res.status(400).send('Necesitas un origen de la ruta')
        return
      }
      if (!req.body.destino) {
        res.status(400).send('Necesitas un destino de la ruta')
        return
      }

      this.Usuario.findOne({where: {nick: req.session.authenticated}}).then((user) => {
        // El usuario tiene que existir, porque ha iniciado sesión
        this.Ruta.findOne({
          propietario: user.id,
          origen: req.body.origen,
          destino: req.body.destino
        }).then((ruta) => {
          if (ruta != null) {
            res.status(400).send('Esa ruta ya existe')
            return
          }
          this.Ruta.create({
            propietario: user.id,
            origen: req.body.origen,
            destino: req.body.destino
          }).then((newUser) => {
            res.status(201).send('La ruta ha sido creada')
            return done()
          }).catch((err) => {
            return done(err)
          })
        })
      })
    }
  }

  module.exports = UsersController
})()
