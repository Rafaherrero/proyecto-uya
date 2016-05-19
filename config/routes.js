(() => {
    'use strict';
    module.exports = (app, passport) => {

        var UsersController = controller('users', passport);

        app.post('/signup', UsersController.create.bind(UsersController));
        app.post('/login', UsersController.login.bind(UsersController));
        app.post('/logout', UsersController.logout.bind(UsersController));

    };

    function controller(name, param) {
        var aux = require(`../app/controllers/${name}.js`);
        return new aux(param);
    }
})();
