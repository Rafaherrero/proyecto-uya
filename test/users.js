/* global describe, before, it */

'use strict'

var request = require('supertest')
var expect = require('chai').expect
process.env.NODE_ENV = 'test'

var app = require('../bin/www') // Cargar la aplicación
var models = require('../app/models/index')

var agent = request.agent(app)

describe('User', () => {
  describe('#create', () => {
    describe('si se le pasa correctamente el usuario', () => {
      before((done) => {
        models.Usuario.destroy({
          where: {},
          truncate: true
        }).then(() => {
          done()
        }).catch((err) => {
          console.log('ERROR')
          done(err)
        })
      })
      it('debe registrar al usuario', (done) => {
        let user = {
          email: 'pepe@pepe.com',
          password: 'pepe',
          nick: 'Pepito123',
          nombre: 'Pepe',
          apellidos: 'García'
        }

        agent
        .post('/users/signup')
        .send(user)
        .expect(201)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.error.text).to.equal(undefined)
          done()
        })
      })
    })
    describe('si no se le pasa el email', () => {
      it('debe fallar y enviar un error', (done) => {
        let user = {
          password: 'pepe',
          nick: 'Pepito123',
          nombre: 'Pepe',
          apellidos: 'García'
        }

        agent
        .post('/users/signup')
        .send(user)
        .expect(400)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.error.text).to.equal('Necesitas un correo para registrarte')
          done()
        })
      })
    })
    describe('si no se le pasa la contraseña', () => {
      it('debe fallar y enviar un error', (done) => {
        let user = {
          email: 'pepe@pepe.com',
          nick: 'Pepito123',
          nombre: 'Pepe',
          apellidos: 'García'
        }

        agent
        .post('/users/signup')
        .send(user)
        .expect(400)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.error.text).to.equal('Necesitas una contraseña para registrarte')
          done()
        })
      })
    })
    describe('si no se le pasa el nick', () => {
      it('debe fallar y enviar un error', (done) => {
        let user = {
          email: 'pepe@pepe.com',
          password: 'pepe',
          nombre: 'Pepe',
          apellidos: 'García'
        }

        agent
        .post('/users/signup')
        .send(user)
        .expect(400)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.error.text).to.equal('Necesitas un nick para registrarte')
          done()
        })
      })
    })
    describe('si no se le pasa el nombre', () => {
      it('debe fallar y enviar un error', (done) => {
        let user = {
          email: 'pepe@pepe.com',
          password: 'pepe',
          nick: 'Pepito123',
          apellidos: 'García'
        }

        agent
        .post('/users/signup')
        .send(user)
        .expect(400)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.error.text).to.equal('Necesitas un nombre para registrarte')
          done()
        })
      })
    })
    describe('si no se le pasan los apellidos', () => {
      it('debe fallar y enviar un error', (done) => {
        let user = {
          email: 'pepe@pepe.com',
          password: 'pepe',
          nick: 'Pepito123',
          nombre: 'Pepe'
        }

        agent
        .post('/users/signup')
        .send(user)
        .expect(400)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.error.text).to.equal('Necesitas un apellido para registrarte')
          done()
        })
      })
    })
    describe('si el usuario ya existe', () => {
      it('debe fallar y enviar un error', (done) => {
        let user = {
          email: 'pepe@pepe.com',
          password: 'pepe',
          nick: 'Pepito123',
          nombre: 'Pepe',
          apellidos: 'García'
        }

        agent
        .post('/users/signup')
        .send(user)
        .expect(400)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.error.text).to.equal('El usuario ya existe')
          done()
        })
      })
    })
  })

  describe('#login', () => {
    describe('si se le pasa correctamente el usuario', () => {
      it('debe loginear al usuario', (done) => {
        let user = {
          email: 'pepe@pepe.com',
          password: 'pepe'
        }

        agent
        .post('/users/login')
        .send(user)
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          done()
        })
      })
    })
    describe('si ya se ha iniciado sesión', () => {
      it('se debe enviar un error', (done) => {
        let user = {
          email: 'pepe@pepe.com',
          password: 'pepe'
        }

        agent
        .post('/users/login')
        .send(user)
        .expect(400)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.error.text).to.equal('Ya has iniciado sesión')
          done()
        })
      })
    })
  })

  describe('#logout', () => {
    describe('si se tiene una sesión iniciada', () => {
      it('se debe cerrar sesión', (done) => {
        agent
        .post('/users/logout')
        .send()
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          done()
        })
      })
    })
    describe('si ya se había iniciado sesión', () => {
      it('se debe enviar un error', (done) => {
        agent
        .post('/users/logout')
        .send()
        .expect(400)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.error.text).to.equal('No has iniciado sesión, asi que no puedes cerrarla')
          done()
        })
      })
    })
  })

  describe('#index', () => {
    describe('al pedir todos los usuarios', () => {
      it('se debe devolver un array con todos', (done) => {
        let resultado = [
          {
            nick: 'Pepito123',
            nombre: 'Pepe',
            apellidos: 'García',
            email: 'pepe@pepe.com'
          }
        ]

        agent
        .get('/users')
        .send()
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.body).to.deep.equal(resultado)
          done()
        })
      })
    })
  })
  /*
  TODO: añadir las rutas
  describe('#show', () => {
    describe('al pedir un usuario concreto', () => {
      it('se deben enviar sus datos', (done) => {
        agent
        .get('/users/Pepito123')
        .send()
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          console.log(res.body)
          expect(res.body).to.deep.equal('asd')
          done()
        })
      })
    })
  })*/
})
