(() => {
    'use strict';
    module.exports = (app, passport) => {

        var UsersController = controller('users', passport);

        app.get('/users', UsersController.index.bind(UsersController));
        app.post('/users/signup', UsersController.create.bind(UsersController));
        app.post('/users/login', UsersController.login.bind(UsersController));
        app.post('/users/logout', UsersController.logout.bind(UsersController));

    };

    function controller(name, param) {
        const Controller = require(`../app/controllers/${name}.js`);
        return new Controller(param);
    }
})();
