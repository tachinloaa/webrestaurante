# 📸 Guía de Imágenes para El Rinconcito

## 📁 Estructura de Carpetas

He creado la siguiente estructura en `public/images/`:

```
public/images/
├── logo.png                    # Logo del restaurante (recomendado: 200x200px PNG con fondo transparente)
├── hero-bg.jpg                # Imagen de fondo del Hero principal (recomendado: 1920x1080px)
├── categories/                # Imágenes de categorías del menú
│   ├── tacos.jpg
│   ├── tortas.jpg
│   ├── burritos.jpg
│   ├── quesadillas.jpg
│   └── ... (una por cada categoría)
├── menu/                      # Imágenes de platillos individuales
│   ├── taco-asada.jpg
│   ├── burrito-pollo.jpg
│   └── ... (una por cada platillo)
├── paquetes/                  # Imágenes de paquetes semanales
│   ├── lunes.jpg
│   ├── martes.jpg
│   └── ... (una por cada día)
└── promociones/               # Imágenes de promociones especiales
    └── promo-especial.jpg

```

## 📋 Instrucciones

### 1. **Logo** (OBLIGATORIO)
- Guarda tu logo como: `public/images/logo.png`
- Tamaño recomendado: 200x200px o 400x400px
- Formato: PNG con fondo transparente

### 2. **Imagen Hero Principal**
- Guarda una foto grande como: `public/images/hero-bg.jpg`
- Tamaño: 1920x1080px (Full HD)
- Debe ser una imagen atractiva de comida mexicana o del restaurante

### 3. **Categorías del Menú**
Coloca imágenes en `public/images/categories/` con estos nombres:
- `tacos.jpg`
- `tortas.jpg`
- `burritos.jpg`
- `quesadillas.jpg`
- `enchiladas.jpg`
- `sopes.jpg`
- `bebidas.jpg`
- `postres.jpg`
- `especiales.jpg`

**Tamaño recomendado:** 800x600px

### 4. **Platillos del Menú**
Coloca fotos de tus platillos en `public/images/menu/`
- Nombra los archivos de forma descriptiva: `taco-asada.jpg`, `burrito-pollo.jpg`
- **Tamaño recomendado:** 800x600px
- Usa fotos de buena calidad que muestren bien el platillo

### 5. **Paquetes Semanales**
Coloca imágenes en `public/images/paquetes/` con estos nombres:
- `lunes.jpg`
- `martes.jpg`
- `miercoles.jpg`
- `jueves.jpg`
- `viernes.jpg`
- `sabado.jpg`
- `domingo.jpg`

**Tamaño recomendado:** 1200x800px

### 6. **Promociones**
Coloca imágenes de promociones en `public/images/promociones/`
- Nombra según la promoción: `2x1-tacos.jpg`, `combo-familiar.jpg`
- **Tamaño recomendado:** 1200x600px

## ⚙️ Configuración en Supabase

Después de subir las imágenes locales, debes actualizar las URLs en Supabase:

### Para Categorías:
```sql
UPDATE categories 
SET image_url = '/images/categories/tacos.jpg' 
WHERE name = 'Tacos';

UPDATE categories 
SET image_url = '/images/categories/tortas.jpg' 
WHERE name = 'Tortas';
-- Repite para cada categoría...
```

### Para Platillos del Menú:
```sql
UPDATE menu_items 
SET image_url = '/images/menu/taco-asada.jpg' 
WHERE name = 'Taco de Asada';

-- Repite para cada platillo...
```

### Para Paquetes Semanales:
```sql
UPDATE weekly_packages 
SET image_url = '/images/paquetes/lunes.jpg' 
WHERE day_of_week = 'Lunes';

-- Repite para cada día...
```

### Para Promociones:
```sql
UPDATE promotions 
SET image_url = '/images/promociones/promo-especial.jpg' 
WHERE title = 'Tu Promoción';
```

## 💡 Consejos para las Fotos

1. **Iluminación:** Usa luz natural o buena iluminación
2. **Fondo:** Fondos limpios y neutros
3. **Ángulo:** Toma las fotos desde arriba a 45° para platillos
4. **Resolución:** Mínimo 800x600px, recomendado 1200x900px
5. **Formato:** JPG para fotos, PNG para logos
6. **Tamaño de archivo:** Optimiza las imágenes (máximo 500KB por imagen)

## 🔄 Pasos después de agregar las imágenes:

1. ✅ Coloca todas las imágenes en las carpetas correspondientes
2. ✅ Actualiza la base de datos Supabase con las nuevas rutas
3. ✅ Recarga la página web
4. ✅ Verifica que todas las imágenes se muestren correctamente

---

**Nota:** Las rutas usan `/images/...` porque están en la carpeta `public`. Vite automáticamente sirve los archivos de `public` desde la raíz del sitio.
