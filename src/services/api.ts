import { supabase } from '../lib/supabase';
import type { Category, MenuItem, WeeklyPackage, Promotion } from '../types';

// Fetch Categories
export async function fetchCategories(): Promise<Category[]> {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

    if (error) {
        console.error('Error fetching categories:', error);
        return [];
    }

    return data.map(cat => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        image_url: cat.image_url || 'https://loremflickr.com/400/300/food'
    }));
}

// Fetch Menu Items
export async function fetchMenuItems(categoryId?: string): Promise<MenuItem[]> {
    let query = supabase
        .from('products')
        .select('*')
        .eq('is_available', true);

    if (categoryId) {
        query = query.eq('category_id', categoryId);
    }

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching menu items:', error);
        return [];
    }

    return data.map(item => ({
        id: item.id,
        category_id: item.category_id, // This is now a UUID
        name: item.name,
        description: item.description || '',
        price: parseFloat(item.price),
        image_url: item.image_url || 'https://loremflickr.com/400/300/food',
        is_available: item.is_available
    }));
}

// Fetch Active Promotions
export async function fetchPromotions(): Promise<Promotion[]> {
    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .eq('is_active', true)
        .lte('start_date', today)
        .gte('end_date', today);

    if (error) {
        console.error('Error fetching promotions:', error);
        return [];
    }

    return data.map(promo => ({
        id: promo.id,
        title: promo.title,
        image_url: promo.image_url || 'https://loremflickr.com/800/400/food',
        start_date: promo.start_date,
        end_date: promo.end_date,
        is_active: promo.is_active
    }));
}

// Fetch Weekly Packages
export async function fetchWeeklyPackages(): Promise<WeeklyPackage[]> {
    const { data, error } = await supabase
        .from('weekly_packages')
        .select('*');

    if (error) {
        console.error('Error fetching weekly packages:', error);
        return [];
    }

    return data.map(pkg => ({
        id: pkg.id,
        day_of_week: pkg.day_of_week as 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes',
        name: pkg.name,
        description: pkg.description || '',
        price: parseFloat(pkg.price),
        image_url: pkg.image_url || 'https://loremflickr.com/400/300/food'
    }));
}
