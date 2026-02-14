import React from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Instagram, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="relative bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 text-cream-dark overflow-hidden">
            {/* Decorative Pattern Overlay */}
            <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
            
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent"></div>
            
            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold font-serif gradient-text mb-4">El Rinconcito</h2>
                        <p className="text-stone-300 text-sm leading-relaxed">
                            Restaurante de comida Mexicana, Buffet, antojitos y algo mas...
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a 
                                href="https://facebook.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-brand-orange text-stone-400 hover:text-white transition-all duration-300 hover:scale-110"
                            >
                                <Facebook size={20} />
                            </a>
                            <a 
                                href="https://instagram.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-brand-orange text-stone-400 hover:text-white transition-all duration-300 hover:scale-110"
                            >
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>
                    
                    {/* Contact Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Phone size={20} className="text-brand-orange" />
                            Contacto
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a 
                                    href="tel:+15707077315" 
                                    className="flex items-center gap-3 text-stone-300 hover:text-brand-orange transition-colors group"
                                >
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 group-hover:bg-brand-orange/20 transition-colors">
                                        <Phone size={16} />
                                    </div>
                                    <span className="font-medium">+1 (570) 707-7315</span>
                                </a>
                            </li>
                            <li>
                                <a 
                                    href="https://maps.app.goo.gl/WJLth24qfnAMg36dA" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-3 text-stone-300 hover:text-brand-orange transition-colors group"
                                >
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 group-hover:bg-brand-orange/20 transition-colors">
                                        <MapPin size={16} />
                                    </div>
                                    <span className="font-medium">Ver ubicación en Google Maps</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Hours Section */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-white mb-4">Horarios</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center p-2 rounded bg-white/5">
                                <span className="text-stone-400">Lunes - Domingo</span>
                                <span className="text-stone-200 font-semibold">7:00 AM - 10:00 PM</span>
                            </div>
                            <div className="mt-3 p-3 rounded bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-500/30">
                                <p className="text-green-300 text-xs font-semibold text-center">
                                    🎉 ¡Abierto todos los días de la semana!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-stone-700">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-stone-500 text-sm text-center md:text-left">
                            &copy; {new Date().getFullYear()} El Rinconcito. Todos los derechos reservados.
                        </p>
                        <div className="flex gap-6 text-sm text-stone-400">
                            <a href="#" className="hover:text-brand-orange transition-colors hover:underline">Términos</a>
                            <a href="#" className="hover:text-brand-orange transition-colors hover:underline">Privacidad</a>
                            <a href="#" className="hover:text-brand-orange transition-colors hover:underline">Cookies</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
