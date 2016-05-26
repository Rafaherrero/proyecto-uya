/* global $ */

(() => {
  const IP_SERVIDOR = '192.168.1.198'

  $(() => {
    // Necesitamos algo para saber si estamos iniciados
    $.post(`http://${IP_SERVIDOR}:8080/users/signup`, {
    },
    (data) => {}, 'json')
    .fail((err) => {
      console.log('HE FALLADO :(')
      console.log()
      if (err.responseText === 'Ya tienes una sesión iniciada') {
        ponerMisdatos()
      } else {
        ponerNavNormal()
      }
    })
  })

  function ponerMisdatos () {
    console.log('Tienes una sesión iniciada, así que voy a mostrar cerrar ssesión y tu perfil')
  }

  function ponerNavNormal () {
    console.log('No tienes una sesión iniciada, así que pongo en el navbar registrarse e inicar sesion')
  }
})()
