/* global $ */

(() => {
  const IP_SERVIDOR = '192.168.1.198'

  const noIniciado =
  `
    <li>
      <a href="../html/registro.html">Registrarse</a>
    </li>
    <li>
      <a href="../html/login.html">Iniciar Sesion</a>
    </li>
  `

  const iniciado =
  `
    <li>
      <a href="../html/usuario.html">Tu Perfil</a>
    </li>
    <li>
      <a href="#" id='cerrarSesion'>Cerrar Sesión</a>
    </li>
  `

  $(() => {
    $.get(`http://${IP_SERVIDOR}:8080/users/whoami`,
    (data) => {
      console.log(data)
      if (data.info == null) {
        ponerNavNormal()
      } else {
        ponerMisdatos()
      }

      $('#cerrarSesion').click(cierraSesion)
    }, 'json')
  })

  function ponerMisdatos () {
    console.log('Tienes una sesión iniciada, así que voy a mostrar cerrar ssesión y tu perfil')
    $('#lista-uno').html(iniciado)
    $('#mobile-demo').html(iniciado)
  }

  function ponerNavNormal () {
    console.log('No tienes una sesión iniciada, así que pongo en el navbar registrarse e inicar sesion')
    $('#lista-uno').html(noIniciado)
    $('#mobile-demo').html(noIniciado)
  }

  function cierraSesion () {
    $.post(`http://${IP_SERVIDOR}:8080/users/logout`,
    (data) => {
      console.log(data)
      window.location.href = '../index.html'
    }, 'text')
  }
})()
