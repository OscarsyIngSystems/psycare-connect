# API Directorio de Institutos

Backend para el Directorio de Instituciones con autenticación JWT.

---

## 📋 Tabla de Contenidos

- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Ejecución](#-instalación-y-ejecución)
- [Autenticación](#-autenticación)
- [Endpoints](#-endpoints-disponibles)
- [Ejemplos de Uso](#-ejemplos-de-uso)
- [Modelos de Datos](#-modelos-de-datos)
- [Comandos Docker](#-comandos-docker-útiles)
- [Códigos de Error](#-códigos-de-error)
- [Variables de Entorno](#-variables-de-entorno)
- [Estructura del Proyecto](#-estructura-del-proyecto)

---

## 🚀 Tecnologías

| Tecnología      | Versión |
| --------------- | ------- |
| Spring Boot     | 4.0.6   |
| MySQL           | 8.0     |
| Spring Security | 6.x     |
| JWT             | 0.11.5  |
| Docker          | Latest  |
| Maven           | 3.9.6   |

---

## 📦 Requisitos Previos

- [Docker](https://www.docker.com/products/docker-desktop/) y Docker Compose
- [Java 17](https://adoptium.net/) (opcional, para desarrollo local)
- [Maven](https://maven.apache.org/download.cgi) (opcional, para desarrollo local)

---

## 🔧 Instalación y Ejecución

### 🐳 Con Docker (recomendado)

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd backend

# Construir y levantar los contenedores
docker-compose up --build
```

### 💻 Sin Docker (desarrollo local)

```bash
# Configurar MySQL local
# Crear base de datos: directorio_db
# Usuario: root, contraseña: rootpassword

# Ejecutar la aplicación
mvn clean package
mvn spring-boot:run
```

### 🔑 Autenticación

### Credenciales de Prueba

| Campo      | Valor            |
| ---------- | ---------------- |
| Email      | `admin@test.com` |
| Contraseña | `admin123`       |

> ⚠️ **Nota:** Estas credenciales son solo para entornos de desarrollo y pruebas. En producción, utilice contraseñas seguras y cambie el encoder a BCrypt.

### 📊 Endpoints Disponibles

### 🔓 Públicos

| Método | URL                    | Descripción                    |
| ------ | ---------------------- | ------------------------------ |
| `GET`  | `/api/institutos`      | Obtener todos los institutos   |
| `GET`  | `/api/institutos/{id}` | Obtener un instituto por ID    |
| `POST` | `/api/auth/login`      | Iniciar sesión (obtener token) |

### 🔒 Protegidos (requieren `Bearer Token`)

| Método   | URL                    | Descripción                       |
| -------- | ---------------------- | --------------------------------- |
| `POST`   | `/api/institutos`      | Crear un nuevo instituto          |
| `PUT`    | `/api/institutos/{id}` | Actualizar un instituto existente |
| `DELETE` | `/api/institutos/{id}` | Eliminar un instituto             |

### 📝 Ejemplos de Uso

### 1. Login (obtener token)

Request:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "admin123"
  }'
```

### Response:

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "admin@test.com",
  "message": "Login exitoso"
}
```

### 2. Obtener todos los institutos (público)

### Request:

```bash
curl -X GET http://localhost:8080/api/institutos
```

### Response:

```json
[
  {
    "id": 1,
    "nombre": "Hospitalito Gustavo Guerrero A.C.",
    "descripcion": "Neurología, Psiquiatría, Psicología...",
    "direccion": ["Herreros 68, Morelos..."],
    "contacto": ["Whatsapp: 56267 40488", "Teléfono: 55 7598 4230"],
    "activo": true
  }
]
```

### 3. Obtener un instituto por ID (público)

### Request:

```bash
curl -X GET http://localhost:8080/api/institutos/1
```

### Response:

```json
{
  "id": 1,
  "nombre": "Hospitalito Gustavo Guerrero A.C.",
  "descripcion": "Neurología, Psiquiatría, Psicología...",
  "direccion": ["Herreros 68, Morelos..."],
  "contacto": ["Whatsapp: 56267 40488", "Teléfono: 55 7598 4230"],
  "activo": true
}
```

### 4. Crear un instituto (requiere token)

### Request:

```bash
curl -X POST http://localhost:8080/api/institutos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "nombre": "Hospital de Prueba",
    "descripcion": "Atención médica especializada",
    "direccion": ["Calle Falsa 123, Ciudad de México"],
    "imagen": "1",
    "contacto": ["55 1234 5678", "55 8765 4321"],
    "correo": "contacto@hospitalprueba.com",
    "proceso": "Llamar para agendar cita",
    "activo": true,
    "iframe": "https://www.google.com/maps/embed/..."
  }'
```

### Response:

```json
{
  "id": 19,
  "nombre": "Hospital de Prueba",
  "descripcion": "Atención médica especializada",
  "direccion": ["Calle Falsa 123, Ciudad de México"],
  "contacto": ["55 1234 5678", "55 8765 4321"],
  "activo": true
}
```

### 5. Actualizar un instituto (requiere token)

### Request:

```bash
curl -X PUT http://localhost:8080/api/institutos/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -d '{
    "id": 1,
    "nombre": "Hospital Actualizado",
    "descripcion": "Nueva descripción",
    "direccion": ["Nueva dirección 456"],
    "imagen": "1",
    "contacto": ["55 9999 8888"],
    "correo": "nuevo@hospital.com",
    "proceso": "Nuevo proceso de atención",
    "activo": true
  }'
```

### Response:

```json
{
  "id": 1,
  "nombre": "Hospital Actualizado",
  "descripcion": "Nueva descripción",
  "direccion": ["Nueva dirección 456"],
  "contacto": ["55 9999 8888"],
  "activo": true
}
```

### 6. Eliminar un instituto (requiere token)

### Request:

```bash
curl -X DELETE http://localhost:8080/api/institutos/19 \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### Response: 200 OK (sin cuerpo)

### 📋 Modelos de Datos

### Instituto

```json
{
  "id": 1,
  "nombre": "Nombre del instituto",
  "descripcion": "Descripción de los servicios",
  "direccion": ["Dirección línea 1", "Dirección línea 2"],
  "imagen": "1",
  "contacto": ["Teléfono 1", "Teléfono 2"],
  "correo": "correo@instituto.com",
  "proceso": "Proceso de atención",
  "activo": true,
  "iframe": "URL del mapa"
}
```

### Login Request

```json
{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}
```

### Login Response

```json
{
  "token": "jwt_token_aqui",
  "email": "usuario@ejemplo.com",
  "message": "Login exitoso"
}
```

### 🐳 Comandos Docker Útiles

```bash
# Levantar los contenedores
docker-compose up

# Levantar en segundo plano
docker-compose up -d

# Detener contenedores
docker-compose down

# Detener y eliminar volúmenes (borra datos)
docker-compose down -v

# Ver logs
docker-compose logs -f

# Reconstruir después de cambios
docker-compose build --no-cache backend-app
docker-compose up

# Acceder a MySQL
docker exec -it directorio-mysql mysql -u root -prootpassword

# Ver base de datos
docker exec -it directorio-mysql mysql -u root -prootpassword -e "USE directorio_db; SELECT * FROM admin_users;"

# Insertar usuario manualmente
docker exec -it directorio-mysql mysql -u root -prootpassword -e "USE directorio_db; INSERT INTO admin_users (email, password, nombre, activo, created_at) VALUES ('admin@test.com', 'admin123', 'Administrador', 1, NOW());"
```

### ⚠️ Códigos de Error

| Código | Significado    | Solución                                                                    |
| ------ | -------------- | --------------------------------------------------------------------------- |
| `200`  | OK             | Petición exitosa                                                            |
| `201`  | Created        | Recurso creado exitosamente                                                 |
| `400`  | Bad Request    | Error en los datos enviados. Verifique el formato del JSON                  |
| `401`  | Unauthorized   | No autenticado o token inválido. Inicie sesión para obtener un token válido |
| `403`  | Forbidden      | No tiene permisos. Use un usuario con rol ADMIN                             |
| `404`  | Not Found      | Recurso no encontrado. Verifique el ID del recurso                          |
| `500`  | Internal Error | Error en el servidor. Revise los logs del contenedor                        |

### 🔧 Variables de Entorno

#### Variable Descripción Valor por defecto

```
SPRING_DATASOURCE_URL URL de conexión MySQL jdbc:mysql://mysql-db:3306/directorio_db
SPRING_DATASOURCE_USERNAME Usuario MySQL root
SPRING_DATASOURCE_PASSWORD Contraseña MySQL rootpassword
JWT_SECRET Secreto para firmar tokens miClaveSuperSecretaParaJWT...
JWT_EXPIRATION Expiración del token (ms) 86400000 (24 horas)
```

### 📁 Estructura del Proyecto

```text
backend/
├── src/
│ ├── main/
│ │ ├── java/com/directorio/backend/
│ │ │ ├── config/ # Configuración CORS
│ │ │ ├── controller/ # Controladores REST
│ │ │ ├── dto/ # Objetos de transferencia de datos
│ │ │ ├── model/ # Entidades JPA
│ │ │ ├── repository/ # Repositorios JPA
│ │ │ ├── security/ # Configuración de seguridad JWT
│ │ │ └── BackendApplication.java
│ │ └── resources/
│ │ ├── application.properties
│ │ └── data.sql # Datos iniciales
│ └── test/ # Pruebas unitarias
├── Dockerfile
├── docker-compose.yml
└── pom.xml
```

### 📞 Soporte

Para soporte o dudas, contactar al administrador del sistema.
