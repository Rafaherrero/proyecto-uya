(() => {
  'use strict'

  module.exports = function (sequelize, DataTypes) {
    var Usuario = sequelize.define('usuario', {
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nick: {
        type: DataTypes.STRING,
        allowNull: false
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      apellidos: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cumpleanos: {
        type: DataTypes.DATE
      },
      telefono: {
        type: DataTypes.INTEGER
      }
    })

    return Usuario
  }
})()
