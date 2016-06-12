# Sharis
Sharis es un proyecto para la asignatura de Usabilidad y Accesibilidad, que permite a los usuarios publicar las rutas que hagan para poder ponerse de acuerdo para compartir coche.

## Tecnologías
Está implementado en dos partes. Por un lado tenemos el back-end, que ofrece una API REST hecha en Express. Como base de datos usamos MySQL, y para poder comunicarnos con ella el paquete `sequelize`, que nos proporciona una interfaz de consultas basada en promesas.

Por el lado del front-end, usamos Materialize como framework CSS y respecto a Javascript la única librería que usamos es JQuery, ya que era unos de los requisitos el proyecto.

## Instalación

Clonamos el repositorio

`git clone git@github.com:uya-rafa-dani/proyecto.git`

Instalamos las dependencias de back-end y front-end.

```bash
npm install
bower install
```

Una vez hecho esto, debemos preparar la base de datos, para ello nos conectamos a MySQL y ejecutamos los scripts que se localizan en el directorio `app/models/scripts`.

```sql
mysql -u root -p
mysql> source app/models/scripts/ciudades.sql
mysql> source app/models/scripts/rutas.sql
mysql> source app/models/scripts/usuarios.sql
```

Ahora que tenemos la base de datos construida, debemos configurar la API rest y el cliente. Cambiamos en la línea 48 de `app.js` y ponemos la IP de la máquina que sirve los ficheros HTML. También cambiamos la línea #3 y #4 del fichero `public/javascripts/server-config.js` con la IP y el puerto del servidor.

Esto es necesario ya que usamos paquetes de autenticación.

## Abrimos los servidores

Recordemos que la API REST es independiente del servidor que sirve los ficheros de front-end. Para encender la API REST ejecutamos `npm start` en el directorio raíz del servidor. Ahora podemos servir nuestros ficheros HTML como queramos, por ejemplo con el paquete de node `http-server`.

## Autores
* [Rafa Herrero](http://rafaherrero.github.io/)
* [Daniel Ramos](http://danielramosacosta.github.io/#/)
