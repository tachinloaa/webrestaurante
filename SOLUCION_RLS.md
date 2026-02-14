# 🚨 SOLUCIÓN RÁPIDA - RLS DISABLED

## Problema
Tus tablas muestran "RLS disabled" en Supabase, por lo que las consultas están siendo bloqueadas.

## Solución Inmediata

### Opción 1: Deshabilitar RLS completamente (SOLO PARA DESARROLLO)

Ejecuta esto en el SQL Editor de Supabase:

```sql
-- ⚠️ ADVERTENCIA: Esto deshabilita la seguridad. Solo para desarrollo/testing.
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_packages DISABLE ROW LEVEL SECURITY;
```

### Opción 2: Habilitar RLS con políticas públicas (RECOMENDADO)

Ejecuta esto en el SQL Editor de Supabase:

```sql
-- 1. Habilitar RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weekly_packages ENABLE ROW LEVEL SECURITY;

-- 2. Crear políticas de lectura pública
CREATE POLICY "Allow public read access" ON public.categories
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.promotions
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON public.weekly_packages
    FOR SELECT USING (true);
```

## Verificación

Después de ejecutar cualquiera de las opciones:

1. Recarga tu página web (Ctrl + F5)
2. Abre la consola del navegador (F12)
3. Deberías ver los datos cargándose

## ¿Qué opción elegir?

- **Opción 1 (Deshabilitar RLS)**: Más rápido, pero menos seguro. Úsalo solo para desarrollo.
- **Opción 2 (Habilitar RLS con políticas)**: Más seguro, recomendado para producción.

## Siguiente paso

Una vez que ejecutes el SQL, tus datos deberían aparecer inmediatamente en la página.
