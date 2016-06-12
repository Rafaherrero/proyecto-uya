/* global $ */

((exports) => {
  console.log()

  const noIniciado2 =
  `
    <li>
      <a tabindex="-1" href="../html/registro.html">Registrarse</a>
    </li>
    <li>
      <a tabindex="-1" href="../html/login.html">Iniciar Sesion</a>
    </li>
  `

  const noIniciado =
  `
    <li>
      <a href="../html/registro.html">Registrarse</a>
    </li>
    <li>
      <a href="../html/login.html">Iniciar Sesion</a>
    </li>
  `

  function iniciado (attr, mob) {
    let busEscritorio = `
      <li>
        <a href="../html/buscar.html" ${attr} class="tooltipped" data-position="bottom" data-delay="50" data-tooltip="Buscar" aria-labelledby="buscar">
          <i class="fa fa-search" aria-hidden="true"></i>
        </a>
      </li>
    `

    let busMobil = `
      <li>
        <a href="../html/buscar.html" ${attr} >Buscar</a>
      </li>
    `

    let resto = `
      <li>
        <a href="../html/usuario.html" ${attr} >Tu Perfil</a>
      </li>
      <li>
        <a href="#" id='cerrarSesion' ${attr} >Cerrar Sesión</a>
      </li>
      <span id="buscar" class="hide">Buscar</span>
    `

    if (mob) {
      return busMobil + resto
    }

    return busEscritorio + resto
  }

  $(() => {
    $.get(`http://${exports.REST_CONFIG.IP}:${exports.REST_CONFIG.PORT}/users/whoami`,
    (data) => {
      console.log(data)
      if (data.info == null) {
        ponerNavNormal()
      } else {
        ponerMisdatos()
      }
      $('.tooltipped').tooltip({delay: 50})

      $('#cerrarSesion').click(cierraSesion)
    }, 'json')
  })

  function ponerMisdatos () {
    console.log('Tienes una sesión iniciada, así que voy a mostrar cerrar sesión y tu perfil')
    $('#lista-uno').html(iniciado())
    $('#mobile-demo').html(iniciado('tabindex="-1"', true))
  }

  function ponerNavNormal () {
    console.log('No tienes una sesión iniciada, así que pongo en el navbar registrarse e inicar sesion')
    $('#lista-uno').html(noIniciado)
    $('#mobile-demo').html(noIniciado2)
  }

  function cierraSesion () {
    $.post(`http://${exports.REST_CONFIG.IP}:${exports.REST_CONFIG.PORT}/users/logout`,
    (data) => {
      console.log(data)
      window.location.href = '../index.html'
    }, 'text')
  }
})(this)
