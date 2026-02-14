import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const phoneNumber = '15707077315'; // +1 (570) 707-7315
    const message = encodeURIComponent('Hola');
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

    return (
        <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50">
            {/* Tooltip */}
            {isHovered && (
                <div className="absolute bottom-full right-0 mb-3 bg-stone-800 text-white px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap shadow-xl animate-slide-up">
                    ¡Chatea con nosotros!
                    <div className="absolute top-full right-6 -mt-1 border-8 border-transparent border-t-stone-800"></div>
                </div>
            )}
            
            {/* Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative group flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-bounce hover:animate-none"
                aria-label="Chat on WhatsApp"
            >
                {/* Pulse Ring */}
                <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full bg-green-400 opacity-50 blur-xl group-hover:opacity-70 transition-opacity"></div>
                
                {/* Icon */}
                <MessageCircle size={28} fill="white" className="text-white relative z-10 md:w-8 md:h-8" />
                
                {/* Badge Notification Dot */}
                <div className="absolute top-0 right-0 w-3 h-3 md:w-4 md:h-4 bg-red-500 border-2 border-white rounded-full animate-pulse"></div>
            </a>
        </div>
    );
};

export default WhatsAppButton;
