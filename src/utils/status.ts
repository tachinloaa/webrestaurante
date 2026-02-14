import { format } from 'date-fns';

export interface BusinessHours {
    open: string; // "HH:mm"
    close: string; // "HH:mm"
}

// Default schedule - Lunes a Domingo: 7 AM - 10 PM
const DAILY_HOURS: BusinessHours = { open: '07:00', close: '22:00' };

export const getStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const schedule = DAILY_HOURS; // Mismo horario todos los días

    const [openH, openM] = schedule.open.split(':').map(Number);
    const [closeH, closeM] = schedule.close.split(':').map(Number);

    const nowTotalMinutes = currentHour * 60 + currentMinute;
    const openTotalMinutes = openH * 60 + openM;
    const closeTotalMinutes = closeH * 60 + closeM;

    const isOpen = nowTotalMinutes >= openTotalMinutes && nowTotalMinutes < closeTotalMinutes;

    return {
        isOpen,
        message: isOpen ? `Abierto hasta las ${schedule.close}` : `Cerrado. Abre a las ${schedule.open}`,
        schedule
    };
};
