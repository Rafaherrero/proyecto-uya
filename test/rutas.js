/* global describe, before, after, it */

'use strict'

var request = require('supertest')
var expect = require('chai').expect
process.env.NODE_ENV = 'test'
var models = require('../app/models/index')

var app = require('../bin/www') // Cargar la aplicación

var agent = request.agent(app)

describe('Rutas', () => {
  before((done) => {
    models.Ruta.destroy({
      where: {},
      truncate: true
    }).then(() => {
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
    }).catch((err) => {
      console.log('ERROR')
      done(err)
    })
  })
  after((done) => {
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
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.error.text).to.equal('Esa ruta ya existe')
          done()
        })
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
        .end((err, res) => {
          if (err) {
            console.error(res.error)
            done(err)
            return
          }
          expect(res.error.text).to.equal('No puedes crearle rutas a otros usuarios')
          done()
        })
      })
    })
  })
})
