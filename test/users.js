'use strict';

var request = require('supertest');
var expect = require('chai').expect;
process.env.NODE_ENV = 'test';

var app = require('../bin/www'); // Cargar la aplicación

var agent = request.agent(app);

describe('User', () => {
    describe('#create', () => {
        describe('si se le pasa correctamente el usuario', () => {
            it('debe registrar al usuario', (done) => {
                let user = {
                    email: 'pepe@pepe.com',
                    password: 'pepe',
                    nick: 'Pepito123',
                    nombre: 'Pepe',
                    apellidos: 'García'
                };

                agent
                .post('/signup')
                .send(user)
                .expect(201)
                .end((err, res) => {
                    if (err) {
                        console.error(res.error);
                        done(err);
                        return;
                    }
                    expect(res.body.error).to.equal(undefined);
                    done();
                });
            });
        });
    });
});
