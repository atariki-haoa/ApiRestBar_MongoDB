#ApiRestBar_MongoDB

API RESTful desarrollada en Node.js y MongoDB para la gestión de un bar, proporcionando endpoints para manejar operaciones como la creación, actualización, eliminación y consulta de datos relacionados con el bar.

Características

CRUD para productos, clientes, pedidos, y más.

Integración con MongoDB para la gestión de datos.

Uso de middlewares de autenticación y validación.

Arquitectura modular y escalable.


##Instalación

1. Clona el repositorio:

```
git clone https://github.com/atariki-haoa/ApiRestBar_MongoDB.git
```


2. Instala las dependencias:

```
npm install
```


3. Configura el archivo .env con tus credenciales de MongoDB y variables de entorno.


4. Inicia el servidor:

```
npm start

```

##Endpoints principales

GET /productos: Lista todos los productos.

POST /clientes: Crea un nuevo cliente.

PUT /pedidos/:id: Actualiza un pedido existente.

DELETE /productos/:id: Elimina un producto.


##Tecnologías

Node.js

Express.js

MongoDB

Mongoose


##Contribuciones

Las contribuciones son bienvenidas. Haz un fork del proyecto y envía tus pull requests.
