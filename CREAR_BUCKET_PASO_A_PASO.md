# 🎯 GUÍA PASO A PASO: Configurar Storage en Supabase

## ⚡ Configuración Rápida (5 minutos)

### Paso 1: Crear el Bucket

1. **Abre tu proyecto en Supabase:**
   - Ve a https://supabase.com/dashboard
   - Selecciona tu proyecto "webrestaurante"

2. **Ve a Storage:**
   - En el menú lateral izquierdo, haz clic en **"Storage"** (icono de carpeta 📁)

3. **Crea el bucket:**
   - Haz clic en el botón verde **"New bucket"** (arriba a la derecha)
   - Configuración:
     ```
     Name: images
     Public bucket: ✅ SÍ (muy importante, actívalo)
     File size limit: 50 MB
     Allowed MIME types: image/*
     ```
   - Haz clic en **"Create bucket"**

### Paso 2: Configurar Políticas (RLS)

1. **Después de crear el bucket:**
   - Haz clic en el bucket **"images"** que acabas de crear
   - Haz clic en **"Policies"** (en la parte superior)

2. **Crea la política de lectura pública:**
   - Haz clic en **"New policy"**
   - Selecciona: **"For full customization"**
   - Llena los campos:
     ```
     Policy name: Public Access
     Allowed operation: SELECT
     Target roles: public
     ```
   - En **USING expression** escribe:
     ```sql
     true
     ```
   - Haz clic en **"Review"** y luego **"Save policy"**

3. **Crea la política de subida para usuarios autenticados:**
   - Haz clic nuevamente en **"New policy"**
   - Llena los campos:
     ```
     Policy name: Authenticated Upload
     Allowed operation: INSERT
     Target roles: authenticated
     ```
   - En **WITH CHECK expression** escribe:
     ```sql
     true
     ```
   - Haz clic en **"Review"** y luego **"Save policy"**

4. **Crea la política de actualización:**
   - Haz clic en **"New policy"**
   - Llena los campos:
     ```
     Policy name: Authenticated Update
     Allowed operation: UPDATE
     Target roles: authenticated
     ```
   - En **USING expression** escribe:
     ```sql
     true
     ```
   - Haz clic en **"Review"** y luego **"Save policy"**

5. **Crea la política de eliminación:**
   - Haz clic en **"New policy"**
   - Llena los campos:
     ```
     Policy name: Authenticated Delete
     Allowed operation: DELETE
     Target roles: authenticated
     ```
   - En **USING expression** escribe:
     ```sql
     true
     ```
   - Haz clic en **"Review"** y luego **"Save policy"**

### Paso 3: Verificar que Funciona

1. Ve a **Storage** → **images**
2. Haz clic en **"Upload file"**
3. Sube una imagen de prueba
4. Si se sube correctamente, ¡estás listo! ✅

---

## ❓ Si tienes problemas:

### "No puedo crear el bucket"
- Verifica que estás en el plan correcto (Free tier tiene límites)
- Refresca la página y vuelve a intentar

### "Policy creation failed"
- Asegúrate de usar `true` (en minúsculas) en las expresiones
- Verifica que seleccionaste el rol correcto (public o authenticated)

### "Cannot upload file"
- Verifica que la política de INSERT está creada
- Verifica que estás autenticado en el admin
- Verifica que el bucket es público

---

## 🎉 Una vez configurado:

1. Recarga tu panel de admin (F5)
2. Ve a **Categorías**
3. Haz clic en **"Editar Imagen"**
4. Ahora verás el botón **"Elegir archivo"**
5. Selecciona una imagen de tu PC
6. ¡Listo! Se subirá automáticamente

---

## 📸 Recomendaciones de Imágenes:

- **Tamaño:** 800x600px (ideal para categorías)
- **Peso:** Menos de 500KB (optimiza antes de subir)
- **Formato:** JPG (para fotos) o PNG (para logos)
- **Calidad:** Buena iluminación y enfoque

**Herramientas para optimizar:**
- TinyPNG: https://tinypng.com/
- Squoosh: https://squoosh.app/

---

¿Listo? ¡Crea el bucket y avísame cuando termines para reactivar la funcionalidad de upload! 🚀
