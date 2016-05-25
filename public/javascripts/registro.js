/* global $ */

((exports) => {
  const IP_SERVIDOR = '192.168.1.198'

  let default_msg = {
    nombre: 'Tu nombre tiene que tener al menos 2 carácteres',
    apellidos: 'Tus apellidos tiene que tener al menos 2 carácteres',
    nick: 'Nick de mínimo 4 carácteres y sin espacios ni símbolos',
    email: 'Formato de correo erróneo',
    password: 'Contraseña mínimo de 10 carácteres'
  }

  'use strict'
  $(() => {
    // Comprobar que el formato es válido

    $('#nombre').keyup(validarConPattern)
    $('#apellidos').keyup(validarConPattern)
    $('#nick').keyup(validarConPattern)
    $('#email').keyup(validarConPattern)
    $('#password').keyup(validarConPattern)

    $('#nick').blur(comprobarExisteUsuario)
    $('#email').blur(comprobarExisteEmail)

    $('#inicio_sesion').submit(validarForm)

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
  })

  function validarConPattern (e) {
    let campo = $(this)
    let valor = campo.val()
    let exp = new RegExp(campo.attr('pattern'))
    $(`#inicio_sesion label[for='${campo[0].id}']`).attr('data-error', default_msg[campo[0].id])
    if (!exp.test(valor)) {
      campo.addClass('invalid')
      campo.removeClass('valid')
    } else {
      campo.addClass('valid')
      campo.removeClass('invalid')
    }
  }

  function comprobarExisteUsuario (e) {
    let campo = $(this)
    let valor = campo.val()
    let exp = new RegExp(campo.attr('pattern'))
    campo.attr('data-error', 'Ese usuario ya existe')

    if (exp.test(valor)) {
      $.post(`http://${IP_SERVIDOR}:8080/users/validar`, {
        nick: valor
      },
      (data) => {
        if (!data.nick) {
          campo.addClass('invalid')
          campo.removeClass('valid')
          $("#inicio_sesion label[for='nick']").attr('data-error', 'Ese usuario ya existe')
        } else {
          campo.addClass('valid')
          campo.removeClass('invalid')
        }
      }, 'json')
    }
  }

  function comprobarExisteEmail (e) {
    let campo = $(this)
    let valor = campo.val()
    let exp = new RegExp(campo.attr('pattern'))

    if (exp.test(valor)) {
      $.post(`http://${IP_SERVIDOR}:8080/users/validar`, {
        email: valor
      },
      (data) => {
        if (!data.email) {
          campo.addClass('invalid')
          campo.removeClass('valid')
          $("#inicio_sesion label[for='email']").attr('data-error', 'Ese correo ya existe')
        } else {
          campo.addClass('valid')
          campo.removeClass('invalid')
        }
      }, 'json')
    }
  }

  function validarForm (e) {
    e.preventDefault()
    let usuario = $('#inicio_sesion').serializeObject()
    console.log(usuario)
    $.post(`http://${IP_SERVIDOR}:8080/users/validar`, usuario, (data) => {
      if (data.todoBien) {
        $.post(`http://${IP_SERVIDOR}:8080/users/signup`, usuario, (data) => {
          console.log(data)
          window.location.href = 'inicioCorrecto.html'
        })
      }
    }, 'json')
  }
})(this)
