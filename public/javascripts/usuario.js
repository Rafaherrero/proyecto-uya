/* global $ */

((exports) => {
  let NICK = ''
  let CIUDADES_GLOBAL = []

  function generarRuta (id, origen, destino) {
    return `
    <div class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title">
              ${CIUDADES_GLOBAL[origen - 1].nombre} - ${CIUDADES_GLOBAL[destino - 1].nombre}
            </span>
            <p></p>
          </div>
          <div class="card-action">
            <a href="#">Ver ruta</a>
            <a href="#" class="elminarRuta" laid="${id}">
              Eliminar ruta
            </a>
          </div>
        </div>
      </div>
    </div>
    `
  }

  const noHayRutas =
  `
  <div class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title">No tienes rutas! :(</span>
            <p>En el botón debajo de tu perfil, puedes añadir una nueva ruta</p>
          </div>
        </div>
      </div>
    </div>
  `

  function rutaOpcion (id, ciudad) {
    return `<option value="${id}">${ciudad}</option>`
  }

  $(() => {
    $('#formNuevaRuta').submit(crearNuevaRuta)

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
            establecerDatos(data.user)
            establacerRutas(data.rutas)
          }, 'json')
        }, 'json')
      }
    }, 'json')
  })

  function establecerDatos (usuario) {
    $('.profile').initial({name: usuario.nombre})
    $('#breadNombre').html(`Tu perfil (${usuario.nick})`)
    $('#nombreCompleto').html(`${usuario.nombre} ${usuario.apellidos}`)
    $('#correoUsuario').html(usuario.email)
    NICK = usuario.nick
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

  function establacerRutas (rutas) {
    let stringFinal = ''
    if (rutas.length === 0) {
      stringFinal = noHayRutas
    } else {
      rutas.forEach((ruta) => {
        stringFinal += generarRuta(ruta.id, ruta.origen, ruta.destino)
      })
    }
    $('#rutas').html(stringFinal)
    $('.elminarRuta').click(eliminaRuta)
  }

  function crearNuevaRuta (e) {
    e.preventDefault()
    let origen = $('#selectOrigen').val()
    let destino = $('#selectDestino').val()

    if (!origen) {
      $('#mensajeError').html('Selecciona un punto de origen')
      return
    }
    if (!destino) {
      $('#mensajeError').html('Selecciona un punto de destino')
      return
    }

    $.post(`http://${exports.REST_CONFIG.IP}:${exports.REST_CONFIG.PORT}/users/${NICK}/rutas`, {origen, destino}, (mensaje) => {
      $('#mensajeError').html('')
      actualizarRutas()
    })
    .fail((err) => {
      $('#mensajeError').html(err.responseText)
    })
  }

  function cambiaDestino (e) {
    $(`#selectOrigen option[value="${e.target.value}"]`).attr('disabled', 'disabled').siblings().removeAttr('disabled')
    $('select').material_select()
  }

  function cambiaOrigen (e) {
    $(`#selectDestino option[value="${e.target.value}"]`).attr('disabled', 'disabled').siblings().removeAttr('disabled')
    $('select').material_select()
  }

  function eliminaRuta (e) {
    e.preventDefault()
    let rutaId = e.target.attributes[2].value
    $.ajax({
      url: `http://${exports.REST_CONFIG.IP}:${exports.REST_CONFIG.PORT}/rutas/${rutaId}`,
      type: 'DELETE',
      success: (result) => {
        actualizarRutas()
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }

  function actualizarRutas () {
    $.get(`http://${exports.REST_CONFIG.IP}:${exports.REST_CONFIG.PORT}/users/${NICK}`,
      (data) => {
        establacerRutas(data.rutas)
      }, 'json'
    )
  }
})(this)

