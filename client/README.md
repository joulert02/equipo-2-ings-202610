# FavUPB Client

Aplicación web responsiva construida con React para solicitar y gestionar favores. Interfaz intuitiva que permite a los usuarios visualizar, crear y cancelar solicitudes de favores de manera fluida.

---

## 📋 Descripción de archivos

### Estructura Principal
- **src/main.jsx** - Punto de entrada de la aplicación React
- **src/App.jsx** - Componente raíz de la aplicación
- **src/index.css** - Estilos globales

### Carpetas Principales
- **src/pages/** - Páginas de la aplicación
- **src/components/** - Componentes reutilizables
- **src/api/** - Servicios y llamadas a la API

### Archivos Específicos
- **src/pages/FeedPage.jsx** - Página principal con lista de favores
- **src/components/FavorCard.jsx** - Componente para mostrar cada favor
- **src/components/CreateFavorModal.jsx** - Modal para crear nuevos favores
- **src/api/favors.js** - Servicio API con funciones para llamadas HTTP

### Configuración
- **vite.config.js** - Configuración de Vite (bundler)
- **tailwind.config.js** - Configuración de Tailwind CSS
- **postcss.config.js** - Configuración de PostCSS
- **index.html** - Plantilla HTML principal
- **package.json** - Dependencias y scripts del proyecto

---

## 🚀 SETUP - Cómo instalar y ejecutar

### Requisitos previos
- Node.js v18 o superior
- Servidor backend en `localhost:3000`
- Git

### Pasos de instalación

**1) Clonar el repositorio**
```bash
git clone <repository-url>
cd cliente-favores
```

**2) Instalar dependencias**
```bash
npm install
```

**3) Ejecutar en modo desarrollo**
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

**4) Compilar para producción**
```bash
npm run build
```
Genera los archivos optimizados en la carpeta `dist/`

**5) Vista previa de la compilación en producción**
```bash
npm run preview
```

---

## 🌐 Configuración de API

La aplicación se conecta al servidor backend en `http://localhost:3000/api` por defecto.

Si necesitas cambiar la URL del servidor, busca la configuración en `src/api/favors.js` y actualiza la URL base según tus necesidades.

**Nota:** Asegúrate de que el servidor backend esté corriendo en el puerto 3000 antes de iniciar la aplicación cliente.

---

## 📦 Dependencias principales

- **react** - Librería para construir interfaces de usuario
- **react-dom** - Renderizado de React en el navegador
- **react-router-dom** - Enrutamiento en la aplicación
- **axios** - Cliente HTTP para llamadas a la API
- **react-hook-form** - Manejo de formularios eficiente
- **yup** - Validación de esquemas
- **zustand** - Gestión de estado global ligera
- **tailwindcss** - Framework CSS para estilos responsivos

---

## 💡 Características implementadas

✅ **Visualizar favores** - Lista completa de todos los favores disponibles  
✅ **Crear nuevos favores** - Modal intuitivo para crear solicitudes  
✅ **Cancelar solicitudes** - Opción para eliminar favores propios  
✅ **Interfaz responsiva** - Diseño adaptable a dispositivos móviles y desktop  

---

## 📝 Notas adicionales

- La aplicación usa Tailwind CSS para estilos modernos y responsivos
- Los formularios se validan con Yup antes de enviarse
- El estado global se gestiona con Zustand
- Asegúrate de que CORS esté habilitado en el servidor backend
- Los cambios en modo desarrollo se reflejan en tiempo real (hot reload)
