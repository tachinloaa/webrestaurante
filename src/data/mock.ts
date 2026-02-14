import type { Category, MenuItem, WeeklyPackage, Promotion } from '../types/index';

export const CATEGORIES: Category[] = [
    { id: '1', name: 'Pambazos', image_url: 'https://loremflickr.com/400/300/pambazo', slug: 'pambazos' },
    { id: '2', name: 'Tostadas', image_url: 'https://loremflickr.com/400/300/tostada', slug: 'tostadas' },
    { id: '3', name: 'Hamburguesas', image_url: 'https://loremflickr.com/400/300/burger', slug: 'hamburguesas' },
    { id: '4', name: 'Hot-Dog', image_url: 'https://loremflickr.com/400/300/hotdog', slug: 'hot-dog' },
    { id: '5', name: 'Caldos', image_url: 'https://loremflickr.com/400/300/soup', slug: 'caldos' },
    { id: '6', name: 'Bebidas', image_url: 'https://loremflickr.com/400/300/drink', slug: 'bebidas' },
    { id: '7', name: 'Desayunos', image_url: 'https://loremflickr.com/400/300/breakfast', slug: 'desayunos' },
    { id: '8', name: 'Chilaquiles', image_url: 'https://loremflickr.com/400/300/chilaquiles', slug: 'chilaquiles' },
    { id: '9', name: 'Hot Cakes', image_url: 'https://loremflickr.com/400/300/pancakes', slug: 'hot-cakes' },
    { id: '10', name: 'Enchiladas', image_url: 'https://loremflickr.com/400/300/enchiladas', slug: 'enchiladas' },
    { id: '11', name: 'Enfrijoladas', image_url: 'https://loremflickr.com/400/300/enfrijoladas', slug: 'enfrijoladas' },
    { id: '12', name: 'Quesadillas', image_url: 'https://loremflickr.com/400/300/quesadilla', slug: 'quesadillas' },
    { id: '13', name: 'Tortas', image_url: 'https://loremflickr.com/400/300/sandwich', slug: 'tortas' },
    { id: '14', name: 'Sopes', image_url: 'https://loremflickr.com/400/300/sope', slug: 'sopes' },
    { id: '15', name: 'Tacos Dorados', image_url: 'https://loremflickr.com/400/300/tacos', slug: 'tacos-dorados' },
    { id: '16', name: 'Tacos', image_url: 'https://loremflickr.com/400/300/taco', slug: 'tacos' },
    { id: '17', name: 'Burritos', image_url: 'https://loremflickr.com/400/300/burrito', slug: 'burritos' },
    { id: '18', name: 'Banderillas', image_url: 'https://loremflickr.com/400/300/corndog', slug: 'banderillas' },
    { id: '19', name: 'Aros de Cebolla', image_url: 'https://loremflickr.com/400/300/onionrings', slug: 'aros-de-cebolla' },
];

export const MOCK_MENU_ITEMS: MenuItem[] = [
    { id: '101', category_id: '1', name: 'Pambazo Tradicional', description: 'Relleno de papa con chorizo, lechuga, crema y queso.', price: 45, image_url: 'https://loremflickr.com/400/300/pambazo', is_available: true },
    { id: '201', category_id: '3', name: 'Hamburguesa Especial', description: 'Carne de res, jamón, queso, piña y tocino.', price: 85, image_url: 'https://loremflickr.com/400/300/burger', is_available: true },
    { id: '301', category_id: '16', name: 'Tacos de Asada x5', description: '5 tacos de asada con cebolla y cilantro.', price: 90, image_url: 'https://loremflickr.com/400/300/tacos', is_available: true },
    // Add more items as needed
];

export const WEEKLY_PACKAGES: WeeklyPackage[] = [
    { id: 'wk1', day_of_week: 'Lunes', name: 'Lunes de Caldos', description: 'Caldo tlalpeño + Agua fresca', price: 95, image_url: 'https://loremflickr.com/400/300/soup' },
    { id: 'wk2', day_of_week: 'Martes', name: 'Martes de Tacos', description: '3x2 en todos los tacos sencillos', price: 0, image_url: 'https://loremflickr.com/400/300/tacos' },
    { id: 'wk3', day_of_week: 'Miércoles', name: 'Miércoles de Gorditas', description: 'Gorditas a $20 c/u', price: 20, image_url: 'https://loremflickr.com/400/300/gordita' },
    { id: 'wk4', day_of_week: 'Jueves', name: 'Jueves Pozolero', description: 'Plato grande de pozole + tostadas', price: 110, image_url: 'https://loremflickr.com/400/300/pozole' },
    { id: 'wk5', day_of_week: 'Viernes', name: 'Viernes de Antojitos', description: 'Sopes, tlacoyos y quesadillas al 3x2', price: 0, image_url: 'https://loremflickr.com/400/300/antojitos' },
];

export const PROMOTIONS: Promotion[] = [
    {
        id: 'promo1',
        title: '¡Feliz San Valentín! 2x1 en Postres',
        image_url: 'https://loremflickr.com/800/400/valentine,dessert',
        start_date: '2026-02-10',
        end_date: '2026-02-15',
        is_active: true
    },
    {
        id: 'promo_default',
        title: 'Desayunos completos desde $89',
        image_url: 'https://loremflickr.com/800/400/breakfast',
        start_date: '2026-01-01',
        end_date: '2026-12-31',
        is_active: true
    }
];
