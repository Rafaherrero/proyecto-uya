/* global describe, before, it, after */

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

  describe('#validar', () => {
    describe('al enviar un usuario malformado', () => {
      it('se debe validar si el formato es correcto', (done) => {
        let user = {
          email: 'pepepepe.com',
          password: 'pe',
          nick: 'Pepi3',
          nombre: 'P',
          apellidos: 'García'
        }

        agent
        .post('/users/validar')
        .send(user)
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.body).to.deep.equal({
            todoBien: false,
            email: false,
            password: false,
            nick: true,
            nombre: false,
            apellidos: true
          })
          done()
        })
      })
    })
    describe('al enviar un usuario con un correo ya existente', () => {
      it('se debe validar si el formato es correcto', (done) => {
        let user = {
          email: 'pepe@pepe.com',
          password: 'pe',
          nick: 'Pepi3',
          nombre: 'P',
          apellidos: 'García'
        }

        agent
        .post('/users/validar')
        .send(user)
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.body).to.deep.equal({
            todoBien: false,
            email: false,
            password: false,
            nick: true,
            nombre: false,
            apellidos: true
          })
          done()
        })
      })
    })
    describe('al enviar un usuario malformado', () => {
      it('se debe validar si el formato es correcto', (done) => {
        let user = {
          email: 'otro@otro.com',
          password: 'pe',
          nick: 'Pepi3',
          nombre: 'P',
          apellidos: 'García'
        }

        agent
        .post('/users/validar')
        .send(user)
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.body).to.deep.equal({
            todoBien: false,
            email: true,
            password: false,
            nick: true,
            nombre: false,
            apellidos: true
          })
          done()
        })
      })
    })
    describe('al enviar un usuario malformado', () => {
      it('se debe validar si el formato es correcto', (done) => {
        let user = {
          email: 'otro@otro.com',
          password: 'pepepepepepe',
          nick: 'Otro123456',
          nombre: 'Pepe',
          apellidos: 'García'
        }

        agent
        .post('/users/validar')
        .send(user)
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.body).to.deep.equal({
            todoBien: true,
            email: true,
            password: true,
            nick: true,
            nombre: true,
            apellidos: true
          })
          done()
        })
      })
    })
  })
  describe('#whoami', () => {
    describe('si no ha iniciado sesión ', () => {
      it('debe enviar la información del usuario', (done) => {
        agent
        .get('/users/whoami')
        .send()
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.body).to.deep.equal({info: null})
          done()
        })
      })
    })
    describe('si ha iniciado sesión ', () => {
      before((done) => {
        let user = {
          email: 'pepe@pepe.com',
          password: 'pepe',
          nick: 'Pepito123',
          nombre: 'Pepe',
          apellidos: 'García'
        }

        agent
        .post('/users/login')
        .send(user).end(() => {
          done()
        })
      })
      after((done) => {
        agent
        .post('/users/logout')
        .send().end(() => {
          done()
        })
      })
      it('debe enviar la información del usuario', (done) => {
        agent
        .get('/users/whoami')
        .send()
        .expect(200)
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.body).to.deep.equal({info: 'Pepito123'})
          done()
        })
      })
    })
  })

  describe('#show', () => {
    describe('al pedir la información de un usuario ', () => {
      it('se debe recibir su información y sus rutas', (done) => {
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
          expect(res.body.rutas[0].id).to.equal(2)
          expect(res.body.rutas[0].origen).to.equal(20)
          expect(res.body.rutas[0].destino).to.equal(3)
          expect(res.body.user.nombre).to.equal('Pepe')
          expect(res.body.user.apellidos).to.equal('García')
          expect(res.body.user.email).to.equal('pepe@pepe.com')
          done()
        })
      })
    })
  })
})
