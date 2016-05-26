/* global $ */

(() => {
  const IP_SERVIDOR = '192.168.1.198'

  $(() => {
    $.ajaxSetup({
      xhrFields: {
        withCredentials: true
      }
    })

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

  function validarForm (e) {
    e.preventDefault()
    let usuario = $('#inicio_sesion').serializeObject()
    console.log(usuario)
    $.post(`http://${IP_SERVIDOR}:8080/users/login`, usuario, (data) => {
      console.log('he acertao')
      console.log(usuario)
      window.location.href = 'usuario.html'
    }, 'text')
    .fail((err) => {
      console.log('he fallado')
      console.log(err)
    })
  }
})()
