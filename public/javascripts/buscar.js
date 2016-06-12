/* global $ */

((exports) => {
  let CIUDADES_GLOBAL = []

  $(() => {
    /* INICIALIZACIÓN */
    $.get(`http://${exports.REST_CONFIG.IP}:${exports.REST_CONFIG.PORT}/users/whoami`,
    (nick) => {
      if (!nick.info) {
        window.location.href = 'login.html'
      } else {
        $.get(`http://${exports.REST_CONFIG.IP}:${exports.REST_CONFIG.PORT}/users/${nick.info}`,
        (data) => {
          $.get(`http://${exports.REST_CONFIG.IP}:${exports.REST_CONFIG.PORT}/ciudades`,
          (ciudades) => {
            establecerCiudades(ciudades)
          }, 'json')
        }, 'json')
      }
    }, 'json')

    $('#buscar_form').submit(buscarRutas)
  })

  function rutaOpcion (id, ciudad) {
    return `<option value="${id}">${ciudad}</option>`
  }

  function establecerCiudades (ciudades) {
    CIUDADES_GLOBAL = ciudades
    ciudades.forEach((ciudad) => {
      $('#selectOrigen').append(rutaOpcion(ciudad.id, ciudad.nombre))
      $('#selectDestino').append(rutaOpcion(ciudad.id, ciudad.nombre))
    })
    $('select').material_select()
    $('#selectOrigen').change(cambiaOrigen)
    $('#selectDestino').change(cambiaDestino)
  }

  function cambiaDestino (e) {
    $(`#selectOrigen option[value="${e.target.value}"]`).attr('disabled', 'disabled').siblings().removeAttr('disabled')
    $('select').material_select()
  }

  function cambiaOrigen (e) {
    $(`#selectDestino option[value="${e.target.value}"]`).attr('disabled', 'disabled').siblings().removeAttr('disabled')
    $('select').material_select()
  }

  function buscarRutas (e) {
    e.preventDefault()
    let origen = $('#selectOrigen').val()
    let destino = $('#selectDestino').val()

    console.log(origen)
    console.log(destino)

    if (!origen) {
      $('#mensajeError').html('Selecciona un punto de origen')
      return
    }
    if (!destino) {
      $('#mensajeError').html('Selecciona un punto de destino')
      return
    }

    $.get(`http://${exports.REST_CONFIG.IP}:${exports.REST_CONFIG.PORT}/rutas`, {origen, destino})
    .done((rutas) => {
      $('#mensajeError').html('')
      console.log(rutas)
      anadirRutas(rutas)
    })
    .fail((err) => {
      console.log(err)
      $('#mensajeError').html(err.responseText)
    })

    function anadirRutas (rutas) {
      if (rutas.length === 0) {
        console.log('La ruta no coiincide')
        $('#error_output').html('No se han encontrado rutas coincidentes, lo sentimos')
      } else {
        $('#error_output').html('')
        let cantidadFilas = 1
        let cantidadRutas = rutas.length
        let cantidadColUltimaFila = cantidadRutas

        while (cantidadColUltimaFila > 3) {
          cantidadFilas++
          cantidadColUltimaFila = cantidadColUltimaFila - 3
        }

        console.log(`Tenemos ${cantidadFilas} filas`)
        console.log(`En la última fila van ${cantidadColUltimaFila} columnas`)
        let todo = ''
        let ra = 0
        for (let i = 0; i < cantidadFilas; i++) {
          let innerRow = ''
          if (i === cantidadFilas - 1) {
            // Última fila
            for (let j = 0; j < cantidadColUltimaFila; j++) {
              innerRow += generarCol(generarCard(`
                ${CIUDADES_GLOBAL[rutas[ra].origen - 1].nombre} - ${CIUDADES_GLOBAL[rutas[ra].destino - 1].nombre}
              `, `
              <div class="chip" tabindex="0">
                <img alt="" aria-hidden id="profile_${rutas[ra].propietario.nick}">
                ${rutas[ra].propietario.nombre} ${rutas[ra].propietario.apellidos}
              </div>
              `), 12, 12, 12 / cantidadColUltimaFila)
              ra++
            }
          } else {
            for (let j = 0; j < 3; j++) {
              innerRow += generarCol(generarCard(`
                ${CIUDADES_GLOBAL[rutas[ra].origen - 1].nombre} - ${CIUDADES_GLOBAL[rutas[ra].destino - 1].nombre}
              `, `
              <div class="chip" tabindex="0">
                <img alt="" aria-hidden id="profile_${rutas[ra].propietario.nick}">
                ${rutas[ra].propietario.nombre} ${rutas[ra].propietario.apellidos}
              </div>
              `), 12, 12, 4)
              ra++
            }
          }
          console.log(innerRow)
          todo += generarRow(innerRow)
        }
        $('#rutas-wrapper').html(todo)
        rutas.forEach((ruta) => {
          $(`#profile_${ruta.propietario.nick}`).initial({name: ruta.propietario.nombre})
        })
      }
    }
  }

  function generarRow (contenido) {
    return `<div class="row">${contenido}</div>`
  }

  function generarCol (contenido, s, m, l) {
    if (s) {
      s = `s${s}`
    } else {
      s = ''
    }
    if (m) {
      m = `m${m}`
    } else {
      m = ''
    }
    if (l) {
      l = `l${l}`
    } else {
      l = ''
    }

    return `<div class="col ${s} ${m} ${l}">${contenido}</div>`
  }

  function generarCard (titulo, descripcion) {
    return `
    <div class="card">
      <div class="card-content">
        <span class="card-title" tabindex="0">
          ${titulo}
        </span>
        <p>${descripcion}</p>
      </div>
      <div class="card-action">
        <a href="#">Ver ruta</a>
      </div>
    </div>
    `
  }

  function cardErr () {
    return `
      <span>No hay rutas</span>
    `
  }
})(this)
