-- ========================================
-- ACTUALIZAR IMÁGENES LOCALES EN SUPABASE
-- ========================================
-- Este script actualiza todas las URLs de imágenes para usar las rutas locales
-- Ejecuta este script después de colocar tus imágenes en las carpetas correspondientes

-- ==========================================
-- 1. ACTUALIZAR CATEGORÍAS DEL MENÚ
-- ==========================================

-- Actualiza según los nombres exactos de tus categorías en la base de datos
UPDATE categories SET image_url = '/images/categories/tacos.jpg' WHERE name ILIKE '%taco%';
UPDATE categories SET image_url = '/images/categories/tortas.jpg' WHERE name ILIKE '%torta%';
UPDATE categories SET image_url = '/images/categories/burritos.jpg' WHERE name ILIKE '%burrito%';
UPDATE categories SET image_url = '/images/categories/quesadillas.jpg' WHERE name ILIKE '%quesadilla%';
UPDATE categories SET image_url = '/images/categories/enchiladas.jpg' WHERE name ILIKE '%enchilada%';
UPDATE categories SET image_url = '/images/categories/sopes.jpg' WHERE name ILIKE '%sope%';
UPDATE categories SET image_url = '/images/categories/bebidas.jpg' WHERE name ILIKE '%bebida%';
UPDATE categories SET image_url = '/images/categories/postres.jpg' WHERE name ILIKE '%postre%';
UPDATE categories SET image_url = '/images/categories/especiales.jpg' WHERE name ILIKE '%especial%';
UPDATE categories SET image_url = '/images/categories/desayunos.jpg' WHERE name ILIKE '%desayuno%';
UPDATE categories SET image_url = '/images/categories/comidas.jpg' WHERE name ILIKE '%comida%';
UPDATE categories SET image_url = '/images/categories/antojitos.jpg' WHERE name ILIKE '%antojito%';

-- ==========================================
-- 2. ACTUALIZAR PAQUETES SEMANALES
-- ==========================================

UPDATE weekly_packages SET image_url = '/images/paquetes/lunes.jpg' WHERE day_of_week = 'Lunes';
UPDATE weekly_packages SET image_url = '/images/paquetes/martes.jpg' WHERE day_of_week = 'Martes';
UPDATE weekly_packages SET image_url = '/images/paquetes/miercoles.jpg' WHERE day_of_week = 'Miércoles';
UPDATE weekly_packages SET image_url = '/images/paquetes/jueves.jpg' WHERE day_of_week = 'Jueves';
UPDATE weekly_packages SET image_url = '/images/paquetes/viernes.jpg' WHERE day_of_week = 'Viernes';
UPDATE weekly_packages SET image_url = '/images/paquetes/sabado.jpg' WHERE day_of_week = 'Sábado';
UPDATE weekly_packages SET image_url = '/images/paquetes/domingo.jpg' WHERE day_of_week = 'Domingo';

-- ==========================================
-- 3. ACTUALIZAR PLATILLOS DEL MENÚ
-- ==========================================
-- IMPORTANTE: Debes cambiar estos nombres según tus platillos reales
-- Formato: UPDATE menu_items SET image_url = '/images/menu/nombre-archivo.jpg' WHERE id = 'id-del-platillo';

-- Ejemplo de actualización de platillos:
-- UPDATE menu_items SET image_url = '/images/menu/taco-asada.jpg' WHERE name = 'Taco de Asada';
-- UPDATE menu_items SET image_url = '/images/menu/burrito-pollo.jpg' WHERE name = 'Burrito de Pollo';
-- UPDATE menu_items SET image_url = '/images/menu/quesadilla-queso.jpg' WHERE name = 'Quesadilla de Queso';

-- O puedes actualizar todos los platillos de una categoría:
-- UPDATE menu_items SET image_url = '/images/menu/default-taco.jpg' 
-- WHERE category_id = (SELECT id FROM categories WHERE name = 'Tacos');

-- ==========================================
-- 4. ACTUALIZAR PROMOCIONES
-- ==========================================
-- Actualiza según tus promociones específicas

-- Ejemplo:
-- UPDATE promotions SET image_url = '/images/promociones/2x1-tacos.jpg' WHERE title ILIKE '%2x1%';
-- UPDATE promotions SET image_url = '/images/promociones/combo-familiar.jpg' WHERE title ILIKE '%familiar%';
-- UPDATE promotions SET image_url = '/images/promociones/promo-especial.jpg' WHERE active = true;

-- ==========================================
-- VERIFICAR LOS CAMBIOS
-- ==========================================

-- Ver todas las categorías y sus imágenes
SELECT id, name, image_url FROM categories ORDER BY name;

-- Ver todos los paquetes semanales y sus imágenes
SELECT id, day_of_week, name, image_url FROM weekly_packages ORDER BY 
  CASE day_of_week 
    WHEN 'Lunes' THEN 1
    WHEN 'Martes' THEN 2
    WHEN 'Miércoles' THEN 3
    WHEN 'Jueves' THEN 4
    WHEN 'Viernes' THEN 5
    WHEN 'Sábado' THEN 6
    WHEN 'Domingo' THEN 7
  END;

-- Ver todos los items del menú y sus imágenes
SELECT m.id, m.name, m.image_url, c.name as category 
FROM menu_items m 
JOIN categories c ON m.category_id = c.id 
ORDER BY c.name, m.name;

-- Ver todas las promociones activas y sus imágenes
SELECT id, title, image_url, start_date, end_date 
FROM promotions 
WHERE active = true 
ORDER BY start_date DESC;

-- ==========================================
-- NOTAS IMPORTANTES
-- ==========================================
/*
1. Asegúrate de que los nombres de archivo coincidan EXACTAMENTE con los que subiste
2. Las rutas son relativas a la carpeta public: /images/carpeta/archivo.jpg
3. Usa MINÚSCULAS para los nombres de archivo
4. Evita espacios, usa guiones: taco-asada.jpg (no: Taco Asada.jpg)
5. Formatos recomendados: .jpg para fotos, .png para logos
6. Ejecuta las consultas de VERIFICAR después de actualizar para confirmar los cambios

Si una imagen no aparece:
- Verifica que el archivo exista en la carpeta correcta
- Verifica que el nombre coincida exactamente (con mayúsculas/minúsculas)
- Limpia el cache del navegador (Ctrl + F5)
*/
