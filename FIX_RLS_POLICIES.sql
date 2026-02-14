-- ========================================
-- SOLUCIÓN RÁPIDA: RLS DISABLED
-- ========================================
-- Ejecuta este script en el SQL Editor de Supabase
-- para permitir que tu aplicación lea los datos

-- OPCIÓN A: DESHABILITAR RLS (Solo para desarrollo/testing)
-- ⚠️ Esto hace que TODOS puedan leer/escribir sin restricciones
-- Descomenta las siguientes líneas si quieres esta opción:

/*
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_packages DISABLE ROW LEVEL SECURITY;
*/

-- OPCIÓN B: HABILITAR RLS CON POLÍTICAS PÚBLICAS (Recomendado)
-- Esto permite lectura pública pero requiere autenticación para escribir

-- 1. Habilitar RLS en todas las tablas
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_packages ENABLE ROW LEVEL SECURITY;

-- 2. Eliminar políticas existentes si las hay
DROP POLICY IF EXISTS "Allow public read access" ON public.categories;
DROP POLICY IF EXISTS "Allow public read access" ON public.products;
DROP POLICY IF EXISTS "Allow public read access" ON public.promotions;
DROP POLICY IF EXISTS "Allow public read access" ON public.weekly_packages;

-- 3. Crear políticas de LECTURA pública
CREATE POLICY "Allow public read access" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.promotions
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.weekly_packages
    FOR SELECT USING (true);

-- 4. (Opcional) Políticas de ESCRITURA solo para usuarios autenticados
-- Descomenta si quieres que solo usuarios autenticados puedan modificar datos:

/*
-- Products
CREATE POLICY "Allow authenticated insert" ON public.products
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON public.products
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON public.products
    FOR DELETE USING (auth.role() = 'authenticated');

-- Promotions
CREATE POLICY "Allow authenticated insert" ON public.promotions
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON public.promotions
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON public.promotions
    FOR DELETE USING (auth.role() = 'authenticated');

-- Weekly Packages
CREATE POLICY "Allow authenticated insert" ON public.weekly_packages
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON public.weekly_packages
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON public.weekly_packages
    FOR DELETE USING (auth.role() = 'authenticated');
*/

-- 5. Verificar que las políticas se crearon correctamente
SELECT 
    schemaname, 
    tablename, 
    policyname, 
    cmd as operation,
    CASE 
        WHEN qual = 'true' THEN 'Public Access'
        ELSE 'Restricted'
    END as access_level
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ✅ DESPUÉS DE EJECUTAR ESTE SCRIPT:
-- 1. Recarga tu aplicación web (Ctrl + F5)
-- 2. Los datos deberían aparecer inmediatamente
-- 3. Si no aparecen, abre la consola (F12) y busca errores
