# El Rinconcito - Aplicación Web de Restaurante

Aplicación web completa para restaurante con panel de administración, construida con Vite + React + Tailwind CSS + Supabase.

## 🚀 Características

### Ruta Pública (`/`)
- Hero section con nombre y eslogan
- Banner dinámico de promociones (cambia según fecha)
- Paquetes semanales (Lunes a Viernes)
- Menú completo organizado por categorías
- Indicador de estado abierto/cerrado en tiempo real
- Botón flotante de WhatsApp

### Ruta Admin (`/admin`)
- Login con Supabase Auth
- Panel para gestionar platillos (CRUD + imágenes)
- Panel para crear/editar promociones con fechas
- Editor de paquetes semanales
- Todo guardado en Supabase

## 📦 Instalación

```bash
npm install
```

## ⚙️ Configuración

### 1. Supabase Setup

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta el script `SUPABASE_SETUP.sql` en el SQL Editor de Supabase
3. Ejecuta el script `MENU_INSERT.sql` para insertar datos de ejemplo
4. **⚠️ IMPORTANTE:** Ejecuta el script `FIX_RLS_POLICIES.sql` para permitir lectura pública
5. Crea un bucket de Storage llamado `images` y hazlo público

### 2. Variables de Entorno

Ya están configuradas en `.env`:
```
VITE_SUPABASE_URL=https://eaavjggnyzgtuaetfimx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🏃 Ejecutar Localmente

```bash
npm run dev
```

Visita `http://localhost:5173`

## 🔐 Credenciales Admin (Demo)

- **Email:** admin@elrinconcito.com
- **Password:** admin123

## 🌐 Deploy en Cloudflare Pages

### Opción 1: Desde el Dashboard de Cloudflare

1. Ve a [Cloudflare Pages](https://dash.cloudflare.com/)
2. Click en "Create a project"
3. Conecta tu repositorio de GitHub `tachinloaa/webrestaurante`
4. Configuración:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variables:** Agrega `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`
5. Click en "Save and Deploy"

### Opción 2: Desde la Terminal (Wrangler CLI)

```bash
# Instalar Wrangler globalmente
npm install -g wrangler

# Login a Cloudflare
wrangler login

# Build del proyecto
npm run build

# Deploy
wrangler pages deploy dist --project-name=webrestaurante
```

## 📁 Estructura del Proyecto

```
webrestaurante/
├── src/
│   ├── components/       # Componentes React
│   │   ├── Admin/       # Componentes del panel admin
│   │   ├── Banner.tsx   # Banner de promociones
│   │   ├── Hero.tsx     # Sección hero
│   │   ├── Menu.tsx     # Menú de categorías y platillos
│   │   ├── Navbar.tsx   # Barra de navegación
│   │   ├── Footer.tsx   # Pie de página
│   │   ├── WeeklySpecials.tsx  # Paquetes semanales
│   │   └── WhatsAppButton.tsx  # Botón flotante
│   ├── pages/           # Páginas principales
│   │   ├── Home.tsx     # Página pública
│   │   └── Admin.tsx    # Página admin
│   ├── services/        # Servicios API
│   │   └── api.ts       # Funciones para Supabase
│   ├── lib/             # Configuración
│   │   └── supabase.ts  # Cliente de Supabase
│   ├── types/           # TypeScript types
│   ├── utils/           # Utilidades
│   └── data/            # Datos mock (ya no se usan)
├── SUPABASE_SETUP.sql   # Script de creación de tablas
├── MENU_INSERT.sql      # Script de datos iniciales
└── .env                 # Variables de entorno
```

## 🎨 Personalización

### Cambiar Colores

Edita `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#D32F2F', // Rojo principal
    hover: '#B71C1C',
  },
  secondary: {
    DEFAULT: '#FF7043', // Naranja
  },
  cream: {
    DEFAULT: '#FFF3E0', // Crema
  },
}
```

### Cambiar Número de WhatsApp

Edita `src/components/WhatsAppButton.tsx`:

```javascript
const phoneNumber = '5215555555555'; // REEMPLAZA CON TU NÚMERO
```

### Cambiar Horarios

Edita `src/utils/status.ts`:

```javascript
const WEEKDAY_HOURS = { open: '09:00', close: '21:00' };
const WEEKEND_HOURS = { open: '09:00', close: '18:00' };
```

## 🗄️ Base de Datos

### Tablas Principales

- `categories` - Categorías del menú
- `products` - Platillos/productos
- `promotions` - Banners promocionales
- `weekly_packages` - Paquetes semanales

### Storage

- Bucket `images` para almacenar imágenes de platillos y promociones

## Features

### 🌐 Sitio Público
- 🍽️ Menú dinámico con categorías
- 📱 Diseño responsive para todos los dispositivos
- 🎨 UI moderna con Tailwind CSS
- 🔥 Datos en tiempo real desde Supabase
- 📢 Banner de promociones con fechas
- 📅 Paquetes semanales especiales
- 💬 Integración con WhatsApp para pedidos
- 🕐 Indicador de estado (Abierto/Cerrado)

### 🔐 Panel de Administración (`/admin`)
- ➕ **Agregar productos** con imágenes desde tu computadora
- ✏️ **Editar productos** (nombre, precio, descripción, categoría, imagen)
- 🗑️ **Eliminar productos**
- 📸 **Subir imágenes** a Supabase Storage
- 📦 **Editar paquetes semanales** (nombre, descripción, precio)
- 🎯 **Gestión de promociones**
- 📊 Vista en tiempo real de todos los datos

## 📝 Notas

- Los datos se cargan dinámicamente desde Supabase
- Las imágenes de ejemplo usan LoremFlickr (reemplázalas con imágenes reales)
- El sistema de autenticación usa Supabase Auth
- Responsive design para móviles y tablets

## 🐛 Troubleshooting

**Error: "Failed to fetch"**
- Verifica que las credenciales de Supabase en `.env` sean correctas
- Asegúrate de que las tablas existan en Supabase

**Imágenes no se muestran**
- Verifica que el bucket `images` sea público
- Revisa las políticas RLS en Supabase

**Build falla en Cloudflare**
- Asegúrate de agregar las variables de entorno en Cloudflare Pages
- Verifica que el comando de build sea `npm run build`

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.
