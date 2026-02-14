-- ========================================
-- CONFIGURAR STORAGE PARA CATEGORÍAS
-- ========================================
-- Este script configura el bucket de imágenes para permitir
-- subir imágenes de categorías desde el panel admin

-- Asegúrate de que el bucket 'images' existe y es público
-- Si no existe, créalo desde el dashboard de Supabase Storage

-- ==========================================
-- POLÍTICAS DE SEGURIDAD PARA CATEGORÍAS
-- ==========================================

-- Permitir que usuarios autenticados suban imágenes a la carpeta categories/
CREATE POLICY "Authenticated users can upload category images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'images' AND
  (storage.foldername(name))[1] = 'categories'
);

-- Permitir que usuarios autenticados actualicen imágenes de categorías
CREATE POLICY "Authenticated users can update category images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'images' AND
  (storage.foldername(name))[1] = 'categories'
);

-- Permitir que usuarios autenticados eliminen imágenes de categorías
CREATE POLICY "Authenticated users can delete category images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'images' AND
  (storage.foldername(name))[1] = 'categories'
);

-- Permitir que todos puedan ver las imágenes públicas
CREATE POLICY "Public can view category images"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'images' AND
  (storage.foldername(name))[1] = 'categories'
);

-- ==========================================
-- VERIFICAR CONFIGURACIÓN
-- ==========================================

-- Ver todas las políticas del bucket images
SELECT * FROM storage.policies WHERE bucket_id = 'images';

-- ==========================================
-- NOTA IMPORTANTE
-- ==========================================
-- Si ya tienes políticas existentes que interfieren, 
-- puedes eliminarlas primero con:
-- DROP POLICY "nombre_de_la_politica" ON storage.objects;
