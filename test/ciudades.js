/* global describe, it */

'use strict'

var request = require('supertest')
var expect = require('chai').expect
process.env.NODE_ENV = 'test'

var app = require('../bin/www') // Cargar la aplicación

var agent = request.agent(app)

describe('Ciudad', () => {
  describe('#index', () => {
    describe('al pedir todas las ciudades', () => {
      it('se debe enviar un array con las ciudades', (done) => {
        let resultado = [
          { id: 1, nombre: 'Adeje' },
          { id: 2, nombre: 'Arafo' },
          { id: 3, nombre: 'Arico' },
          { id: 4, nombre: 'Arona' },
          { id: 5, nombre: 'Buenavista del Norte' },
          { id: 6, nombre: 'Candelaria' },
          { id: 7, nombre: 'Fasnia' },
          { id: 8, nombre: 'Garachico' },
          { id: 9, nombre: 'Granadilla de Abona' },
          { id: 10, nombre: 'La Guancha' },
          { id: 11, nombre: 'Guía de Isora' },
          { id: 12, nombre: 'Güímar' },
          { id: 13, nombre: 'Icod de los Vinos' },
          { id: 14, nombre: 'La Matanza de Acentejo' },
          { id: 15, nombre: 'La Orotava' },
          { id: 16, nombre: 'Puerto de la Cruz' },
          { id: 17, nombre: 'Los Realejos' },
          { id: 18, nombre: 'El Rosario' },
          { id: 19, nombre: 'San Cristóbal de La Laguna' },
          { id: 20, nombre: 'San Juan de la Rambla' },
          { id: 21, nombre: 'San Miguel de Abona' },
          { id: 22, nombre: 'Santa Cruz de Tenerife' },
          { id: 23, nombre: 'Santa Úrsula' },
          { id: 24, nombre: 'Santiago del Teide' },
          { id: 25, nombre: 'El Sauzal' },
          { id: 26, nombre: 'Los Silos' },
          { id: 27, nombre: 'Tacoronte' },
          { id: 28, nombre: 'El Tanque' },
          { id: 29, nombre: 'Tegueste' },
          { id: 30, nombre: 'La Victoria de Acentejo' }
        ]

        agent
        .get('/ciudades')
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
})
