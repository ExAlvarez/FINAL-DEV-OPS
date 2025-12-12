# Biblioteca API (Node.js)

API REST básica para gestión de libros. Incluye endpoints CRUD, healthcheck, Docker y CI/CD con GitHub Actions.

## Comandos de ejecución (local)

```bash
- npm install    # Instala dependencias
- npm test       # Ejecuta los tests
- npm start      # Inicia el servidor en http://localhost:3000
- docker-compose up --build  # Ejecuta la app en contenedor
```
## Comandos de ejecución en Render
```
-git push origin main

- Todo el contenido sera visible en https://biblioteca-api-node.onrender.com y sus respectivas busquedas
```

## Endpoints principales:
- GET /health
- GET /libros
- GET /libros/:id
- POST /libros
- PUT /libros/:id
- PATCH /libros/:id
- DELETE /libros/:id


## Endpoints de Autores

- GET /autores
- GET /autores/:id
- POST /autores
- PUT /autores/:id
- PATCH /autores/:id
- DELETE /autores/:id

## Cruce de datos

- GET /autores/:id/libros  → devuelve todos los libros escritos por ese autor
  ```
  (curl https://biblioteca-api-node.onrender.com/autores/1) --> RENDER
  (curl http://localhost:3000/libros/autores/1) --> LOCAL
  ```
