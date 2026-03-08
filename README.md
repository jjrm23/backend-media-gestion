# API REST - Sistema de Gestion de Media (IUDigital)

Este proyecto es una API REST desarrollada para la gestion de contenidos multimedia (peliculas y series). Permite administrar directores, generos, productoras, tipos de contenido y la informacion principal de cada obra.

Desarrollador: Jhon Rivera
Institucion: Institucion Universitaria Digital de Antioquia (IUDigital)

## Tecnologias Utilizadas
* Node.js: Entorno de ejecucion para JavaScript.
* Express: Framework para la creacion del servidor y las rutas.
* MongoDB: Base de datos NoSQL para el almacenamiento de datos.
* Mongoose: Modelado de objetos para MongoDB.
* Postman: Herramienta para el testing de la API.

## Estructura del Proyecto
La arquitectura del proyecto se divide de la siguiente manera:

api-peliculas/
├── db/
│   └── db-connection-mongodb.js  # Configuracion de la conexion a la base de datos
├── img/                          # Carpeta de evidencias visuales
│   ├── EVIDENCIA-POSTMAN.png
│   └── EVIDENCIA-MONGODB.png
├── models/                       # Definicion de esquemas de Mongoose
│   ├── Director.js
│   ├── Genero.js
│   ├── Media.js
│   ├── Productora.js
│   └── Tipo.js
├── routes/                       # Endpoints de la API (GET, POST, PUT)
│   ├── director.js
│   ├── genero.js
│   ├── media.js
│   ├── productora.js
│   └── tipo.js
├── .env                          # Variables de entorno
├── .gitignore                    # Archivos ignorados por Git
├── index.js                      # Punto de entrada de la aplicacion
└── package.json                  # Dependencias del proyecto

## Instalacion y Uso

1. Clonar el repositorio.
2. Instalar dependencias:
   npm install
3. Asegurarse de que el servicio de MongoDB este activo.
4. Iniciar el servidor:
   npm start

## Evidencias de Funcionamiento

### Pruebas en Postman
Aqui se muestra el correcto funcionamiento de los endpoints realizando peticiones GET y POST al servidor local:

![Prueba Postman](./img/EVIDENCIA-POSTMAN.png)

### Base de Datos en MongoDB
Los datos se almacenan y persisten correctamente en las colecciones de MongoDB Compass:

![Evidencia MongoDB](./img/EVIDENCIA-MONGODB.png)