var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
    var Usuario = require('../app/models/index').usuario

    // se usa para serializar los usuarios para la sesión (el módulo de express)
    passport.serializeUser(function(user, done) {
        done(null, user.email);
    });

    // para deserializiarlo
    passport.deserializeUser(function(id, done) {
        Usuario
            .find({ id: id })
            .then(function(user) {
             done(null, user);
  });
    });

    // REGISTRO
    passport.use('local-signup', new LocalStrategy(
        {
            // por defecto, local strategy usa el nombre de usuaro y la contraseña,
            // pero nosotros usamos el email y contraseña.
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // nos permite devolver la petición a la callback
        },
        function(req, email, password, done) {
            // encontrar un usuario cuyo email es el mismo que el del formulario
            Usuario.findOne({ where: {email: email} }).then(function(user) {
                if (user) {
                    var err = new Error('El usuario ya existe');
                    err.status = 400;
                    return done(err);
                } else {
                    // si no existe, crear uno nuevo
                    Usuario.create({
                        email: email,
                        password: password,
                        // TODO: Se debería aplicar una función hash a la contraseña, pero mejor
                        // no para hacer demostraciones en la base de datos.
                        nick: req.body.nick,
                        nombre: req.body.nombre,
                        apellidos: req.body.apellidos,
                        cumpleanos: req.body.cumpleanos,
                        telefono: req.body.telefono
                    }).then(function(newUser) {
                        return done(null, newUser);
                    }).catch(function(err) {
                        return done(err)
                    });
                }
            });
        }
    ));

    // INICIO DE SESIÓN
    passport.use('local-login', new LocalStrategy(
        {
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) { //callback con el email y la contraseña del formulario
            Usuario.findOne({ where: {email: email} }).then(function(user) {
                // Si no se encontró al usuario, devolver el error
                if (!user){
                    var err = new Error('Ese usuario no existe');
                    err.status = 404;
                    return done(err);
                }

                // Si existe el usuario, pero la contraseña está mal, devolver error
                if (user.password !== password){
                    var err = new Error('La contraseña es errónea');
                    err.status = 400;
                    return done(err);
                }

                // si todo fue bien, devolver el usuario
                return done(null, user);
            })

        }
    ));
};
