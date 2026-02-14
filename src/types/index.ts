export interface Category {
    id: string;
    name: string;
    image_url: string;
    slug: string;
}

export interface MenuItem {
    id: string;
    category_id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    is_available: boolean;
}

export interface Promotion {
    id: string;
    title: string;
    image_url: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
}

export interface WeeklyPackage {
    id: string;
    day_of_week: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes';
    name: string;
    description: string;
    price: number;
    image_url: string;
}

export interface BusinessStatus {
    is_open: boolean;
    closing_time?: string;
    opening_time?: string;
}
