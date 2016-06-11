# Sharis
Sharis es un proyecto para la asignatura de Usabilidad y Accesibilidad, que permite a los usuarios publicar las rutas que hagan para poder ponerse de acuerdo para compartir coche.

## Tecnologías
Está implementado en dos partes. Por un lado tenemos el back-end, que ofrece una API REST hecha en Express. Como base de datos usamos MySQL, y para poder comunicarnos con ella el paquete `sequelize`, que nos proporciona una interfaz de consultas basada en promesas.

Por el lado del front-end, usamos Materialize como framework CSS. Por el lado del Javascript la única librería que usamos es JQuery, ya que era unos de los requisitos el proyecto.

## Instalación

Clonamos el repositorio

`git clone git@github.com:uya-rafa-dani/proyecto.git`

Instalamos las dependencias de back-end y front-end.

```bash
npm install
bower install
```

Una vez hecho esto, debemos preparar la base de datos, para ello nos conectamos a MySQL y ejecutamos los scripts que se localizan en el directorio `app/models/scripts`.
