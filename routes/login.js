(() => {
    'use strict';
    module.exports = function(passport) {
        const express = require('express');
        const router = express.Router();

        router.post('/', passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/',
            failureFlash: true
        }));
        return router;
    };
})();
