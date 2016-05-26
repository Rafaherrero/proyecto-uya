/* global $ */

(() => {
  const IP_SERVIDOR = '192.168.1.198'

  function generarRuta (origen, destino) {
    return `
    <div class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title">${origen} - ${destino}</span>
            <p></p>
          </div>
          <div class="card-action">
            <a href="#">Ver ruta</a>
          </div>
        </div>
      </div>
    </div>
    `
  }

  const demo = [
    {origen: 'La Laguna', destino: 'El Sauzal', id: 4},
    {origen: 'Guamasa', destino: 'El Sauzal', id: 7},
    {origen: 'La Laguna', destino: 'Santa Cruz', id: 11}
  ]

  $(() => {
    $.get(`http://${IP_SERVIDOR}:8080/users/whoami`,
    (nick) => {
      $.get(`http://${IP_SERVIDOR}:8080/users/${nick.info}`,
      (data) => {
        console.log(data)
        $('.profile').initial({name: data.nombre})
        $('#breadNombre').html(data.info)
        $('#nombreCompleto').html(`${data.nombre} ${data.apellidos}`)
        $('#correoUsuario').html(data.email)
        // TODO: $.get rutas del usuario actual
        let stringFinal = ''
        demo.forEach((ruta) => {
          stringFinal += generarRuta(ruta.origen, ruta.destino)
        })
        $('#rutas').html(stringFinal)
      }, 'json')
    }, 'json')
  })
})()

