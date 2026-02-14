# 🔧 Cómo Configurar Supabase Storage (Opcional)

## ⚠️ NOTA: Ya no es necesario para funcionar

El sistema ahora funciona con URLs directas. Puedes:
- ✅ Usar imágenes locales: `/images/categories/tacos.jpg`
- ✅ Usar URLs externas: `https://ejemplo.com/imagen.jpg`
- ✅ Usar LoremFlickr temporal: `https://loremflickr.com/800/600/tacos`

**Solo configura Storage si quieres subir archivos desde el admin.**

---

## 📋 Pasos para Configurar Storage (si lo necesitas)

### 1. Crear el Bucket

1. Ve a tu proyecto en Supabase
2. En el menú lateral, haz clic en **"Storage"**
3. Haz clic en **"Create a new bucket"**
4. Configuración:
   - **Name:** `images`
   - **Public bucket:** ✅ Activado (muy importante)
   - **File size limit:** 50MB (o el que prefieras)
   - **Allowed MIME types:** `image/*`
5. Haz clic en **"Create bucket"**

### 2. Configurar Políticas de Seguridad

Ve a **"Storage"** → **"Policies"** y crea estas políticas para el bucket `images`:

#### Política 1: Lectura Pública
```sql
CREATE POLICY "Public can view images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');
```

#### Política 2: Upload para Autenticados
```sql
CREATE POLICY "Authenticated can upload images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');
```

#### Política 3: Update para Autenticados
```sql
CREATE POLICY "Authenticated can update images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'images');
```

#### Política 4: Delete para Autenticados
```sql
CREATE POLICY "Authenticated can delete images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'images');
```

### 3. Verificar la Configuración

1. Ve a **Storage** → **images**
2. Intenta subir una imagen de prueba manualmente
3. Si funciona, el bucket está bien configurado

---

## 🎯 Cómo Usar en el Sistema Actual

### Método 1: URL Directa (Recomendado ahora)
1. Ve a **Categorías** en el admin
2. Haz clic en **"Editar Imagen"**
3. Escribe la URL directamente:
   - Local: `/images/categories/tacos.jpg`
   - Externa: `https://unsplash.com/...`
4. Haz clic en **"Guardar"**

### Método 2: Con Storage (después de configurar)
- Necesitarías agregar de nuevo el campo de upload de archivo
- El código está comentado en el Dashboard
- Funcionaría automáticamente después de crear el bucket

---

## 💡 Recomendaciones

**Para Empezar Rápido:**
- Usa imágenes locales en `/public/images/categories/`
- O usa URLs de LoremFlickr temporales
- No necesitas configurar Storage

**Para Producción:**
- Configura Storage de Supabase
- Sube todas las imágenes ahí
- Las URLs serán permanentes y optimizadas

**Para Imágenes Locales:**
- Coloca las imágenes en `public/images/categories/`
- Usa paths relativos: `/images/categories/nombre.jpg`
- Funcionan sin necesidad de internet

---

## ❓ Troubleshooting

**Error "Bucket not found":**
- El bucket no existe → Créalo siguiendo el paso 1

**Error "new row violates row-level security":**
- Las políticas no están configuradas → Ejecuta los SQL del paso 2

**La imagen no se ve:**
- Verifica que el bucket sea público
- Verifica que la URL esté correcta
- Limpia el cache del navegador (Ctrl + F5)

**No puedo subir archivos:**
- Verifica que estés autenticado
- Verifica que las políticas de INSERT estén creadas
- Verifica el tamaño del archivo (máximo configurado)
