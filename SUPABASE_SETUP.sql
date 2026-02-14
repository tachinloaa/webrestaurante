-- ============================================
-- CREAR TABLAS PARA EL RINCONCITO
-- Ejecuta esto PRIMERO en Supabase SQL Editor
-- ============================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Categories Table
CREATE TABLE public.categories (
  id text PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  image_url text,
  slug text NOT NULL UNIQUE
);

-- 3. Menu Items Table
CREATE TABLE public.menu_items (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  category_id text NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  image_url text,
  is_available boolean DEFAULT true
);

-- 4. Promotions Table
CREATE TABLE public.promotions (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  image_url text,
  is_active boolean DEFAULT true
);

-- 5. Weekly Packages Table
CREATE TABLE public.weekly_packages (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  day_of_week text NOT NULL UNIQUE,
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  image_url text
);

-- 6. Create indexes for better performance
CREATE INDEX idx_menu_items_category ON menu_items(category_id);
CREATE INDEX idx_menu_items_available ON menu_items(is_available);
CREATE INDEX idx_promotions_active ON promotions(is_active);
CREATE INDEX idx_promotions_dates ON promotions(start_date, end_date);

-- 7. RLS Policies (Row Level Security)
-- Permitir lectura pública pero escritura solo para usuarios autenticados

-- Categories
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can insert categories" ON public.categories FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update categories" ON public.categories FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete categories" ON public.categories FOR DELETE USING (auth.role() = 'authenticated');

-- Menu Items
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public menu items are viewable by everyone" ON public.menu_items FOR SELECT USING (true);
CREATE POLICY "Admins can insert menu items" ON public.menu_items FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update menu items" ON public.menu_items FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete menu items" ON public.menu_items FOR DELETE USING (auth.role() = 'authenticated');

-- Promotions
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public promotions are viewable by everyone" ON public.promotions FOR SELECT USING (true);
CREATE POLICY "Admins can insert promotions" ON public.promotions FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update promotions" ON public.promotions FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete promotions" ON public.promotions FOR DELETE USING (auth.role() = 'authenticated');

-- Weekly Packages
ALTER TABLE public.weekly_packages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public packages are viewable by everyone" ON public.weekly_packages FOR SELECT USING (true);
CREATE POLICY "Admins can insert packages" ON public.weekly_packages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins can update packages" ON public.weekly_packages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete packages" ON public.weekly_packages FOR DELETE USING (auth.role() = 'authenticated');

-- ============================================
-- STORAGE BUCKET SETUP
-- ============================================
-- Crea un bucket llamado 'images' manualmente en Storage o ejecuta:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

-- Política de storage para permitir subir imágenes (solo usuarios autenticados)
-- CREATE POLICY "Admins can upload images" ON storage.objects FOR INSERT WITH CHECK (
--   bucket_id = 'images' AND auth.role() = 'authenticated'
-- );

-- CREATE POLICY "Public images are viewable by everyone" ON storage.objects FOR SELECT USING (
--   bucket_id = 'images'
-- );

-- ============================================
-- FIN DEL SETUP
-- ============================================
-- Ahora puedes ejecutar MENU_INSERT.sql
