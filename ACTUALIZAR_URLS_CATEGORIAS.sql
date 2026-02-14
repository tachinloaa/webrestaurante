-- ============================================
-- ACTUALIZAR URLS DE CATEGORÍAS - MÉTODO RÁPIDO
-- ============================================
-- Este script actualiza las URLs de las categorías para usar imágenes locales
-- Coloca las imágenes en: public/images/categories/

-- ============================================
-- OPCIÓN 1: USAR IMÁGENES LOCALES
-- ============================================
-- Primero coloca tus imágenes en public/images/categories/ con estos nombres:

UPDATE categories SET image_url = '/images/categories/tacos.jpg' WHERE name ILIKE '%taco%' AND name NOT ILIKE '%dorado%';
UPDATE categories SET image_url = '/images/categories/tacos-dorados.jpg' WHERE name ILIKE '%taco%dorado%';
UPDATE categories SET image_url = '/images/categories/tortas.jpg' WHERE name ILIKE '%torta%';
UPDATE categories SET image_url = '/images/categories/burritos.jpg' WHERE name ILIKE '%burrito%';
UPDATE categories SET image_url = '/images/categories/quesadillas.jpg' WHERE name ILIKE '%quesadilla%';
UPDATE categories SET image_url = '/images/categories/sopes.jpg' WHERE name ILIKE '%sope%';
UPDATE categories SET image_url = '/images/categories/tostadas.jpg' WHERE name ILIKE '%tostada%';
UPDATE categories SET image_url = '/images/categories/pambazos.jpg' WHERE name ILIKE '%pambazo%';
UPDATE categories SET image_url = '/images/categories/hot-cakes.jpg' WHERE name ILIKE '%hot%cake%';
UPDATE categories SET image_url = '/images/categories/hot-dog.jpg' WHERE name ILIKE '%hot%dog%';
UPDATE categories SET image_url = '/images/categories/bebidas.jpg' WHERE name ILIKE '%bebida%';
UPDATE categories SET image_url = '/images/categories/postres.jpg' WHERE name ILIKE '%postre%';
UPDATE categories SET image_url = '/images/categories/especiales.jpg' WHERE name ILIKE '%especial%';
UPDATE categories SET image_url = '/images/categories/desayunos.jpg' WHERE name ILIKE '%desayuno%';
UPDATE categories SET image_url = '/images/categories/comidas.jpg' WHERE name ILIKE '%comida%';
UPDATE categories SET image_url = '/images/categories/antojitos.jpg' WHERE name ILIKE '%antojito%';
UPDATE categories SET image_url = '/images/categories/enchiladas.jpg' WHERE name ILIKE '%enchilada%';
UPDATE categories SET image_url = '/images/categories/sincronizadas.jpg' WHERE name ILIKE '%sincronizada%';
UPDATE categories SET image_url = '/images/categories/chilaquiles.jpg' WHERE name ILIKE '%chilaquile%';

-- ============================================
-- OPCIÓN 2: USAR LOREMFLICKR (TEMPORAL)
-- ============================================
-- Si no tienes imágenes aún, usa estas URLs temporales:

-- UPDATE categories SET image_url = 'https://loremflickr.com/800/600/tacos/all' WHERE name ILIKE '%taco%' AND name NOT ILIKE '%dorado%';
-- UPDATE categories SET image_url = 'https://loremflickr.com/800/600/tacos,dorados/all' WHERE name ILIKE '%taco%dorado%';
-- UPDATE categories SET image_url = 'https://loremflickr.com/800/600/torta,mexican/all' WHERE name ILIKE '%torta%';
-- UPDATE categories SET image_url = 'https://loremflickr.com/800/600/burrito/all' WHERE name ILIKE '%burrito%';
-- UPDATE categories SET image_url = 'https://loremflickr.com/800/600/quesadilla/all' WHERE name ILIKE '%quesadilla%';
-- UPDATE categories SET image_url = 'https://loremflickr.com/800/600/sopes,mexican/all' WHERE name ILIKE '%sope%';
-- UPDATE categories SET image_url = 'https://loremflickr.com/800/600/tostada,mexican/all' WHERE name ILIKE '%tostada%';
-- UPDATE categories SET image_url = 'https://loremflickr.com/800/600/pambazo,mexican/all' WHERE name ILIKE '%pambazo%';
-- UPDATE categories SET image_url = 'https://loremflickr.com/800/600/pancakes/all' WHERE name ILIKE '%hot%cake%';
-- UPDATE categories SET image_url = 'https://loremflickr.com/800/600/hotdog/all' WHERE name ILIKE '%hot%dog%';
-- UPDATE categories SET image_url = 'https://loremflickr.com/800/600/drinks,mexican/all' WHERE name ILIKE '%bebida%';
-- UPDATE categories SET image_url = 'https://loremflickr.com/800/600/dessert,mexican/all' WHERE name ILIKE '%postre%';

-- ============================================
-- OPCIÓN 3: URLS PERSONALIZADAS POR ID
-- ============================================
-- Si conoces los IDs exactos de tus categorías, usa este método:

-- UPDATE categories SET image_url = '/images/categories/tacos.jpg' WHERE id = 'uuid-aqui';
-- UPDATE categories SET image_url = '/images/categories/tortas.jpg' WHERE id = 'uuid-aqui';
-- ... etc

-- ============================================
-- VER TODAS LAS CATEGORÍAS Y SUS URLS
-- ============================================

SELECT 
    id,
    name,
    image_url,
    CASE 
        WHEN image_url LIKE '/images/%' THEN '✅ Local'
        WHEN image_url LIKE 'https://%' THEN '🌐 Externa'
        ELSE '❌ Sin configurar'
    END as tipo
FROM categories 
ORDER BY name;

-- ============================================
-- NOMBRES DE ARCHIVOS NECESARIOS
-- ============================================
/*
Coloca estas imágenes en: public/images/categories/

tacos.jpg
tacos-dorados.jpg
tortas.jpg
burritos.jpg
quesadillas.jpg
sopes.jpg
tostadas.jpg
pambazos.jpg
hot-cakes.jpg
hot-dog.jpg
bebidas.jpg
postres.jpg
especiales.jpg
desayunos.jpg
comidas.jpg
antojitos.jpg
enchiladas.jpg
sincronizadas.jpg
chilaquiles.jpg

IMPORTANTE: 
- Nombres en minúsculas
- Sin espacios (usa guiones)
- Extensión .jpg o .png
*/
