-- ACTUALIZAR PAQUETES SEMANALES CON LOS DATOS CORRECTOS
-- Ejecuta este script DESPUÉS de MENU_COMPLETO_INSERT.sql

-- Eliminar paquetes existentes
DELETE FROM public.weekly_packages;

-- Insertar paquetes semanales correctos
INSERT INTO public.weekly_packages (day_of_week, name, description, price, image_url) VALUES
('Lunes', 'Lunes Especial', '2 Hamburguesas + 1 Papas + 5 Alitas', 250.00, 'https://loremflickr.com/400/300/burger,wings'),
('Martes', 'Martes Come Todo', 'Come todo lo que puedas + 1 Bebida', 300.00, 'https://loremflickr.com/400/300/buffet'),
('Miércoles', 'Miércoles Combo', '1 Hamburguesa + 1 Papas + 1 Jarrito 600ml', 130.00, 'https://loremflickr.com/400/300/burger,fries'),
('Jueves', 'Jueves de Burritos', '2 Burritos + 1 Papas + 1 Jarrito 600ml', 150.00, 'https://loremflickr.com/400/300/burrito'),
('Viernes', 'Viernes de Alitas', '5 Alitas + 1 Papas + 2 Jarritos', 150.00, 'https://loremflickr.com/400/300/wings');

-- Verificar
SELECT * FROM weekly_packages ORDER BY 
  CASE day_of_week
    WHEN 'Lunes' THEN 1
    WHEN 'Martes' THEN 2
    WHEN 'Miércoles' THEN 3
    WHEN 'Jueves' THEN 4
    WHEN 'Viernes' THEN 5
  END;
