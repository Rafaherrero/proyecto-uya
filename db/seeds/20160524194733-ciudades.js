'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    var today = new Date()
    return queryInterface.bulkInsert('Ciudades',
      [
      {nombre: 'Adeje', createdAt: today, updatedAt: today},
      {nombre: 'Arafo', createdAt: today, updatedAt: today},
      {nombre: 'Arico', createdAt: today, updatedAt: today},
      {nombre: 'Arona', createdAt: today, updatedAt: today},
      {nombre: 'Buenavista del Norte', createdAt: today, updatedAt: today},
      {nombre: 'Candelaria', createdAt: today, updatedAt: today},
      {nombre: 'Fasnia', createdAt: today, updatedAt: today},
      {nombre: 'Garachico', createdAt: today, updatedAt: today},
      {nombre: 'Granadilla de Abona', createdAt: today, updatedAt: today},
      {nombre: 'La Guancha', createdAt: today, updatedAt: today},
      {nombre: 'Guía de Isora', createdAt: today, updatedAt: today},
      {nombre: 'Güímar', createdAt: today, updatedAt: today},
      {nombre: 'Icod de los Vinos', createdAt: today, updatedAt: today},
      {nombre: 'La Matanza de Acentejo', createdAt: today, updatedAt: today},
      {nombre: 'La Orotava', createdAt: today, updatedAt: today},
      {nombre: 'Puerto de la Cruz', createdAt: today, updatedAt: today},
      {nombre: 'Los Realejos', createdAt: today, updatedAt: today},
      {nombre: 'El Rosario', createdAt: today, updatedAt: today},
      {nombre: 'San Cristóbal de La Laguna', createdAt: today, updatedAt: today},
      {nombre: 'San Juan de la Rambla', createdAt: today, updatedAt: today},
      {nombre: 'San Miguel de Abona', createdAt: today, updatedAt: today},
      {nombre: 'Santa Cruz de Tenerife', createdAt: today, updatedAt: today},
      {nombre: 'Santa Úrsula', createdAt: today, updatedAt: today},
      {nombre: 'Santiago del Teide', createdAt: today, updatedAt: today},
      {nombre: 'El Sauzal', createdAt: today, updatedAt: today},
      {nombre: 'Los Silos', createdAt: today, updatedAt: today},
      {nombre: 'Tacoronte', createdAt: today, updatedAt: today},
      {nombre: 'El Tanque', createdAt: today, updatedAt: today},
      {nombre: 'Tegueste', createdAt: today, updatedAt: today},
      {nombre: 'La Victoria de Acentejo', createdAt: today, updatedAt: today}
      ], {})
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {})
    */
  }
}
