(() => {
  'use strict'

  class UsersController {
    constructor (passport) {
      this.passport = passport
      this.Usuario = require('../models/index').Usuario
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

    show (req, res) {
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
  }

  module.exports = UsersController
})()
