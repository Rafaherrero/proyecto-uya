/* global $ */

(() => {
  const IP_SERVIDOR = '192.168.1.198'
  let NICK = ''
  let CIUDADES_GLOBAL = []

  function generarRuta (id, origen, destino) {
    console.log(CIUDADES_GLOBAL)
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

    $.fn.serializeObject = function () {
      var o = {}
      var a = this.serializeArray()
      $.each(a, function () {
        if (o[this.name] !== undefined) {
          if (!o[this.name].push) {
            o[this.name] = [o[this.name]]
          }
          o[this.name].push(this.value || '')
        } else {
          o[this.name] = this.value || ''
        }
      })
      return o
    }

    /* INICIALIZACIÓN */
    $.get(`http://${IP_SERVIDOR}:8080/users/whoami`,
    (nick) => {
      if (!nick.info) {
        window.location.href = 'login.html'
      } else {
        $.get(`http://${IP_SERVIDOR}:8080/users/${nick.info}`,
        (data) => {
          $.get(`http://${IP_SERVIDOR}:8080/ciudades`,
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
    $('#breadNombre').html(usuario.nick)
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
      // Mostrar el div de que no hay rutas
      console.log('Mostrar el div de que no hay rutas')
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
    console.log(origen)
    console.log(destino)
    $.post(`http://${IP_SERVIDOR}:8080/users/${NICK}/rutas`, {origen, destino}, (mensaje) => {
      console.log(mensaje)
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
    console.log('Debo eliminar esta ruta')
    let rutaId = e.target.attributes[2].value

    console.log(rutaId)
    $.ajax({
      url: `http://${IP_SERVIDOR}:8080/rutas/${rutaId}`,
      type: 'DELETE',
      success: (result) => {
        console.log(result)
        actualizarRutas()
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }

  function actualizarRutas () {
    $.get(`http://${IP_SERVIDOR}:8080/users/${NICK}`,
      (data) => {
        establacerRutas(data.rutas)
      }, 'json'
    )
  }
})()

