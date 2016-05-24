'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Ciudades',
      [
      {nombre: 'Adeje', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Arafo', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Arico', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Arona', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Buenavista del Norte', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Candelaria', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Fasnia', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Garachico', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Granadilla de Abona', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'La Guancha', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Guía de Isora', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Güímar', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Icod de los Vinos', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'La Matanza de Acentejo', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'La Orotava', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Puerto de la Cruz', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Los Realejos', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'El Rosario', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'San Cristóbal de La Laguna', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'San Juan de la Rambla', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'San Miguel de Abona', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Santa Cruz de Tenerife', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Santa Úrsula', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Santiago del Teide', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'El Sauzal', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Los Silos', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Tacoronte', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'El Tanque', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'Tegueste', createdAt: new Date(), updatedAt: new Date()},
      {nombre: 'La Victoria de Acentejo', createdAt: new Date(), updatedAt: new Date()} 
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
