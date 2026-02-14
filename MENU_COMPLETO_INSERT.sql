-- INSERTAR TODOS LOS PRODUCTOS DEL MENÚ DE EL RINCONCITO
-- Ejecuta este script en Supabase SQL Editor

-- Primero, eliminar productos existentes si los hay
DELETE FROM public.products;

-- PAMBAZOS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Pambazo de Chorizo con Papas', 'Al gusto', 40.00, (SELECT id FROM categories WHERE slug='pambazos' LIMIT 1), 'https://loremflickr.com/400/300/pambazo', true);

-- TOSTADAS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Tostada de Pata de Res', '', 35.00, (SELECT id FROM categories WHERE slug='tostadas' LIMIT 1), 'https://loremflickr.com/400/300/tostada', true),
('Tostada de Tinga de Pollo', '', 35.00, (SELECT id FROM categories WHERE slug='tostadas' LIMIT 1), 'https://loremflickr.com/400/300/tostada', true),
('Tostada de Tinga de Res', '', 35.00, (SELECT id FROM categories WHERE slug='tostadas' LIMIT 1), 'https://loremflickr.com/400/300/tostada', true);

-- HAMBURGUESAS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Hamburguesa Completa', 'Con papas fritas, tocino y queso', 110.00, (SELECT id FROM categories WHERE slug='hamburguesas' LIMIT 1), 'https://loremflickr.com/400/300/burger', true);

-- HOT-DOG
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Hot Dog Completo', 'Con tocino y papas fritas', 75.00, (SELECT id FROM categories WHERE slug='hot-dog' LIMIT 1), 'https://loremflickr.com/400/300/hotdog', true);

-- CALDOS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Caldo de Res Chico', '', 95.00, (SELECT id FROM categories WHERE slug='caldos' LIMIT 1), 'https://loremflickr.com/400/300/soup', true),
('Caldo de Res Grande', '', 110.00, (SELECT id FROM categories WHERE slug='caldos' LIMIT 1), 'https://loremflickr.com/400/300/soup', true),
('Caldo de Pollo Chico', '', 95.00, (SELECT id FROM categories WHERE slug='caldos' LIMIT 1), 'https://loremflickr.com/400/300/soup', true),
('Caldo de Pollo Grande', '', 110.00, (SELECT id FROM categories WHERE slug='caldos' LIMIT 1), 'https://loremflickr.com/400/300/soup', true),
('Pancita de Res Chico', '', 95.00, (SELECT id FROM categories WHERE slug='caldos' LIMIT 1), 'https://loremflickr.com/400/300/menudo', true),
('Pancita de Res Grande', '', 110.00, (SELECT id FROM categories WHERE slug='caldos' LIMIT 1), 'https://loremflickr.com/400/300/menudo', true),
('Pozole', 'Puerco y pollo', 110.00, (SELECT id FROM categories WHERE slug='caldos' LIMIT 1), 'https://loremflickr.com/400/300/pozole', true);

