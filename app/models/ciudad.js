'use strict'
module.exports = function (sequelize, DataTypes) {
  var Ciudad = sequelize.define('Ciudad', {
    nombre: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    },
    tableName: 'Ciudades'
  })
  return Ciudad
}
