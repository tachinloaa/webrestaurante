import React, { useState, useEffect } from 'react';
import type { WeeklyPackage } from '../types/index';
import { fetchWeeklyPackages } from '../services/api';
import { Calendar, Sparkles } from 'lucide-react';

const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const WeeklySpecials: React.FC = () => {
    const [packages, setPackages] = useState<WeeklyPackage[]>([]);
    const [loading, setLoading] = useState(true);
    const todayIndex = new Date().getDay();
    const currentDayName = DAYS[todayIndex];

    const [selectedDay, setSelectedDay] = useState<string>(currentDayName === 'Sábado' || currentDayName === 'Domingo' ? 'Lunes' : currentDayName);

    useEffect(() => {
        async function loadPackages() {
            setLoading(true);
            const data = await fetchWeeklyPackages();
            setPackages(data);
            setLoading(false);
        }
        loadPackages();
    }, []);

    if (loading) {
        return (
            <section id="paquetes" className="py-16 bg-gradient-to-b from-orange-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text">Paquetes Semanales</h2>
                        <div className="animate-pulse text-stone-600">Cargando paquetes deliciosos...</div>
                    </div>
                </div>
            </section>
        );
    }

    if (packages.length === 0) {
        return (
            <section id="paquetes" className="py-16 bg-gradient-to-b from-orange-50 to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text">Paquetes Semanales</h2>
                        <p className="text-stone-600">No hay paquetes semanales disponibles en este momento.</p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="paquetes" className="py-16 bg-gradient-to-b from-orange-50 to-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-orange-200 px-4 py-2 rounded-full text-sm font-medium text-brand-orange w-fit mx-auto">
                        <Calendar size={16} />
                        <span>Cada día una nueva experiencia</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold gradient-text">Paquetes Semanales</h2>
                    <p className="text-stone-600 text-lg max-w-2xl mx-auto">
                        Disfruta de nuestros paquetes especiales cada día de la semana
                    </p>
                    <div className="flex items-center justify-center gap-2">
                        <div className="h-1 w-20 bg-gradient-to-r from-transparent to-brand-orange rounded-full"></div>
                        <div className="h-1 w-10 bg-brand-orange rounded-full"></div>
                        <div className="h-1 w-20 bg-gradient-to-l from-transparent to-brand-orange rounded-full"></div>
                    </div>
                </div>

                {/* Horizontal Scroll Cards */}
                <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory hide-scrollbar">
                    {packages.map((pkg) => {
                        const isToday = pkg.day_of_week === currentDayName;
                        const isSelected = selectedDay === pkg.day_of_week;
                        
                        return (
                            <div
                                key={pkg.day_of_week}
                                onClick={() => setSelectedDay(pkg.day_of_week)}
                                className={`flex-shrink-0 w-80 bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 snap-start transform hover:-translate-y-2 ${
                                    isSelected 
                                        ? 'card-glow scale-105 ring-2 ring-brand-orange' 
                                        : 'shadow-lg hover:shadow-2xl'
                                }`}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={pkg.image_url}
                                        alt={pkg.name}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                    
                                    {/* Day Badge */}
                                    <div className={`absolute top-3 left-3 px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 ${
                                        isToday 
                                            ? 'bg-gradient-to-r from-green-500 to-green-600 text-white animate-pulse' 
                                            : 'bg-white/95 backdrop-blur-sm text-brand-orange'
                                    }`}>
                                        {isToday && <Sparkles size={14} />}
                                        <span>{pkg.day_of_week}</span>
                                    </div>
                                    
                                    {/* Price Badge */}
                                    <div className="absolute top-3 right-3 bg-gradient-to-r from-brand-orange to-brand-red text-white px-4 py-2 rounded-full font-bold text-lg shadow-xl">
                                        {pkg.price === 0 ? '🎁 Promo' : `$${pkg.price}`}
                                    </div>
                                </div>
                                
                                <div className="p-6 space-y-3">
                                    <h3 className="font-bold text-stone-800 text-lg group-hover:text-brand-orange transition-colors">
                                        {pkg.name}
                                    </h3>
                                    <p className="text-stone-600 text-sm line-clamp-2 leading-relaxed">
                                        {pkg.description}
                                    </p>
                                    
                                    <button className="w-full bg-gradient-to-r from-brand-orange to-brand-red hover:from-brand-red hover:to-brand-orange text-white px-4 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                                        <span>Pedir Ahora</span>
                                        <span className="text-xl">→</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Scroll Hint */}
                <div className="text-center mt-6 text-stone-500 text-sm">
                    ← Desliza para ver más paquetes →
                </div>
            </div>
        </section>
    );
};

export default WeeklySpecials;
