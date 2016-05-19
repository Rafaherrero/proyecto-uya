'use strict';

var request = require('supertest');
var expect = require('chai').expect;
process.env.NODE_ENV = 'test';

var app = require('../bin/www'); // Cargar la aplicación
var models = require('../app/models/index');

var agent = request.agent(app);

describe('User', () => {
    describe('#create', () => {
        describe('si se le pasa correctamente el usuario', () => {
            after((done) => {
                models.usuario.destroy({
                    where: {},
                    truncate: true
                }).then(() => {
                    done();
                }).catch((err) => {
                    done(err);
                });
            });
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
        describe('si no se le pasa el email', () => {
            it('debe fallar y enviar un error', (done) => {
                let user = {
                    password: 'pepe',
                    nick: 'Pepito123',
                    nombre: 'Pepe',
                    apellidos: 'García'
                };

                agent
                .post('/signup')
                .send(user)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        console.error(res.error);
                        done(err);
                        return;
                    }
                    expect(res.error.text).to.equal('Necesitas un correo para registrarte');
                    done();
                });
            });
        });
        describe('si no se le pasa la contraseña', () => {
            it('debe fallar y enviar un error', (done) => {
                let user = {
                    email: 'pepe@pepe.com',
                    nick: 'Pepito123',
                    nombre: 'Pepe',
                    apellidos: 'García'
                };

                agent
                .post('/signup')
                .send(user)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        console.error(res.error);
                        done(err);
                        return;
                    }
                    expect(res.error.text).to.equal('Necesitas una contraseña para registrarte');
                    done();
                });
            });
        });
        describe('si no se le pasa el nick', () => {
            it('debe fallar y enviar un error', (done) => {
                let user = {
                    email: 'pepe@pepe.com',
                    password: 'pepe',
                    nombre: 'Pepe',
                    apellidos: 'García'
                };

                agent
                .post('/signup')
                .send(user)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        console.error(res.error);
                        done(err);
                        return;
                    }
                    expect(res.error.text).to.equal('Necesitas un nick para registrarte');
                    done();
                });
            });
        });
        describe('si no se le pasa el nombre', () => {
            it('debe fallar y enviar un error', (done) => {
                let user = {
                    email: 'pepe@pepe.com',
                    password: 'pepe',
                    nick: 'Pepito123',
                    apellidos: 'García'
                };

                agent
                .post('/signup')
                .send(user)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        console.error(res.error);
                        done(err);
                        return;
                    }
                    expect(res.error.text).to.equal('Necesitas un nombre para registrarte');
                    done();
                });
            });
        });
        describe('si no se le pasan los apellidos', () => {
            it('debe fallar y enviar un error', (done) => {
                let user = {
                    email: 'pepe@pepe.com',
                    password: 'pepe',
                    nick: 'Pepito123',
                    nombre: 'Pepe'
                };

                agent
                .post('/signup')
                .send(user)
                .expect(400)
                .end((err, res) => {
                    if (err) {
                        console.error(res.error);
                        done(err);
                        return;
                    }
                    expect(res.error.text).to.equal('Necesitas un apellido para registrarte');
                    done();
                });
            });
        });
    });
    describe('#login', () => {
        describe('si se le pasa correctamente el usuario', () => {
            before((done) => {
                models.usuario.create({
                    email: 'pepe@pepe.com',
                    password: 'pepe',
                    nick: 'Pepito123',
                    nombre: 'Pepe',
                    apellidos: 'García'
                }).then(() => {
                    done();
                });
            });
            it('debe loginear al usuario', (done) => {
                let user = {
                    email: 'pepe@pepe.com',
                    password: 'pepe',
                };

                agent
                .post('/login')
                .send(user)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        console.error(res.error);
                        done(err);
                        return;
                    }
                    done();
                });
            });
        });
    });
});
