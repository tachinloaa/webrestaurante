# 📸 CONFIGURACIÓN DE SUPABASE STORAGE

## Paso 1: Crear el Bucket de Imágenes

1. Ve a tu proyecto en Supabase
2. Click en **Storage** en el menú lateral
3. Click en **"New bucket"**
4. Configura así:
   - **Name**: `images`
   - **Public bucket**: ✅ **ACTIVADO** (muy importante)
   - Click en **"Create bucket"**

## Paso 2: Configurar Políticas de Acceso

Ejecuta este SQL en el **SQL Editor** de Supabase:

```sql
-- Permitir que TODOS puedan VER las imágenes (lectura pública)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

-- Permitir que TODOS puedan SUBIR imágenes (para desarrollo)
-- ⚠️ En producción, cambia esto para que solo usuarios autenticados puedan subir
CREATE POLICY "Allow public uploads"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'images' );

-- Permitir que TODOS puedan ACTUALIZAR imágenes
CREATE POLICY "Allow public updates"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'images' );

-- Permitir que TODOS puedan ELIMINAR imágenes
CREATE POLICY "Allow public deletes"
ON storage.objects FOR DELETE
USING ( bucket_id = 'images' );
```

## Paso 3: Verificar la Configuración

1. Ve a **Storage** → **images**
2. Intenta subir una imagen de prueba manualmente
3. Si se sube correctamente, ¡todo está listo!

## Paso 4: Probar en tu Aplicación

1. Ve a `localhost:5173/admin`
2. Click en **"Agregar Producto"**
3. Llena el formulario y sube una imagen
4. Click en **"Guardar"**

## ✅ ¡Listo!

Ahora puedes:
- ✅ Agregar productos con imágenes desde tu computadora
- ✅ Editar productos existentes (nombre, precio, descripción, imagen)
- ✅ Eliminar productos
- ✅ Editar paquetes semanales
- ✅ Las imágenes se guardan en Supabase Storage

## 🔒 Seguridad para Producción (Opcional)

Si quieres que solo usuarios autenticados puedan subir/editar/eliminar, reemplaza las políticas con:

```sql
-- Solo lectura pública
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

-- Solo usuarios autenticados pueden subir
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'images' AND auth.role() = 'authenticated' );
```
