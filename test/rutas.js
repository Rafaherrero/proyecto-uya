/* global describe, before, after, it */

'use strict'

var expect = require('chai').expect
process.env.NODE_ENV = 'test'
var models = require('../app/models/index')

var app = require('../bin/www') // Cargar la aplicación

var agent = require('supertest-as-promised').agent(app)

describe('Rutas', () => {
  before((done) => {
    Promise.all(limpiaBD()).then(() => {
      let user = {
        email: 'pepe@pepe.com',
        password: 'pepe',
        nick: 'Pepito123',
        nombre: 'Pepe',
        apellidos: 'García'
      }
      registraGente(user).then(() => {
        iniciaSesion(user).then(() => {
          done()
        })
      })
    })
  })
  after((done) => {
    cierraSesion().then(() => done())
  })
  describe('#create', () => {
    describe('al pedir todas las ciudades', () => {
      it('si se le pasa correctamente la ruta', (done) => {
        let ruta = {
          origen: 19, // La Laguna
          destino: 25 // El Sauzal
        }
        agent
        .post('/users/Pepito123/rutas')
        .send(ruta)
        .expect(201)
        .then((res) => {
          expect(res.error.text).to.equal(undefined)
          done()
        }).catch((err) => done(err))
      })
    })
    describe('si ya existe el usuario', () => {
      it('se devuelve un error', (done) => {
        let ruta = {
          origen: 19, // La Laguna
          destino: 25 // El Sauzal
        }
        agent
        .post('/users/Pepito123/rutas')
        .send(ruta)
        .expect(400)
        .then((res) => {
          expect(res.error.text).to.equal('Esa ruta ya existe')
          done()
        }).catch((err) => done(err))
      })
    })
    describe('si ya existe el usuario', () => {
      it('se devuelve un error', (done) => {
        let ruta = {
          origen: 19, // La Laguna
          destino: 25 // El Sauzal
        }
        agent
        .post('/users/otrousuario/rutas')
        .send(ruta)
        .expect(403)
        .then((res) => {
          expect(res.error.text).to.equal('No puedes crearle rutas a otros usuarios')
          done()
        }).catch((err) => done(err))
      })
    })
  })
  describe('#index', () => {
    describe('al pedir las rutas', () => {
      it('se deben enviar las rutas que coinciden', (done) => {
        let ruta = {
          origen: 19, // La Laguna
          destino: 25 // El Sauzal
        }
        agent
        .get('/rutas')
        .send(ruta)
        .expect(200)
        .then((res) => {
          expect(res.error.text).to.equal(undefined)
          expect(res.body).to.deep.equal([
            {nick: 'Pepito123'}
          ])
          done()
        }).catch((err) => done(err))
      })
    })
    describe('si una ruta no existe', () => {
      it('se deben enviar las rutas que coinciden', (done) => {
        let ruta = {
          origen: 10, // La Guancha
          destino: 25 // El Sauzal
        }
        agent
        .get('/rutas')
        .send(ruta)
        .expect(404)
        .then((res) => {
          expect(res.error.text).to.equal('No se ha encontrado ningún usuario con esos parámetros')
          done()
        }).catch((err) => done(err))
      })
    })
  })

  describe('#show', () => {
    describe('al pedir una ruta en concreto', () => {
      it('se debe devolver su informacion', (done) => {
        agent
        .get('/rutas/1')
        .send()
        .expect(200)
        .then((res) => {
          expect(res.error.text).to.equal(undefined)
          expect(res.body).to.deep.equal({
            propietario: 1,
            origen: 'San Cristóbal de La Laguna',
            destino: 'El Sauzal'
          })
          done()
        }).catch((err) => done(err))
      })
    })
  })
})

function limpiaBD () {
  let p1 = models.Ruta.destroy({
    where: {},
    truncate: true
  })
  let p2 = models.Usuario.destroy({
    where: {},
    truncate: true
  })

  return [p1, p2]
}

function registraGente (user) {
  return agent
  .post('/users/signup')
  .send(user)
}

function iniciaSesion (user) {
  return agent
  .post('/users/login')
  .send(user)
}

function cierraSesion () {
  return agent
  .post('/users/logout')
  .send()
}
