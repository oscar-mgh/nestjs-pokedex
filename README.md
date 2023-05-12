<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1.- Clonar el repositorio

2.- Ejecutar

```
yarn install
```

3.- Instalar Nest CLI

```
npm install -g @nestjs/cli
```

4.- Servir la base de datos

```
docker compose up -d
```

5.- Establecer variables de entorno en __.env__ a partir del __.env.template__ 

6.- Ejecutar la aplicación en modo de desarrollo
```
yarn start:dev
```

7.- Generar información en la base de datos mediante la semilla

```
http://localhost:3000/api/seed
```


## Tech Stack:

-   MongoDB
-   Nest
