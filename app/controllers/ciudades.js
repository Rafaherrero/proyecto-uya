(() => {
  'use strict'

  class CiudadesController {
    constructor () {
      this.Ciudad = require('../models/index').Ciudad
    }

    index (req, res) {
      this.Ciudad.findAll({
        attributes: [
          'id',
          'nombre'
        ]
      }).then((ciudades) => {
        res.send(ciudades)
      })
    }
  }

  module.exports = CiudadesController
})()
