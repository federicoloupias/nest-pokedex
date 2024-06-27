<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>



## Ejecutar en desarrolo

1. Clonar el repositoio
2. Ejecutar
```bash
$ yarn install
```

3. Tener nest CLI instalado
```bash
$ npm i -g @nestjs/cli
```

4. Levantar la base de datos
```bash
$ docker-compose up -d
```

5. Clonar el archivo __.env.template__ y renombrar la copa a __.env__

6. Llenar las variables de entorno definidas en el ```.env```

7. Ejecutar la aplicación en dev:
```bash
$ yarn start:dev
```

8. Recontruir la base de datos con la semilla
```bash
$ http://localhost:3000/api/v2/seed

```

## Stack usado
* MongoDB
* Nest