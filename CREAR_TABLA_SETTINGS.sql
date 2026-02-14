-- Crear tabla de configuración del sitio
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar configuración inicial de la imagen hero
INSERT INTO site_settings (setting_key, setting_value, description)
VALUES 
    ('hero_image_url', '/images/hero-bg.jpg', 'Imagen principal de la portada/hero del sitio')
ON CONFLICT (setting_key) DO NOTHING;

-- Política de seguridad: cualquiera puede leer
CREATE POLICY "Public can read settings"
    ON site_settings FOR SELECT
    USING (true);

-- Política de seguridad: solo usuarios autenticados pueden actualizar
CREATE POLICY "Authenticated users can update settings"
    ON site_settings FOR UPDATE
    TO authenticated
    USING (true);

-- Habilitar RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
