import React, { useState, useEffect } from 'react';
import Login from '../components/Admin/Login';
import Dashboard from '../components/Admin/Dashboard';
import { supabase } from '../lib/supabase';

const AdminPage: React.FC = () => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check active session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            // Check local fallback
            if (!session && localStorage.getItem('admin_session') === 'true') {
                setSession({ user: { email: 'admin@demo.com' } });
            }
            setLoading(false);
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return <div className="flex h-screen items-center justify-center text-brand-orange animate-pulse">Cargando panel...</div>;
    }

    if (!session) {
        return <Login onLoginSuccess={() => setSession({ user: { email: 'admin@demo.com' } })} />;
    }

    return <Dashboard />;
};

export default AdminPage;
