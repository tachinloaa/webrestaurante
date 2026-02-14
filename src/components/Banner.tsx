import React, { useEffect, useState } from 'react';
import type { Promotion } from '../types/index';
import { differenceInDays } from 'date-fns';
import { fetchPromotions } from '../services/api';
import { Sparkles, Clock } from 'lucide-react';

const Banner: React.FC = () => {
    const [promo, setPromo] = useState<Promotion | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadPromo() {
            setLoading(true);
            const activePromos = await fetchPromotions();

            // Pick the most specific one (shortest duration usually means special event)
            activePromos.sort((a, b) => {
                const durA = differenceInDays(new Date(a.end_date), new Date(a.start_date));
                const durB = differenceInDays(new Date(b.end_date), new Date(b.start_date));
                return durA - durB;
            });

            if (activePromos.length > 0) {
                setPromo(activePromos[0]);
            }
            setLoading(false);
        }
        loadPromo();
    }, []);

    if (loading) {
        return (
            <div className="relative w-full h-64 md:h-80 overflow-hidden shadow-2xl mb-8 rounded-3xl bg-gradient-to-r from-stone-200 to-orange-200 animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-stone-400 font-semibold">Cargando promoción...</div>
                </div>
            </div>
        );
    }

    if (!promo) return null;

    return (
        <div className="relative w-full h-64 md:h-80 overflow-hidden shadow-2xl mb-8 group rounded-3xl card-glow">
            {/* Background Image with Zoom Effect */}
            <div className="absolute inset-0">
                <img
                    src={promo.image_url}
                    alt={promo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-3xl border-2 border-white/20 group-hover:border-white/40 transition-colors"></div>
            
            {/* Content */}
            <div className="absolute inset-0 flex items-end">
                <div className="p-8 md:p-10 text-white max-w-3xl animate-slide-up space-y-4">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs md:text-sm font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg animate-pulse">
                        <Sparkles size={16} />
                        <span>Promoción Especial</span>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-shadow-lg leading-tight">
                        {promo.title}
                    </h2>
                    
                    {/* Date */}
                    <div className="flex items-center gap-2 text-stone-200">
                        <Clock size={18} />
                        <span className="text-sm md:text-base font-medium">
                            Válido hasta: <span className="font-bold text-white">{new Date(promo.end_date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </span>
                    </div>
                    
                    {/* CTA */}
                    <a 
                        href="#menu" 
                        className="inline-flex items-center gap-2 bg-white text-brand-orange hover:bg-brand-orange hover:text-white px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 mt-2"
                    >
                        <span>Ver Menú</span>
                        <Sparkles size={18} />
                    </a>
                </div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"></div>
        </div>
    );
};

export default Banner;
