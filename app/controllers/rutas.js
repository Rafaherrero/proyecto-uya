(() => {
  'use strict'

  class RutasController {
    constructor () {
      var models = require('../models/index')
      this.Ruta = models.Ruta
      this.Usuario = models.Usuario
      this.Ciudad = models.Ciudad
    }

    index (req, res) {
      if (!req.query.origen) {
        res.status(400).send('Tienes que decirme desde donde quieres ir')
        return
      }
      if (!req.query.destino) {
        res.status(400).send('Tienes que decirme hacia donde quieres ir')
        return
      }

      this.Ruta.findAll({where: {
        origen: parseInt(req.query.origen),
        destino: (req.query.destino)
      }}).then((rutas) => {
        console.log('Rutas encontradas')
        console.log(rutas)
        let promises = []
        rutas.forEach((ruta) => {
          promises.push(this.Usuario.findById(ruta.propietario, {
            attributes: [
              'nick'
            ]
          }))
        })
        Promise.all(promises).then((usuarios) => {
          console.log(usuarios)
          res.send({usuarios, rutas})
        })
      })
    }

    show (req, res) {
      this.Ruta.findById(req.params.id).then((ruta) => {
        if (ruta == null) {
          res.status(404).send('Esa ruta no existe')
          return
        }
        let p1 = this.Ciudad.findById(ruta.origen)
        let p2 = this.Ciudad.findById(ruta.destino)

        Promise.all([p1, p2]).then((quetengo) => {
          res.json({ propietario: ruta.propietario, origen: quetengo[0].nombre, destino: quetengo[1].nombre })
        })
      }).catch((err) => {
        console.log(err)
        return err
      })
    }

    create (req, res, done) {
      console.log('Voy a crear una nueva ruta')
      if (req.session.authenticated !== req.params.nick) {
        res.status(403).send('No puedes crearle rutas a otros usuarios')
        return
      }
      if (!req.body.origen) {
        res.status(400).send('Necesitas un origen de la ruta')
        return
      }
      if (!req.body.destino) {
        res.status(400).send('Necesitas un destino de la ruta')
        return
      }
      //res.status(201).send('La ruta ha sido creada')

      this.Usuario.findOne({where: {nick: req.session.authenticated}}).then((user) => {
        // El usuario tiene que existir, porque ha iniciado sesión
        this.Ruta.findOne({
          where: {
            propietario: user.id,
            origen: req.body.origen,
            destino: req.body.destino
          }
        }).then((ruta) => {
          if (ruta != null) {
            // console.log(ruta)
            res.status(400).send('Esa ruta ya existe')
            return
          }
          this.Ruta.create({
            propietario: user.id,
            origen: req.body.origen,
            destino: req.body.destino
          }).then((newUser) => {
            res.status(201).send('La ruta ha sido creada')
            return
          })
        })
      })
    }

    destroy (req, res) {
      if (!req.session.authenticated) {
        res.status(403).send('Para poder borrar rutas debes estar autenticado')
        return
      }
      this.Usuario.find({where: {nick: req.session.authenticated}}).then((user) => {
        this.Ruta.findById(req.params.id).then((ruta) => {
          if (ruta.propietario === user.id) {
            ruta.destroy().then(() => {
              res.status(200).send('Esa ruta ha sido borrada')
            })
          } else {
            res.status(403).send('No tienes permisos para borrar las rutas de otros usuarios')
          }
        })
      })
    }
  }

  module.exports = RutasController
})()
