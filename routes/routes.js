(() => {
    'use strict';
    module.exports = (app, db, passport) => {/*
        // Guardamos las rutas que nos proporciona index en index
        const index = require('./index');
        const login = require('./login')(passport);
        const signup = require('./signup')(passport);
        const logout = require('./logout')();
        const about = require('./about');

        // Rutas. Por defecto, que vaya al index.ejs
        app.use('/', index);
        app.use('/login', login);
        app.use('/signup', signup);
        app.use('/logout', logout);
        app.use('/about', about);*/
        app.get('/', function(req, res){
            res.send('hello world');
        });

        var Usuario = require('../db/models/usuario')(db)

        Usuario.findOne().then(function (user) {
            console.log(user.get('username'));
        });
    };
})();
