
## 🚀 Tecnologías utilizadas

- Node.js  
- Express  
- TypeScript  
- JWT (Json Web Tokens)  
- Prisma ORM  
- PostgreSQL
- Dotenv  

---

## 📁 Estructura de carpetas

```
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── prisma/
│   ├── app.ts
│   └── server.ts
├── .env
├── package.json
├── README.md
```

---

## ⚙️ Configuración inicial

### 1. Clonar repositorio

```bash
git clone https://github.com/LT0504/Muxdry---backend.git
cd Muxdry---backend
```

## ⚙️ Configuración de Proyecto Backend con TypeScript + Docker + Prisma

Guía rápida para preparar un entorno de backend con TypeScript, Express, Docker y Prisma ORM.

---

## 📦 Comandos iniciales

### 1. Inicializa tu proyecto

```bash
npm init
```

### 2. Instala las dependencias

#### 🔧 Dependencias de desarrollo

```bash
npm install -D ts-node-dev @types/express @types/jsonwebtoken @types/bcrypt @types/node rimraf prisma
```

#### ➕ Dependencias principales

```bash
npm install express jsonwebtoken bcrypt @prisma/client dotenv typescript
```

---

## ⚙️ Configurar TypeScript (se puede omitir)

Inicializa TypeScript:

```bash
npx tsc --init --outDir dist/ --rootDir src
```

Edita el `tsconfig.json` y agrega si es que es necesario:

```json
"exclude": ["node_modules", "dist"],
"include": ["src"]
```

---

## 🐳 Configurar Docker + PostgreSQL (se puede omitir si el archivo ya existe)

### 1. Crea el archivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:latest
    restart: always
    environment: 
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    ports:
      - "5432:5432"
    volumes:
      - './postgres:/var/lib/postgresql/data'
```
---

## 🌐 Variables de entorno

Crea un archivo `.env` con:

```env
PORT = 3000
JWT_SECRET = "mysecret"

POSTGRES_USER="luis"
POSTGRES_PASSWORD="123456"
POSTGRES_DB="mydb"
DATABASE_URL="postgresql://luis:123456@localhost:5432/mydb"
```

---

## 🔧 Prisma ORM

### 1. Inicializar Prisma

```bash
npx prisma init
```

### 2. Levantar base de datos con Docker

```bash
docker-compose up -d
```

### 3. Crear y aplicar migraciones

```bash
npx prisma migrate dev --name init
```

---

✅ ¡Tu entorno de desarrollo ya está listo para comenzar a codificar tu backend con TypeScript, Docker y Prisma!
---

## ▶️ Ejecutar la API

### En desarrollo

```bash
npm run dev
```

## 📌 Endpoints disponibles

### 🔐 Auth

#### `POST /auth/register`  
Registra un nuevo usuario:

```json
{
  "name": "Ejemplo",
  "email": "ejemplo@example.com",
  "password": "123456"
}
```

#### `POST /auth/login`  
Inicia sesión y devuelve un token JWT:

```json
{
  "email": "ejemplo@example.com",
  "password": "123456"
}
```

---

### 👤 Perfil (Protegido con JWT)

#### `GET /api/profile`  
Devuelve los datos del perfil autenticado.

#### `PUT /api/profile`  
Actualiza el perfil autenticado:

```json
{
  "name": "Nuevo nombre",
  "email": "nuevo@email.com",
  "password":"nuevapassword"
}
```
---

## 🔐 Autenticación con JWT

Para acceder a rutas protegidas, añade este encabezado:

```http
Authorization: Bearer <tu_token>
```

---
