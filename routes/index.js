(() => {
    'use strict';
    const express = require('express');
    const router = express.Router();
    // Página principal
    router.get('/', (req, res) => {
        res.render('index', {
            title: 'Sharis',
            user: req.user,
            messageSingup: req.flash('signupMessage'),
            path: 'index'
        });
    });

    module.exports = router;
})();