-- BEBIDAS - REFRESCOS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Coca-Cola', '', 40.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/coca-cola', true),
('Fanta', '', 35.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/fanta', true),
('Manzana', '', 35.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/soda', true),
('Sprite', '', 35.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/sprite', true);

-- BEBIDAS - AGUAS FRESCAS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Agua Fresca Mediana', '', 20.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/agua-fresca', true),
('Agua Fresca Grande', '', 35.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/agua-fresca', true),
('Café de Olla', '', 25.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/coffee', true),
('Té de Limón', '', 25.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/tea', true),
('Manzanilla', '', 25.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/tea', true),
('Atole', '', 25.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/atole', true);

-- BEBIDAS - JUGOS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Jugo Natural Mediano', 'Verde, Naranja o Zanahoria', 45.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/juice', true),
('Jugo Natural Grande', 'Verde, Naranja o Zanahoria', 80.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/juice', true);

-- BEBIDAS - LICUADOS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Licuado de Fresa', '', 45.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/smoothie', true),
('Licuado de Plátano', '', 45.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/smoothie', true),
('Licuado de Avena', '', 45.00, (SELECT id FROM categories WHERE slug='bebidas' LIMIT 1), 'https://loremflickr.com/400/300/smoothie', true);

-- DESAYUNOS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Huevos con Jamón', 'Al gusto con papas a la mexicana', 130.00, (SELECT id FROM categories WHERE slug='desayunos' LIMIT 1), 'https://loremflickr.com/400/300/breakfast', true),
('Huevos a la Mexicana', 'Con papas a la mexicana', 130.00, (SELECT id FROM categories WHERE slug='desayunos' LIMIT 1), 'https://loremflickr.com/400/300/breakfast', true),
('Huevos con Longaniza', 'Con papas a la mexicana', 130.00, (SELECT id FROM categories WHERE slug='desayunos' LIMIT 1), 'https://loremflickr.com/400/300/breakfast', true),
('Huevos con Salchicha', 'Con papas a la mexicana', 130.00, (SELECT id FROM categories WHERE slug='desayunos' LIMIT 1), 'https://loremflickr.com/400/300/breakfast', true);

-- CHILAQUILES
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Chilaquiles Rojos con Huevo', '', 135.00, (SELECT id FROM categories WHERE slug='chilaquiles' LIMIT 1), 'https://loremflickr.com/400/300/chilaquiles', true),
('Chilaquiles Rojos con Carne', 'Bisteck o pollo', 150.00, (SELECT id FROM categories WHERE slug='chilaquiles' LIMIT 1), 'https://loremflickr.com/400/300/chilaquiles', true),
('Chilaquiles Verdes con Huevo', '', 135.00, (SELECT id FROM categories WHERE slug='chilaquiles' LIMIT 1), 'https://loremflickr.com/400/300/chilaquiles', true),
('Chilaquiles Verdes con Carne', 'Bisteck o pollo', 150.00, (SELECT id FROM categories WHERE slug='chilaquiles' LIMIT 1), 'https://loremflickr.com/400/300/chilaquiles', true);

-- HOT CAKES
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Hot Cakes', 'Con huevo y tocino', 140.00, (SELECT id FROM categories WHERE slug='hot-cakes' LIMIT 1), 'https://loremflickr.com/400/300/pancakes', true);

-- ENCHILADAS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Enchiladas Verdes', 'Incluyen huevo', 135.00, (SELECT id FROM categories WHERE slug='enchiladas' LIMIT 1), 'https://loremflickr.com/400/300/enchiladas', true),
('Enchiladas Rojas', 'Incluyen huevo', 135.00, (SELECT id FROM categories WHERE slug='enchiladas' LIMIT 1), 'https://loremflickr.com/400/300/enchiladas', true),
('Enchiladas de Pollo', 'Incluyen huevo', 150.00, (SELECT id FROM categories WHERE slug='enchiladas' LIMIT 1), 'https://loremflickr.com/400/300/enchiladas', true),
('Enchiladas de Bisteck', 'Incluyen huevo', 150.00, (SELECT id FROM categories WHERE slug='enchiladas' LIMIT 1), 'https://loremflickr.com/400/300/enchiladas', true),
('Enchiladas de Mole', 'Incluyen huevo', 135.00, (SELECT id FROM categories WHERE slug='enchiladas' LIMIT 1), 'https://loremflickr.com/400/300/enchiladas', true);

-- ENFRIJOLADAS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Enfrijoladas de Pollo', 'Incluyen huevo', 90.00, (SELECT id FROM categories WHERE slug='enfrijoladas' LIMIT 1), 'https://loremflickr.com/400/300/enfrijoladas', true),
('Enfrijoladas de Bisteck', 'Incluyen huevo', 90.00, (SELECT id FROM categories WHERE slug='enfrijoladas' LIMIT 1), 'https://loremflickr.com/400/300/enfrijoladas', true);

-- QUESADILLAS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Quesadilla de Papa', '', 35.00, (SELECT id FROM categories WHERE slug='quesadillas' LIMIT 1), 'https://loremflickr.com/400/300/quesadilla', true),
('Quesadilla de Bisteck', '', 35.00, (SELECT id FROM categories WHERE slug='quesadillas' LIMIT 1), 'https://loremflickr.com/400/300/quesadilla', true),
('Quesadilla de Tinga de Pollo', '', 35.00, (SELECT id FROM categories WHERE slug='quesadillas' LIMIT 1), 'https://loremflickr.com/400/300/quesadilla', true),
('Quesadilla de Tinga de Res', '', 35.00, (SELECT id FROM categories WHERE slug='quesadillas' LIMIT 1), 'https://loremflickr.com/400/300/quesadilla', true),
('Quesadilla de Papas con Rajas', '', 35.00, (SELECT id FROM categories WHERE slug='quesadillas' LIMIT 1), 'https://loremflickr.com/400/300/quesadilla', true),
('Quesadilla de Hongos', '', 35.00, (SELECT id FROM categories WHERE slug='quesadillas' LIMIT 1), 'https://loremflickr.com/400/300/quesadilla', true),
('Quesadilla de Picadillo', '', 35.00, (SELECT id FROM categories WHERE slug='quesadillas' LIMIT 1), 'https://loremflickr.com/400/300/quesadilla', true);

-- TORTAS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Torta de Salchicha', '', 70.00, (SELECT id FROM categories WHERE slug='tortas' LIMIT 1), 'https://loremflickr.com/400/300/torta', true),
('Torta de Salchicha con Queso', '', 85.00, (SELECT id FROM categories WHERE slug='tortas' LIMIT 1), 'https://loremflickr.com/400/300/torta', true),
('Torta de Huevo con Longaniza', '', 70.00, (SELECT id FROM categories WHERE slug='tortas' LIMIT 1), 'https://loremflickr.com/400/300/torta', true),
('Torta de Longaniza', '', 70.00, (SELECT id FROM categories WHERE slug='tortas' LIMIT 1), 'https://loremflickr.com/400/300/torta', true),
('Torta de Jamón', '', 70.00, (SELECT id FROM categories WHERE slug='tortas' LIMIT 1), 'https://loremflickr.com/400/300/torta', true),
('Torta de Milanesa de Pollo', '', 85.00, (SELECT id FROM categories WHERE slug='tortas' LIMIT 1), 'https://loremflickr.com/400/300/torta', true),
('Torta de Milanesa de Pollo con Queso', '', 105.00, (SELECT id FROM categories WHERE slug='tortas' LIMIT 1), 'https://loremflickr.com/400/300/torta', true),
('Torta de Milanesa de Res', '', 85.00, (SELECT id FROM categories WHERE slug='tortas' LIMIT 1), 'https://loremflickr.com/400/300/torta', true);

-- SOPES
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Sope de Bisteck', '', 45.00, (SELECT id FROM categories WHERE slug='sopes' LIMIT 1), 'https://loremflickr.com/400/300/sope', true),
('Sope de Huevo', '', 45.00, (SELECT id FROM categories WHERE slug='sopes' LIMIT 1), 'https://loremflickr.com/400/300/sope', true),
('Sope de Pollo', '', 45.00, (SELECT id FROM categories WHERE slug='sopes' LIMIT 1), 'https://loremflickr.com/400/300/sope', true);

-- TACOS DORADOS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Tacos Dorados de Res', '', 95.00, (SELECT id FROM categories WHERE slug='tacos-dorados' LIMIT 1), 'https://loremflickr.com/400/300/tacos', true),
('Tacos Dorados de Pollo', '', 95.00, (SELECT id FROM categories WHERE slug='tacos-dorados' LIMIT 1), 'https://loremflickr.com/400/300/tacos', true),
('Tacos Dorados de Papas con Longaniza', '', 95.00, (SELECT id FROM categories WHERE slug='tacos-dorados' LIMIT 1), 'https://loremflickr.com/400/300/tacos', true);

-- TACOS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Taco de Cecina', 'Incluye porción de papas', 60.00, (SELECT id FROM categories WHERE slug='tacos' LIMIT 1), 'https://loremflickr.com/400/300/taco', true),
('Taco de Cecina con Queso', 'Incluye porción de papas', 65.00, (SELECT id FROM categories WHERE slug='tacos' LIMIT 1), 'https://loremflickr.com/400/300/taco', true),
('Taco de Chorizo Argentino', 'Incluye porción de papas', 50.00, (SELECT id FROM categories WHERE slug='tacos' LIMIT 1), 'https://loremflickr.com/400/300/taco', true),
('Taco de Chorizo Argentino con Queso', 'Incluye porción de papas', 55.00, (SELECT id FROM categories WHERE slug='tacos' LIMIT 1), 'https://loremflickr.com/400/300/taco', true),
('Taco de Chistorra', 'Incluye porción de papas', 50.00, (SELECT id FROM categories WHERE slug='tacos' LIMIT 1), 'https://loremflickr.com/400/300/taco', true),
('Taco de Chistorra con Queso', 'Incluye porción de papas', 55.00, (SELECT id FROM categories WHERE slug='tacos' LIMIT 1), 'https://loremflickr.com/400/300/taco', true),
('Taco de Bisteck', 'Incluye porción de papas', 50.00, (SELECT id FROM categories WHERE slug='tacos' LIMIT 1), 'https://loremflickr.com/400/300/taco', true),
('Taco de Bisteck con Queso', 'Incluye porción de papas', 55.00, (SELECT id FROM categories WHERE slug='tacos' LIMIT 1), 'https://loremflickr.com/400/300/taco', true),
('Taco de Pollo', 'Incluye porción de papas', 50.00, (SELECT id FROM categories WHERE slug='tacos' LIMIT 1), 'https://loremflickr.com/400/300/taco', true),
('Taco de Pollo con Queso', 'Incluye porción de papas', 55.00, (SELECT id FROM categories WHERE slug='tacos' LIMIT 1), 'https://loremflickr.com/400/300/taco', true),
('Taco Campechano', 'Incluye porción de papas', 50.00, (SELECT id FROM categories WHERE slug='tacos' LIMIT 1), 'https://loremflickr.com/400/300/taco', true),
('Taco Campechano con Queso', 'Incluye porción de papas', 55.00, (SELECT id FROM categories WHERE slug='tacos' LIMIT 1), 'https://loremflickr.com/400/300/taco', true),
('Taco de Carnitas', 'Incluye porción de papas', 30.00, (SELECT id FROM categories WHERE slug='tacos' LIMIT 1), 'https://loremflickr.com/400/300/taco', true);

-- BURRITOS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Burrito de Bisteck', 'Acompañado de papas, arroz o ensalada', 110.00, (SELECT id FROM categories WHERE slug='burritos' LIMIT 1), 'https://loremflickr.com/400/300/burrito', true),
('Burrito de Pollo', 'Acompañado de papas, arroz o ensalada', 100.00, (SELECT id FROM categories WHERE slug='burritos' LIMIT 1), 'https://loremflickr.com/400/300/burrito', true),
('Burrito de Salchicha', 'Acompañado de papas, arroz o ensalada', 80.00, (SELECT id FROM categories WHERE slug='burritos' LIMIT 1), 'https://loremflickr.com/400/300/burrito', true),
('Burrito de Longaniza', 'Acompañado de papas, arroz o ensalada', 110.00, (SELECT id FROM categories WHERE slug='burritos' LIMIT 1), 'https://loremflickr.com/400/300/burrito', true);

-- BANDERILLAS
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Banderilla de Salchicha', '', 30.00, (SELECT id FROM categories WHERE slug='banderillas' LIMIT 1), 'https://loremflickr.com/400/300/corndog', true),
('Banderilla de Salchicha con Papas', '', 40.00, (SELECT id FROM categories WHERE slug='banderillas' LIMIT 1), 'https://loremflickr.com/400/300/corndog', true),
('Banderilla de Queso', '', 30.00, (SELECT id FROM categories WHERE slug='banderillas' LIMIT 1), 'https://loremflickr.com/400/300/corndog', true),
('Banderilla de Queso con Papas', '', 40.00, (SELECT id FROM categories WHERE slug='banderillas' LIMIT 1), 'https://loremflickr.com/400/300/corndog', true),
('Banderilla Combinada', '', 30.00, (SELECT id FROM categories WHERE slug='banderillas' LIMIT 1), 'https://loremflickr.com/400/300/corndog', true),
('Banderilla Combinada con Papas', '', 40.00, (SELECT id FROM categories WHERE slug='banderillas' LIMIT 1), 'https://loremflickr.com/400/300/corndog', true);

-- AROS DE CEBOLLA
INSERT INTO public.products (name, description, price, category_id, image_url, is_available) VALUES
('Aros de Cebolla', '', 40.00, (SELECT id FROM categories WHERE slug='aros-de-cebolla' LIMIT 1), 'https://loremflickr.com/400/300/onionrings', true);

-- Verificar cuántos productos se insertaron
SELECT COUNT(*) as total_productos FROM products;
