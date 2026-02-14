import React, { useState, useEffect } from 'react';
import type { MenuItem, Category } from '../types/index';
import { ChevronRight } from 'lucide-react';
import { fetchCategories, fetchMenuItems } from '../services/api';

const Menu: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [items, setItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            setLoading(true);
            const [cats, menuItems] = await Promise.all([
                fetchCategories(),
                fetchMenuItems()
            ]);
            setCategories(cats);
            setItems(menuItems);
            setLoading(false);
        }
        loadData();
    }, []);

    const handleCategoryClick = (categoryId: string) => {
        setSelectedCategory(selectedCategory === categoryId ? null : categoryId);
    };

    if (loading) {
        return (
            <div id="menu" className="py-16 bg-gradient-to-b from-white to-orange-50">
                <div className="container mx-auto px-4 text-center">
                    <div className="animate-pulse space-y-8">
                        <div className="h-10 bg-gradient-to-r from-stone-200 to-orange-200 rounded-xl w-80 mx-auto"></div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="h-40 bg-gradient-to-br from-stone-200 to-orange-200 rounded-2xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (selectedCategory) {
        const category = categories.find(c => c.id === selectedCategory);
        const categoryItems = items.filter(item => item.category_id === selectedCategory);

        return (
            <div id="menu" className="py-16 bg-gradient-to-b from-white to-orange-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-10">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="flex items-center gap-2 text-brand-orange hover:text-brand-red font-bold transition-all hover:gap-3 group"
                        >
                            <span className="text-2xl group-hover:scale-110 transition-transform">←</span>
                            <span>Volver al menú</span>
                        </button>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text">{category?.name}</h2>
                        <div className="w-40"></div>
                    </div>

                    {categoryItems.length === 0 ? (
                        <div className="text-center py-20 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl border-2 border-dashed border-orange-200">
                            <p className="text-stone-500 text-xl font-medium">Próximamente deliciosos platillos aquí. 🍽️</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categoryItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl overflow-hidden card-glow hover:shadow-2xl transition-all duration-300 flex flex-col group transform hover:-translate-y-2">
                                    <div className="relative h-56 overflow-hidden">
                                        <img
                                            src={item.image_url}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="absolute top-3 right-3 bg-gradient-to-r from-brand-orange to-brand-red text-white px-4 py-2 rounded-full font-bold shadow-xl text-lg">
                                            ${item.price.toFixed(2)}
                                        </div>
                                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-stone-700 text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            ⭐ Popular
                                        </div>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <h4 className="text-xl font-bold text-stone-800 mb-2 group-hover:text-brand-orange transition-colors">{item.name}</h4>
                                        <p className="text-stone-600 text-sm mb-4 flex-grow leading-relaxed">{item.description}</p>
                                        <button className="mt-auto w-full bg-gradient-to-r from-brand-orange to-brand-red text-white py-3 rounded-xl font-bold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                                            <span>Ordenar Ahora</span>
                                            <span className="text-xl">→</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div id="menu" className="py-16 bg-gradient-to-b from-white to-orange-50">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text">Nuestro Menú</h2>
                    <p className="text-stone-600 text-lg max-w-2xl mx-auto">
                        Descubre nuestros auténticos sabores mexicanos, preparados con amor y tradición
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-1 w-20 bg-gradient-to-r from-transparent to-brand-orange rounded-full"></div>
                        <div className="h-1 w-10 bg-brand-orange rounded-full"></div>
                        <div className="h-1 w-20 bg-gradient-to-l from-transparent to-brand-orange rounded-full"></div>
                    </div>
                </div>

                {/* Category Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {categories.map((category) => {
                        const itemCount = items.filter(item => item.category_id === category.id).length;
                        return (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryClick(category.id)}
                                className="group relative bg-white rounded-2xl overflow-hidden card-glow hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:rotate-1"
                            >
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={category.image_url}
                                        alt={category.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                                    
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-brand-orange/80 to-brand-red/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    
                                    {/* Content */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform transition-transform duration-300 group-hover:translate-y-0">
                                        <div className="flex items-center justify-between">
                                            <div className="text-left">
                                                <h3 className="font-bold text-base mb-1 group-hover:scale-110 transition-transform">{category.name}</h3>
                                                <p className="text-xs text-stone-200 flex items-center gap-1">
                                                    <span className="inline-block w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                                                    {itemCount} platillo{itemCount !== 1 ? 's' : ''}
                                                </p>
                                            </div>
                                            <ChevronRight className="w-5 h-5 transform group-hover:translate-x-2 group-hover:scale-125 transition-all" />
                                        </div>
                                    </div>
                                    
                                    {/* Badge */}
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-brand-orange text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                        Ver →
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Menu;
