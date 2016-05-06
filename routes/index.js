(() => {
    'use strict';
    const express = require('express');
    const router = express.Router();
    // Página principal
    router.get('/', (req, res) => {
        res.render('index', {
            title: 'Sharis',
            user: req.user,
            mesageLogin: req.flash('loginMessage'),
            mesageSingup: req.flash('signupMessage')
        });
    });

    module.exports = router;
})();
