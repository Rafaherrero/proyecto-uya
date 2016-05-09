(()=>{
    module.exports = function(db) {
        sequelize = require('sequelize');

        var Usuario = db.define('usuario', {
            // TODO: cambiar los registros
            username: sequelize.STRING,
            birthday: sequelize.DATE
        });

        return Usuario;
    }
})()
