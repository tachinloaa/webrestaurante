import React, { useState, useEffect } from 'react';
import { Sparkles, UtensilsCrossed } from 'lucide-react';
import { supabase } from '../lib/supabase';

const Hero: React.FC = () => {
    const [heroImageUrl, setHeroImageUrl] = useState('/images/hero-bg.jpg');

    useEffect(() => {
        loadHeroImage();
    }, []);

    async function loadHeroImage() {
        try {
            const { data, error } = await supabase
                .from('site_settings')
                .select('setting_value')
                .eq('setting_key', 'hero_image_url')
                .single();
            
            if (data && !error) {
                setHeroImageUrl(data.setting_value);
            }
        } catch (error) {
            // Si no se puede cargar, usa la imagen por defecto
            console.log('Usando imagen por defecto del hero');
        }
    }

    return (
        <div className="relative h-[600px] w-full overflow-hidden">
            {/* Background Image with Parallax Effect */}
            <div className="absolute inset-0">
                <img
                    src={heroImageUrl}
                    alt="Comida Mexicana"
                    className="w-full h-full object-cover animate-fade-in scale-110"
                    onError={(e) => {
                        // Fallback a placeholder si no existe la imagen
                        e.currentTarget.src = 'https://loremflickr.com/1920/1080/mexican,restaurant/all';
                    }}
                />
            </div>
            
            {/* Gradient Overlays for depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-stone-900/90 via-stone-900/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
            
            {/* Decorative Pattern Overlay */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            {/* Content with Enhanced Design */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
                <div className="max-w-3xl text-white space-y-6 animate-slide-up">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-sm font-medium text-white w-fit">
                        <Sparkles size={16} className="text-brand-orange" />
                        <span>Auténtica Comida Mexicana</span>
                    </div>
                    
                    {/* Main Title */}
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight text-shadow-lg leading-tight">
                        El <span className="text-brand-orange">Rinconcito</span>
                    </h1>
                    
                    {/* Subtitle with Icon */}
                    <div className="flex items-start gap-3">
                        <UtensilsCrossed className="text-brand-orange mt-1 flex-shrink-0" size={24} />
                        <p className="text-xl md:text-2xl font-light text-stone-100 leading-relaxed max-w-xl">
                            Sabor que reconforta el alma. <span className="text-brand-orange font-semibold">Tradición mexicana</span> en cada bocado.
                        </p>
                    </div>
                    
                    {/* CTA Buttons with Enhanced Design */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a
                            href="#menu"
                            className="group relative bg-gradient-to-r from-brand-orange to-brand-red hover:from-brand-red hover:to-brand-orange text-white py-4 px-8 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-2xl text-center overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                <UtensilsCrossed size={20} />
                                Ver Menú Completo
                            </span>
                            <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                        </a>
                        <a
                            href="#paquetes"
                            className="group bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border-2 border-white/40 hover:border-white/60 py-4 px-8 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-2xl text-center"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <Sparkles size={20} />
                                Paquetes Especiales
                            </span>
                        </a>
                    </div>
                    
                    {/* Trust Indicators */}
                    <div className="flex flex-wrap gap-6 pt-6 text-sm text-stone-200">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>Ingredientes Frescos</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>Recetas Tradicionales</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span>Servicio Rápido</span>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Bottom Wave Decoration */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" fillOpacity="0.1"/>
                    <path d="M0 40L60 46.7C120 53 240 67 360 70C480 73 600 67 720 63.3C840 60 960 60 1080 63.3C1200 67 1320 73 1380 76.7L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V40Z" fill="white" fillOpacity="0.05"/>
                </svg>
            </div>
        </div>
    );
};

export default Hero;
