/* global $ */

((exports) => {
  const defaultMsg = {
    email: 'Formato de correo erróneo',
    password: 'Contraseña mínimo de 10 carácteres'
  }

  $(() => {
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

    $('#email').keyup(validarConPattern)
    $('#password').keyup(validarConPattern)
  })

  function validarForm (e) {
    e.preventDefault()
    let usuario = $('#inicio_sesion').serializeObject()
    console.log(usuario)
    $.post(`http://${exports.REST_CONFIG.IP}:${exports.REST_CONFIG.PORT}/users/login`, usuario, (data) => {
      window.location.href = 'usuario.html'
    }, 'text')
    .fail((err) => {
      console.log('he fallado')
      console.log(err.responseText)
      if (/contraseña/.test(err.responseText)) {
        invalidarContraseña(err.responseText)
      } else {
        invalidarCorreo(err.responseText)
      }
    })
  }

  function invalidarContraseña () {
    $('#label_password').attr('data-error', 'La contraseña no es la correcta')
    $('#password').addClass('invalid')
  }

  function invalidarCorreo (err) {
    $('#label_email').attr('data-error', err)
    $('#email').addClass('invalid')
  }

  function validarConPattern () {
    let campo = $(this)
    let valor = campo.val()
    let exp = new RegExp(campo.attr('pattern'))
    $(`#inicio_sesion label[for='${campo[0].id}']`).attr('data-error', defaultMsg[campo[0].id])
    if (!exp.test(valor)) {
      campo.addClass('invalid')
      campo.removeClass('valid')
    } else {
      campo.addClass('valid')
      campo.removeClass('invalid')
    }
  }
})(this)
