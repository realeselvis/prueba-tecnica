# Turborepo prueba-tecnica

Este proyecto usa turborepo donde las diferentes apps se agregan dentro de la carpeta apps y cualquier paquete que se desee compartir se crea dentro de packages.

## Que incluye

Este Turborepo inclincluye los siguentes packages/apps:

## App y Packages

- `prueba-tecnica`: Un proyecto de react router para realizar pruebas técnicas

- `@repo/db`: Configuraciones de drizzle para el manejo de la base de datos
- `@repo/eslint-config`: `eslint` configuraciones (incluye `eslint-config-next` y `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json` usando en el monorepo

### Utilidades

Este Turborepo tiene algunas herramientas ya configuradas:

- [TypeScript](https://www.typescriptlang.org/) para checkeo de static type
- [ESLint](https://eslint.org/) para linting de codigo
- [Prettier](https://prettier.io) para formateo de codigo

### Compilar

Para comilar todas las apps y paquetes, corre el siguiente comando:

```
npm run build
```

### Desarrollo

Para desarrollar todas las apps y paquetes, corre el siguiente codigo:

```
npm run dev
```

#### Generar migraciones de drizzle

Cada vez que crees o modifiques esquemas de drizzle debes generar las migraciones. Para esto debes correr el siguiente comando

```
cd packages/db
npm run generate
```

### Ejecutar migraciones de drizzle

Luego de generar las migraciones estas deben ser ejecutadas para poder ver los cambios en la base de datos. Para esto debes correr el siguiente comando.

```
cd packages/db
npm run migrate
```

# PRUEBA TÉCNICA

Para esta prueba técnica se ha configurado este proyecto con el fin de darte un ambiente listo para realizar el codigo.

En esta prueba usamos:

- React router v7 para la creación de la aplicación web. Este proyecto incluye tailwind.
- Drizzle para la creación del schema y manejo de la base de datos
- PostgreSQL como motor de bases de datos
- Adminar para poder acceder a la base de datos y administrar los registros
- Docker para el manejo de un contenedor con postgreSQl ya listo

## Empezar

1. Primero instala las dependencias, corriendo el comando:

```shell
npm i
```

2. Crea un archivo llamado .env y copia el contenido de .env.example en el.

3. Monta el contenedor de docker. (Si no tienes el software de Docker, debes instalarlo desde https://www.docker.com).

```shell
docker compose up -d
```

Desde el aplicativo de docker podrás ver que se ha creado una carpeta dentro de contenedores llamada prueba-tecnica. Dentro de ella estan los contenedores del motor de bases de datos PostgreSQl y el contenedor de adminer.

Para ingresar a Adminar, debes ir a http://localhost:8080/ e ingresar seleccionado:

**Motor de bases de datos**: PostgreSQL
**Servidor**: db
**Usuario**: El mismo en .env
**Constraseña**: La misma en .env
**Base de datos**: Puedes dejarla en blanco

Al ingresar solo has click en la base de datos y ya estas dentro

NOTA: Cuando corras las migraciones de drizzle, para verificar que las tablas han sido creadas, cuando estes en Adminar, dentro de la base de datos. Debes seleccionar en el lado izquierdo donde dice **Esquema** el que se llama prueba_tecnica

## La prueba

- Clona este repositorio y crea una copia en tu cuenta de github
- Crear un schema en drizzle para manejar los usuarios. Debe contener al menos Nombres*, Apellidos*, Celular, Email. (Debes crear la tabla en singular y los nombres de las columnas en ingles)
- Crear un route para /users que liste todos los usuarios
- Crear un route para /users/new que muestre un formulario para crear usuario
- Crear un route para /users/edit/${userId} que muestre un formulario para editar usuario
- Crear el formulario de creación y edición de usuarios
- Los usuarios deben ser guardados en el schema prueba_tecnica
- Los routes deben ser en ingles

## Que se evalúa

- Que los formularios de creación y edición funciones
- Que se validen errores se intente editar un usuario que no exista
- Validación de campos requeridos
- Validación de email
- Visuales responsive y con un estilo amigable a la vista
- Cualquier mejora es bienvenida
- Correcto nombrabiento de tablas y routes en ingles

Notas:

- Cualquier duda contactarse con el lider encargado.
