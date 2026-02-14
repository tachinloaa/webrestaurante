import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Clock, Phone } from 'lucide-react';
import { getStatus } from '../utils/status';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isOpen: businessOpen, message } = getStatus();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`sticky top-0 z-50 transition-all duration-300 ${
            scrolled 
                ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
                : 'bg-white shadow-md'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo with Image */}
                    <div className="flex-shrink-0">
                        <NavLink to="/" className="flex items-center gap-3 group">
                            <img 
                                src="/images/logo.png" 
                                alt="El Rinconcito Logo" 
                                className="h-12 w-12 object-contain transition-transform group-hover:scale-110 group-hover:rotate-3"
                                onError={(e) => {
                                    // Fallback al texto si no existe la imagen
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                            <div className="text-3xl font-bold gradient-text font-serif transition-transform group-hover:scale-105 hidden">
                                El Rinconcito
                            </div>
                        </NavLink>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-2">
                            <NavLink to="/" className={({ isActive }) =>
                                `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                    isActive 
                                        ? 'bg-gradient-to-r from-brand-orange to-brand-red text-white shadow-lg' 
                                        : 'text-stone-700 hover:bg-orange-50 hover:text-brand-orange'
                                }`
                            }>
                                Inicio
                            </NavLink>
                            <a href="#menu" className="text-stone-700 hover:bg-orange-50 hover:text-brand-orange px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200">
                                Menú
                            </a>
                            <a href="#paquetes" className="text-stone-700 hover:bg-orange-50 hover:text-brand-orange px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200">
                                Paquetes
                            </a>
                            <a href="#promociones" className="bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 px-4 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 animate-pulse">
                                🔥 Promociones
                            </a>
                        </div>
                    </div>

                    {/* Status & Contact */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <div className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 px-4 py-2 rounded-full border border-orange-200">
                            <div className={`w-2.5 h-2.5 rounded-full ${businessOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                            <span className="text-xs text-stone-700 font-bold uppercase tracking-wider">
                                {businessOpen ? 'Abierto Ahora' : 'Cerrado'}
                            </span>
                        </div>
                        <a href="tel:+15707077315" className="flex items-center gap-2 bg-brand-orange hover:bg-brand-red text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
                            <Phone size={16} />
                            <span>Llamar</span>
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="bg-gradient-to-r from-brand-orange to-brand-red inline-flex items-center justify-center p-2.5 rounded-full text-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu with Animation */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-xl animate-slide-up">
                    <div className="px-4 pt-4 pb-6 space-y-2">
                        <NavLink to="/" className="block px-4 py-3 rounded-xl text-base font-semibold text-stone-800 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-brand-orange transition-all">
                            Inicio
                        </NavLink>
                        <a href="#menu" className="block px-4 py-3 rounded-xl text-base font-semibold text-stone-800 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-brand-orange transition-all">
                            Menú
                        </a>
                        <a href="#paquetes" className="block px-4 py-3 rounded-xl text-base font-semibold text-stone-800 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-brand-orange transition-all">
                            Paquetes
                        </a>
                        <a href="#promociones" className="block px-4 py-3 rounded-xl text-base font-bold bg-gradient-to-r from-red-500 to-red-600 text-white text-center shadow-lg animate-pulse">
                            🔥 Promociones
                        </a>
                        
                        {/* Mobile Status & Contact */}
                        <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                            <div className="flex items-center gap-2 px-4">
                                <Clock className="w-5 h-5 text-stone-500" />
                                <span className={`text-sm font-semibold ${businessOpen ? 'text-green-600' : 'text-red-600'}`}>
                                    {message}
                                </span>
                            </div>
                            <a href="tel:+15707077315" className="flex items-center justify-center gap-2 mx-4 bg-brand-orange hover:bg-brand-red text-white px-4 py-3 rounded-full font-bold transition-all shadow-md">
                                <Phone size={18} />
                                <span>Llamar: +1 (570) 707-7315</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
