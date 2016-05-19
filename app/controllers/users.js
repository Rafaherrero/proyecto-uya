(() => {
    'use strict'

    class UsersController {
        constructor(passport) {
            this.passport = passport;
        }

        create(req, res, next) {
            if(req.session.authenticated) {
                res.status(400).send('Ya tienes una sesión iniciada');
                return;
            }
            if(!req.body.email) {
                res.status(400).send('Necesitas un correo para registrarte');
                return;
            }
            if(!req.body.password) {
                res.status(400).send('Necesitas una contraseña para registrarte');
                return;
            }
            if(!req.body.nick) {
                res.status(400).send('Necesitas un nick para registrarte');
                return;
            }
            if(!req.body.nombre) {
                res.status(400).send('Necesitas un nombre para registrarte');
                return;
            }
            if(!req.body.apellidos) {
                res.status(400).send('Necesitas un apellido para registrarte');
                return;
            }

            this.passport.authenticate('local-signup', function(err, user) {
                if(err) {
                    res.status(err.status || 500);
                    res.send(err.message);
                    return err;
                }
                res.status(201).send();
            })(req, res, next);
        }

        show(req, res, next) {
            if(req.session.authenticated) {
                res.status(400).send('Ya has iniciado sesión');
                return;
            }
            this.passport.authenticate('local-login', function(err, user) {
                if(err) {
                    res.status(err.status || 500);
                    res.send(err.message);
                    return err;
                }
                req.session.authenticated = true
                res.status(200).send();
            })(req, res, next);
        }

        logout(req, res, next) {
            if(!req.session.authenticated) {
                res.status(400).send('No has iniciado sesión, asi que no puedes cerrarla');
                return;
            }
            req.logout();
            req.session.authenticated = null;
            res.send('Has cerrado la sesión');
        }
    }

    module.exports = UsersController;

})()
