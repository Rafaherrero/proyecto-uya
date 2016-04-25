(() => {
    'use strict';
    const express = require('express');
    const router = express.Router();
    // Página principal
    router.get('/', (req, res) => {
        res.render('index', {
            title: 'Sharis'
        });
    });
    module.exports = router;
})();
