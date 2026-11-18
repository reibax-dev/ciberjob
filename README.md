# 🚀 CIBERJOB

### El portal de empleo del futuro

**Proyecto grupal de Backend — Grupo 2**  
Bootcamp The Bridge · Noviembre de 2026

Ciberjob es una plataforma web de empleo ambientada en un futuro donde las profesiones tradicionales conviven con trabajos como la minería espacial, la implantación de microchips cerebrales o el transporte por teletransporte.

El objetivo es conectar empresas que publican ofertas laborales con trabajadores interesados en descubrir nuevas oportunidades profesionales.

## 🛠️ Tecnologías utilizadas

| Tecnología              | Función                            |
| ----------------------- | ---------------------------------- |
| Node.js 20              | Entorno de ejecución               |
| Express 5               | Servidor web                       |
| PostgreSQL 18           | Base de datos                      |
| Sequelize 6             | ORM                                |
| EJS                     | Plantillas HTML                    |
| Docker y Docker Compose | Contenedores                       |
| pgAdmin 4               | Administración de la base de datos |
| Nodemon                 | Entorno de desarrollo              |

## ⚙️ Instalación y ejecución

### 1. Requisitos previos

Para ejecutar el proyecto es necesario disponer de:

- Git
- Docker
- Docker Compose

### 2. Clonar el repositorio

```bash
git clone https://github.com/reibax-dev/ciberjob.git
cd ciberjob
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` a partir del archivo `.env.example`:

```bash
cp .env.example .env
```

Completar las variables de configuración:

```env
APP_HOST=ciberjob-app
APP_PORT=3000

POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_contrasena
POSTGRES_DB=ciberjob

PGADMIN_HOST=ciberjob-pgadmin
PGADMIN_PORT=5050
PGADMIN_EMAIL=admin@ejemplo.com
PGADMIN_PASSWORD=tu_contrasena

JWT_SECRET=tu_clave_secreta
```

Los valores son ejemplos de configuración local. Las contraseñas y claves secretas deben sustituirse por valores propios.

### 4. Iniciar la aplicación

Ejecutar:

```bash
docker compose up --build
```

Docker Compose construirá y ejecutará los servicios necesarios para el proyecto.

Una vez iniciado el servidor, la aplicación estará disponible en:

**http://localhost:3000**

Para administrar PostgreSQL mediante pgAdmin:

**http://localhost:5050**

Los puertos pueden variar según la configuración del archivo `.env`.

### 5. Detener la aplicación

```bash
docker compose down
```

Este comando detiene y elimina los contenedores, conservando los datos almacenados en el volumen de PostgreSQL.

## 💻 Funcionalidades

Ciberjob está diseñado para ofrecer las siguientes funcionalidades:

- Registro y gestión de usuarios.
- Gestión de perfiles de empresas y trabajadores.
- Publicación y administración de ofertas de empleo.
- Clasificación de ofertas por categorías y modalidades.
- Inscripción de trabajadores en ofertas de empleo.
- Gestión de permisos según el tipo de usuario.

El proyecto incluye módulos de gestión mediante operaciones CRUD y vistas web desarrolladas con EJS.

Algunas funcionalidades, especialmente las relacionadas con autenticación, permisos e integración de la API REST, pueden requerir ajustes adicionales según la versión del proyecto.

## 📁 Estructura del proyecto

```text
ciberjob/
├── sql/                  # Scripts SQL
├── src/
│   ├── config/           # Configuración de la base de datos
│   ├── controllers/      # Controladores
│   ├── middlewares/      # Middlewares
│   ├── models/           # Modelos Sequelize
│   ├── repositories/     # Acceso a los datos
│   ├── routes/           # Rutas web y API
│   ├── utils/            # Funciones auxiliares
│   ├── views/            # Plantillas EJS
│   └── index.js          # Servidor principal
├── .env.example
├── Dockerfile
├── docker-compose.yml
└── package.json
```

El proyecto utiliza una arquitectura MVC con una capa de repositorios para separar las responsabilidades.

## 📄 Documentación

La memoria técnica del proyecto recoge los objetivos, las decisiones técnicas, el diseño de la base de datos, el reparto de tareas, los problemas encontrados y las soluciones aplicadas.

## 🔗 Repositorio

[GitHub — Ciberjob](https://github.com/reibax-dev/ciberjob)