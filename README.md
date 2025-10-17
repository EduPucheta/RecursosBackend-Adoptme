# Entrega final Curso de Backend 3

## Tecnologías utilizadas:

- NodeJS
- ExpressJS
- MongoDB
- Faker, bcrypt
- Swagger (swagger-ui-express, swagger-jsdoc)
- Docker

## Como correr el proyecto de forma local:

1. Correr "npm install" en la terminal.
2. Correr "npm run dev" en la terminal.
4. Actuliazar las variables de enterno con las credenciales correctas.


## Como correr el proyecto con Docker:

También puedes correr la aplicación usando Docker. La imagen está disponible públicamente en Docker Hub.

**Link al Repositorio en Docker Hub:** [edupucheta/adoptme-app](https://hub.docker.com/r/edupucheta/adoptme-app)

**Pasos para correrlo:**

1.  **Crear un archivo `.env`:**
    En la raíz del proyecto, crea un archivo llamado `.env` y añade tu string de conexión de MongoDB:
    ```
    MONGODB_URL="your_mongodb_connection_string"
    ```

2.  **Ejecutar el contenedor:**
    Corre el siguiente comando en tu terminal para descargar y correr la imagen:
    ```bash
    docker run -p 8081:8080 --name adoptme-container --rm --env-file .env edupucheta/adoptme-app:latest
    ```
    La aplicación estará disponible en `http://localhost:8081`.


## Documentación API (Swagger)

La documentación interactiva de la API está disponible en Swagger UI. Una vez que el servidor esté corriendo, puedes acceder a ella en:

**http://localhost:8080/apidocs**

Swagger proporciona una interfaz visual para explorar y probar todos los endpoints de usuarios de forma interactiva.