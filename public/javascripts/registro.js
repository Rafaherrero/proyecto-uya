/* global $ */

((exports) => {
  const IP_SERVIDOR = '192.168.1.198'

  'use strict'
  $(() => {
    // Comprobar que el formato es válido

    $('#nombre').keyup(validarConPattern)
    $('#apellidos').keyup(validarConPattern)
    $('#nick').keyup(validarConPattern)
    $('#email').keyup(validarConPattern)
    $('#password').keyup(validarConPattern)

    $('#nick').blur(comprobarExisteUsuario)
  })

  function validarConPattern (e) {
    let campo = $(this)
    let valor = campo.val()
    let exp = new RegExp(campo.attr('pattern'))

    console.log(valor)
    console.log(exp)
    if (!exp.test(valor)) {
      campo.addClass('invalid')
      campo.removeClass('valid')
    } else {
      campo.addClass('valid')
      campo.removeClass('invalid')
    }
  }

  /*
  function comprobarExisteUsuario (e) {
    console.log('Soy unfocus')
    let campo = $(this)
    let valor = campo.val()

    $.post(`http://${IP_SERVIDOR}:8080/validamiform`, {
      nick: valor
    },
    (data) => {
      console.log('Hemos obtenido respuesta')
      console.log(data)
    }, 'jsonp')
    .fail((err) => {
      console.log('Hubo un error')
      console.log(err)
    })
  }
  */

})(this)
