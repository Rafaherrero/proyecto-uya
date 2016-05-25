'use strict'
module.exports = function (sequelize, DataTypes) {
  var Ruta = sequelize.define('Ruta', {
    propietario: DataTypes.INTEGER,
    origen: DataTypes.INTEGER,
    destino: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    },
    tableName: 'Rutas'
  })
  return Ruta
}
