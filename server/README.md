# FavUPB Server

API REST construida con Express y Prisma para gestionar solicitudes de favores. Backend robusto que proporciona endpoints para crear, listar, actualizar y cancelar favores de manera eficiente.

---

## 📋 Descripción de archivos

### Estructura Principal
- **src/index.js** - Punto de entrada de la aplicación, configura Express y las rutas
- **src/routes/favors.js** - Definición de las rutas de la API (GET, POST, PUT, DELETE)
- **src/controllers/favors.controller.js** - Lógica de negocio para cada endpoint
- **src/middleware/authenticate.js** - Verificación de JWT en rutas protegidas
- **src/routes/auth.js** - Registro e inicio de sesión
- **src/controllers/auth.controller.js** - Lógica de registro y login (bcrypt + JWT)
- **src/lib/prisma.js** - Instancia centralizada del cliente Prisma

### Configuración
- **prisma/schema.prisma** - Esquema de la base de datos
- **prisma/migrations/** - Historial de migraciones de la BD
- **prisma/seed.js** - Script para poblar la BD con datos iniciales
- **.env.example** - Plantilla de variables de entorno
- **package.json** - Dependencias y scripts del proyecto

---

## 🚀 SETUP - Cómo instalar y ejecutar

### Requisitos previos
- Node.js v18 o superior
- PostgreSQL v12 o superior
- Git

### Pasos de instalación

**1) Clonar el repositorio**
```bash
git clone <repository-url>
cd servidor-favores
```

**2) Instalar dependencias**
```bash
npm install
```

**3) Configurar variables de entorno**
```bash
cp .env.example .env
# Editar .env con tus valores (DATABASE_URL, PORT, etc.)
```

**4) Crear la base de datos PostgreSQL**
```bash
# Asegúrate de que PostgreSQL está corriendo
# Crea una nueva base de datos (por ejemplo: favupb_db)
createdb favupb_db
```

**5) Ejecutar migraciones de Prisma**
```bash
npx prisma migrate dev
```

**6) (Opcional) Poblar la base de datos**
```bash
npx prisma db seed
```

**7) Iniciar el servidor**
```bash
# Modo desarrollo (con auto-reload)
npm run dev

# O modo producción
npm start
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado en `.env`)

---

## 📡 Endpoints disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| **POST** | `/api/auth/register` | Registro con teléfono y contraseña (celular CO, 10 dígitos) |
| **POST** | `/api/auth/login` | Inicio de sesión; responde `token` (JWT) y `user` |
| **GET** | `/api/favors` | Listar favores disponibles (requiere `Authorization: Bearer <token>`) |
| **POST** | `/api/favors` | Crear favor (requiere autenticación) |
| **PATCH** | `/api/favors/:id/cancel` | Cancelar favor (requiere autenticación) |

Tras `npx prisma db seed`, el usuario de prueba usa el teléfono **3001234567** y la contraseña **dev123456** (solo desarrollo).

---

## 🔧 Variables de entorno necesarias

```env
# URL de conexión a la base de datos PostgreSQL
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/favupb_db

# Puerto en el que escucha el servidor
PORT=3000

# Secreto para firmar JWT (obligatorio, mínimo 16 caracteres)
JWT_SECRET=tu_secreto_largo_y_aleatorio

# Opcional (por defecto 7d)
# JWT_EXPIRES_IN=7d
```

---

## 📦 Dependencias principales

- **express** - Framework web para Node.js
- **prisma** - ORM para gestionar la base de datos
- **@prisma/client** - Cliente Prisma para consultas
- **cors** - Middleware para CORS
- **dotenv** - Carga variables de entorno desde .env
- **bcryptjs** - Hash de contraseñas
- **jsonwebtoken** - Emisión y verificación de JWT

---

## 📝 Notas adicionales

- Asegúrate de que PostgreSQL está corriendo antes de iniciar el servidor
- Las migraciones se aplican automáticamente al ejecutar `npm run dev`
- El archivo `.env` no debe ser versionado (está en `.gitignore`)
- Usa `npm run dev` durante desarrollo para auto-reload con nodemon
