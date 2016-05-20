(() => {
    'use strict';

    var fs        = require('fs');
    var path      = require('path');
    var Sequelize = require('sequelize'); // Paquete manejador de la base de datos
    var sequelize = new Sequelize('sharis', 'root', 'uya1234'); // Insancia de conexióna a la base de datos
    var db        = {};  // Variables que vamos a exportar (la librería y los modelos)

    fs
        .readdirSync(__dirname)
        .filter(function(file) {
            return (file.indexOf('.') !== 0) && (file !== 'index.js') && (/.*\.js/.test(file));
        })
        .forEach(function(file) {
            var model = sequelize.import(path.join(__dirname, file));
            db[model.name] = model;
        });

    Object.keys(db).forEach(function(modelName) {
        if ('associate' in db[modelName]) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    db.sequelize.sync().then(function() {
        console.log('Conectado al servidor SQL');
    }).error(function(error) {
        console.log('Error al conectar con el servidor SQL');
        console.log(error);
    });

    module.exports = db;
})();
