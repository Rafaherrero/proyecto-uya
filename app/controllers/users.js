(() => {
  'use strict'

  class UsersController {
    constructor (passport) {
      this.passport = passport
      this.Usuario = require('../models/index').Usuario

      this.nombreRegex = /..+/
      this.apellidoRegex = /..+/
      this.nickRegex = /\w\w\w\w+/
      this.emailRegex = /^[A-Za-z0-9](([_.-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([.-]?[a-zA-Z0-9]+)*).([A-Za-z]{2,})$/
      this.passRegex = /..........+/
    }

    index (req, res) {
      this.Usuario.findAll({
        attributes: [
          'nick',
          'nombre',
          'apellidos',
          'email'
        ]
      }).then((users) => {
        res.send(users)
      })
    }

    show (req, res, next) {
      this.Usuario.findOne({where: {nick: req.params.nick}}).then((user) => {
        if (user === null) {
          res.status(404).send('Ese usuario no existe')
        } else {
          res.status(200).send(user)
        }
      })
    }

    create (req, res, next) {
      if (req.session.authenticated) {
        res.status(400).send('Ya tienes una sesión iniciada')
        return
      }
      if (!req.body.email) {
        res.status(400).send('Necesitas un correo para registrarte')
        return
      }
      if (!req.body.password) {
        res.status(400).send('Necesitas una contraseña para registrarte')
        return
      }
      if (!req.body.nick) {
        res.status(400).send('Necesitas un nick para registrarte')
        return
      }
      if (!req.body.nombre) {
        res.status(400).send('Necesitas un nombre para registrarte')
        return
      }
      if (!req.body.apellidos) {
        res.status(400).send('Necesitas un apellido para registrarte')
        return
      }

      // TODO: llamar a validarUsuario antes de registrarlo

      this.passport.authenticate('local-signup', (err) => {
        if (err) {
          res.status(err.status || 500)
          res.send(err.message)
          return err
        }
        res.status(201).send('Te has registrado satisfactoriamente.')
      })(req, res, next)
    }

    login (req, res, next) {
      if (req.session.authenticated) {
        res.status(400).send('Ya has iniciado sesión')
        return
      }
      this.passport.authenticate('local-login', (err) => {
        if (err) {
          res.status(err.status || 500)
          res.send(err.message)
          return err
        }
        this.Usuario.findOne({where: {email: req.body.email}}).then((user) => {
          req.session.authenticated = user.nick
          res.status(200).send('Has iniciado sesión satisfactoriamente.')
        })
      })(req, res, next)
    }

    logout (req, res) {
      if (!req.session.authenticated) {
        res.status(400).send('No has iniciado sesión, asi que no puedes cerrarla')
        return
      }
      req.logout()
      req.session.authenticated = null
      res.status(200).send('Has cerrado sesión satisfactoriamente.')
    }

    validar (req, res) {
      let usuario = req.body
      this.validaUsuario(usuario).then((validacion) => {
        res.status(200).send(validacion)
      })
    }

    validaUsuario (usuario) {
      let validated = {
        todoBien: true,
        nombre: true,
        apellidos: true,
        nick: true,
        email: true,
        password: true
      }

      if (!this.emailRegex.test(usuario.email)) {
        validated.email = false
        validated.todoBien = false
      }

      if (!this.passRegex.test(usuario.password)) {
        validated.password = false
        validated.todoBien = false
      }

      if (!this.nickRegex.test(usuario.nick)) {
        validated.nick = false
        validated.todoBien = false
      }

      if (!this.nombreRegex.test(usuario.nombre)) {
        validated.nombre = false
        validated.todoBien = false
      }

      if (!this.apellidoRegex.test(usuario.apellidos)) {
        validated.apellidos = false
        validated.todoBien = false
      }

      let p1 = this.Usuario.findOne({where: {nick: usuario.nick}})
      let p2 = this.Usuario.findOne({where: {email: usuario.email}})

      return Promise.all([p1, p2]).then((res) => {
        if (res[0] != null) {
          validated.nick = false
          validated.todoBien = false
        }

        if (res[1] != null) {
          validated.email = false
          validated.todoBien = false
        }

        return validated
      })
    }

    whoami (req, res) {
      res.json(req.session.authenticated)
    }
  }

  module.exports = UsersController
})()
