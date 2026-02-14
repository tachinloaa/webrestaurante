-- INSERTAR CATEGORÍAS (Si aún no tienes una tabla de categorías, puedes crearla o usar strings directos en products. 
-- Aquí asumiré que usamos strings en el campo 'category_id' de products como se definió antes, 
-- PERO para una mejor estructura voy a crear una tabla de categorías primero y relacionarla).

create table public.categories (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  slug text not null,
  image_url text
);

-- Insertar Categorías
INSERT INTO public.categories (name, slug, image_url) VALUES
('Pambazos', 'pambazos', 'https://loremflickr.com/400/300/pambazo'),
('Tostadas', 'tostadas', 'https://loremflickr.com/400/300/tostada'),
('Hamburguesas', 'hamburguesas', 'https://loremflickr.com/400/300/burger'),
('Hot-Dog', 'hot-dog', 'https://loremflickr.com/400/300/hotdog'),
('Caldos', 'caldos', 'https://loremflickr.com/400/300/soup'),
('Bebidas', 'bebidas', 'https://loremflickr.com/400/300/drink'),
('Desayunos', 'desayunos', 'https://loremflickr.com/400/300/breakfast'),
('Chilaquiles', 'chilaquiles', 'https://loremflickr.com/400/300/chilaquiles'),
('Hot Cakes', 'hot-cakes', 'https://loremflickr.com/400/300/pancakes'),
('Enchiladas', 'enchiladas', 'https://loremflickr.com/400/300/enchiladas'),
('Enfrijoladas', 'enfrijoladas', 'https://loremflickr.com/400/300/enfrijoladas'),
('Quesadillas', 'quesadillas', 'https://loremflickr.com/400/300/quesadilla'),
('Tortas', 'tortas', 'https://loremflickr.com/400/300/sandwich'),
('Sopes', 'sopes', 'https://loremflickr.com/400/300/sope'),
('Tacos Dorados', 'tacos-dorados', 'https://loremflickr.com/400/300/tacos'),
('Tacos', 'tacos', 'https://loremflickr.com/400/300/taco'),
('Burritos', 'burritos', 'https://loremflickr.com/400/300/burrito'),
('Banderillas', 'banderillas', 'https://loremflickr.com/400/300/corndog'),
('Aros de Cebolla', 'aros-de-cebolla', 'https://loremflickr.com/400/300/onionrings');

-- INSERTAR PRODUCTOS (Ejemplos básicos unidos a las categorías por nombre o ID simulado)
-- Nota: En un entorno real, primero obtendrías los IDs reales de las categorías insertadas arriba.
-- Para simplicidad en este script SQL directo, usaré una subconsulta para obtener el ID de la categoría por su nombre.

INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
-- Pambazos
('Pambazo Tradicional', 'Papa con chorizo, lechuga, queso y crema.', 45.00, (SELECT id FROM categories WHERE slug='pambazos' LIMIT 1), 'https://loremflickr.com/400/300/pambazo', true),
('Pambazo de Pollo', 'Relleno de tinga de pollo.', 50.00, (SELECT id FROM categories WHERE slug='pambazos' LIMIT 1), 'https://loremflickr.com/400/300/pambazo', true),

-- Tostadas
('Tostada de Tinga', 'Tinga de pollo con frijoles, lechuga y queso.', 35.00, (SELECT id FROM categories WHERE slug='tostadas' LIMIT 1), 'https://loremflickr.com/400/300/tostada', true),
('Tostada de Pata', 'Pata de res en vinagre.', 35.00, (SELECT id FROM categories WHERE slug='tostadas' LIMIT 1), 'https://loremflickr.com/400/300/tostada', true),

-- Hamburguesas
('Hamburguesa Sencilla', 'Carne de res, queso amarillo, lechuga y jitomate.', 65.00, (SELECT id FROM categories WHERE slug='hamburguesas' LIMIT 1), 'https://loremflickr.com/400/300/burger', true),
('Hamburguesa Hawaiana', 'Con piña, jamón y quesillo.', 75.00, (SELECT id FROM categories WHERE slug='hamburguesas' LIMIT 1), 'https://loremflickr.com/400/300/burger', true),

-- Caldos
('Caldo Tlalpeño', 'Con pollo, garbanzo, verduras y chipotle.', 85.00, (SELECT id FROM categories WHERE slug='caldos' LIMIT 1), 'https://loremflickr.com/400/300/soup', true),
('Pancita', 'Tradicional pancita de res (Solo fines de semana).', 95.00, (SELECT id FROM categories WHERE slug='caldos' LIMIT 1), 'https://loremflickr.com/400/300/menudo', true),

-- Desayunos
('Huevos al Gusto', 'Revueltos o estrellados con jamón, salchicha o chorizo.', 70.00, (SELECT id FROM categories WHERE slug='desayunos' LIMIT 1), 'https://loremflickr.com/400/300/breakfast', true),

-- Chilaquiles
('Chilaquiles Verdes', 'Con pollo deshebrado o huevo.', 80.00, (SELECT id FROM categories WHERE slug='chilaquiles' LIMIT 1), 'https://loremflickr.com/400/300/chilaquiles', true),
('Chilaquiles Rojos', 'Salsa roja suave con costilla de res.', 95.00, (SELECT id FROM categories WHERE slug='chilaquiles' LIMIT 1), 'https://loremflickr.com/400/300/chilaquiles', true),

-- Tacos
('Orden de Tacos Dorados', '4 flautas de pollo con crema y queso.', 60.00, (SELECT id FROM categories WHERE slug='tacos-dorados' LIMIT 1), 'https://loremflickr.com/400/300/tacos', true),
('Taco de Bistec', 'Tortilla hecha a mano.', 25.00, (SELECT id FROM categories WHERE slug='tacos' LIMIT 1), 'https://loremflickr.com/400/300/taco', true);


-- INSERTAR PROMOCIONES
INSERT INTO public.promotions (title, start_date, end_date, image_url, is_active) VALUES
('¡San Valentín! Cena para dos', '2026-02-10', '2026-02-15', 'https://loremflickr.com/800/400/valentine,dinner', true),
('Descuento en Desayunos', '2026-03-01', '2026-03-31', 'https://loremflickr.com/800/400/breakfast,coffee', true);

-- INSERTAR PAQUETES SEMANALES
INSERT INTO public.weekly_packages (day_of_week, name, description, price, image_url) VALUES
('Lunes', 'Lunes de Energía', 'Chilaquiles + Jugo Naranja', 85.00, 'https://loremflickr.com/400/300/chilaquiles'),
('Martes', 'Martes de Tacos', '3x2 en Tacos al Pastor', 0.00, 'https://loremflickr.com/400/300/tacos'),
('Miércoles', 'Ombligo de Semana', 'Hamburguesa + Refresco', 80.00, 'https://loremflickr.com/400/300/burger'),
('Jueves', 'Jueves Pozolero', 'Pozole Chico + Tostada', 90.00, 'https://loremflickr.com/400/300/pozole'),
('Viernes', 'Viernes Social', 'Orden de alitas + Cerveza', 120.00, 'https://loremflickr.com/400/300/wings');
