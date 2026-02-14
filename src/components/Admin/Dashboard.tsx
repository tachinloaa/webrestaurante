import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Trash2, Edit, Save, Plus, X, Menu } from 'lucide-react';
import { fetchCategories, fetchMenuItems, fetchPromotions, fetchWeeklyPackages } from '../../services/api';
import type { Category, MenuItem, Promotion, WeeklyPackage } from '../../types';

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'products' | 'promos' | 'weekly' | 'categories' | 'hero'>('products');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // State
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<MenuItem[]>([]);
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const [weeklyPackages, setWeeklyPackages] = useState<WeeklyPackage[]>([]);
    const [loading, setLoading] = useState(true);

    // Edit states
    const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null);
    const [editingPackage, setEditingPackage] = useState<WeeklyPackage | null>(null);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showAddPromotion, setShowAddPromotion] = useState(false);
    const [showAddPackage, setShowAddPackage] = useState(false);
    const [heroImageUrl, setHeroImageUrl] = useState<string>('/images/hero-bg.jpg');

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category_id: '',
        description: '',
        image_url: ''
    });
    const [newPromotion, setNewPromotion] = useState({
        title: '',
        image_url: '',
        start_date: '',
        end_date: ''
    });
    const [newPackage, setNewPackage] = useState({
        day_of_week: 'Lunes',
        name: '',
        description: '',
        price: '',
        image_url: ''
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        loadAllData();
    }, []);

    async function loadAllData() {
        setLoading(true);
        const [cats, prods, promos, packages] = await Promise.all([
            fetchCategories(),
            fetchMenuItems(),
            fetchPromotions(),
            fetchWeeklyPackages()
        ]);
        setCategories(cats);
        setProducts(prods);
        setPromotions(promos);
        setWeeklyPackages(packages);
        if (cats.length > 0) {
            setNewProduct(prev => ({ ...prev, category_id: cats[0].id }));
        }
        // Cargar configuración del hero
        await loadHeroImage();
        setLoading(false);
    }

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
            console.log('No se pudo cargar la configuración del hero');
        }
    }

    // Upload image to Supabase Storage
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `products/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);

            if (isEdit && editingProduct) {
                setEditingProduct({ ...editingProduct, image_url: data.publicUrl });
            } else {
                setNewProduct(prev => ({ ...prev, image_url: data.publicUrl }));
            }

            alert('✅ Imagen subida correctamente!');
        } catch (error: any) {
            alert('❌ Error subiendo imagen: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    // Add new product
    const handleAddProduct = async () => {
        if (!newProduct.name || !newProduct.price || !newProduct.category_id) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }

        try {
            const { error } = await supabase.from('products').insert([{
                name: newProduct.name,
                description: newProduct.description,
                price: parseFloat(newProduct.price),
                category_id: newProduct.category_id,
                image_url: newProduct.image_url || 'https://loremflickr.com/400/300/food',
                is_available: true
            }]);

            if (error) throw error;

            alert('✅ Producto agregado!');
            setNewProduct({ name: '', price: '', category_id: categories[0]?.id || '', description: '', image_url: '' });
            setShowAddProduct(false);
            loadAllData();
        } catch (error: any) {
            alert('❌ Error: ' + error.message);
        }
    };

    // Add new promotion
    const handleAddPromotion = async () => {
        if (!newPromotion.title || !newPromotion.start_date || !newPromotion.end_date) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }

        try {
            const { error } = await supabase.from('promotions').insert([{
                title: newPromotion.title,
                image_url: newPromotion.image_url || 'https://loremflickr.com/800/400/food',
                start_date: newPromotion.start_date,
                end_date: newPromotion.end_date,
                is_active: true
            }]);

            if (error) throw error;

            alert('✅ Promoción agregada!');
            setNewPromotion({ title: '', image_url: '', start_date: '', end_date: '' });
            setShowAddPromotion(false);
            loadAllData();
        } catch (error: any) {
            alert('❌ Error: ' + error.message);
        }
    };

    // Add new package
    const handleAddPackage = async () => {
        if (!newPackage.name || !newPackage.description || !newPackage.day_of_week) {
            alert('Por favor completa todos los campos obligatorios');
            return;
        }

        try {
            const { error } = await supabase.from('weekly_packages').insert([{
                day_of_week: newPackage.day_of_week,
                name: newPackage.name,
                description: newPackage.description,
                price: parseFloat(newPackage.price) || 0,
                image_url: newPackage.image_url || 'https://loremflickr.com/400/300/meal',
                is_active: true
            }]);

            if (error) throw error;

            alert('✅ Paquete agregado!');
            setNewPackage({ day_of_week: 'Lunes', name: '', description: '', price: '', image_url: '' });
            setShowAddPackage(false);
            loadAllData();
        } catch (error: any) {
            alert('❌ Error: ' + error.message);
        }
    };

    // Update product
    const handleUpdateProduct = async () => {
        if (!editingProduct) return;

        try {
            const { error } = await supabase
                .from('products')
                .update({
                    name: editingProduct.name,
                    description: editingProduct.description,
                    price: editingProduct.price,
                    category_id: editingProduct.category_id,
                    image_url: editingProduct.image_url
                })
                .eq('id', editingProduct.id);

            if (error) throw error;

            alert('✅ Producto actualizado!');
            setEditingProduct(null);
            loadAllData();
        } catch (error: any) {
            alert('❌ Error: ' + error.message);
        }
    };

    // Delete product
    const handleDeleteProduct = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este producto?')) return;

        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;

            alert('✅ Producto eliminado!');
            loadAllData();
        } catch (error: any) {
            alert('❌ Error: ' + error.message);
        }
    };

    // Delete promotion
    const handleDeletePromotion = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar esta promoción?')) return;

        try {
            const { error } = await supabase.from('promotions').delete().eq('id', id);
            if (error) throw error;

            alert('✅ Promoción eliminada!');
            loadAllData();
        } catch (error: any) {
            alert('❌ Error: ' + error.message);
        }
    };

    // Delete package
    const handleDeletePackage = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este paquete?')) return;

        try {
            const { error } = await supabase.from('weekly_packages').delete().eq('id', id);
            if (error) throw error;

            alert('✅ Paquete eliminado!');
            loadAllData();
        } catch (error: any) {
            alert('❌ Error: ' + error.message);
        }
    };

    // Update weekly package
    const handleUpdatePackage = async () => {
        if (!editingPackage) return;

        try {
            const { error } = await supabase
                .from('weekly_packages')
                .update({
                    name: editingPackage.name,
                    description: editingPackage.description,
                    price: editingPackage.price,
                    image_url: editingPackage.image_url
                })
                .eq('id', editingPackage.id);

            if (error) throw error;

            alert('✅ Paquete actualizado!');
            setEditingPackage(null);
            loadAllData();
        } catch (error: any) {
            alert('❌ Error: ' + error.message);
        }
    };

    // Update promotion
    const handleUpdatePromotion = async () => {
        if (!editingPromotion) return;

        try {
            const { error } = await supabase
                .from('promotions')
                .update({
                    title: editingPromotion.title,
                    image_url: editingPromotion.image_url,
                    start_date: editingPromotion.start_date,
                    end_date: editingPromotion.end_date
                })
                .eq('id', editingPromotion.id);

            if (error) throw error;

            alert('✅ Promoción actualizada!');
            setEditingPromotion(null);
            loadAllData();
        } catch (error: any) {
            alert('❌ Error: ' + error.message);
        }
    };

    // Update category
    const handleUpdateCategory = async () => {
        if (!editingCategory) return;

        try {
            const { error } = await supabase
                .from('categories')
                .update({
                    name: editingCategory.name,
                    image_url: editingCategory.image_url
                })
                .eq('id', editingCategory.id);

            if (error) throw error;

            alert('✅ Categoría actualizada!');
            setEditingCategory(null);
            loadAllData();
        } catch (error: any) {
            alert('❌ Error: ' + error.message);
        }
    };

    // Upload category image
    const handleCategoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0 || !editingCategory) return;
        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `category-${Math.random()}.${fileExt}`;
        const filePath = `categories/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setEditingCategory({ ...editingCategory, image_url: data.publicUrl });
            alert('✅ Imagen subida correctamente!');
        } catch (error: any) {
            alert('❌ Error subiendo imagen: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    // Upload hero image
    const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `hero-${Date.now()}.${fileExt}`;
        const filePath = `hero/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setHeroImageUrl(data.publicUrl);
            alert('✅ Imagen de portada subida! Ahora guarda los cambios.');
        } catch (error: any) {
            alert('❌ Error subiendo imagen: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    // Upload promotion image
    const handlePromotionImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0 || !editingPromotion) return;
        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `promo-${Date.now()}.${fileExt}`;
        const filePath = `promociones/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setEditingPromotion({ ...editingPromotion, image_url: data.publicUrl });
            alert('✅ Imagen subida correctamente!');
        } catch (error: any) {
            alert('❌ Error subiendo imagen: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    // Upload package image
    const handlePackageImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0 || !editingPackage) return;
        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `package-${Date.now()}.${fileExt}`;
        const filePath = `paquetes/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setEditingPackage({ ...editingPackage, image_url: data.publicUrl });
            alert('✅ Imagen subida correctamente!');
        } catch (error: any) {
            alert('❌ Error subiendo imagen: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    // Upload new promotion image
    const handleNewPromotionImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `promo-new-${Date.now()}.${fileExt}`;
        const filePath = `promociones/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setNewPromotion({ ...newPromotion, image_url: data.publicUrl });
            alert('✅ Imagen subida correctamente!');
        } catch (error: any) {
            alert('❌ Error subiendo imagen: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    // Upload new package image
    const handleNewPackageImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        setUploading(true);
        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `package-new-${Date.now()}.${fileExt}`;
        const filePath = `paquetes/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setNewPackage({ ...newPackage, image_url: data.publicUrl });
            alert('✅ Imagen subida correctamente!');
        } catch (error: any) {
            alert('❌ Error subiendo imagen: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    // Update hero image in database
    const handleUpdateHeroImage = async () => {
        try {
            const { error } = await supabase
                .from('site_settings')
                .upsert({
                    setting_key: 'hero_image_url',
                    setting_value: heroImageUrl,
                    description: 'Imagen principal de la portada/hero del sitio'
                }, {
                    onConflict: 'setting_key'
                });

            if (error) throw error;

            alert('✅ Imagen de portada actualizada! Recarga la página principal para ver los cambios.');
        } catch (error: any) {
            alert('❌ Error: ' + error.message);
        }
    };

    // Logout function
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            window.location.href = '/admin';
        } catch (error: any) {
            alert('❌ Error al cerrar sesión: ' + error.message);
        }
    };

    const getCategoryName = (categoryId: string) => {
        const cat = categories.find(c => c.id === categoryId);
        return cat ? cat.name : 'Sin categoría';
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-stone-100">
                <div className="text-xl text-stone-600 animate-pulse">Cargando panel...</div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-stone-100 overflow-hidden">
            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 bg-stone-900 text-white p-4 flex justify-between items-center z-50 shadow-lg">
                <h1 className="text-xl font-serif font-bold text-brand-orange">Admin Panel</h1>
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-stone-800 rounded"
                >
                    <Menu size={24} />
                </button>
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed md:static inset-y-0 left-0 z-40
                w-64 bg-stone-900 text-white flex flex-col
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="p-6 hidden md:block">
                    <h1 className="text-2xl font-serif font-bold text-brand-orange">Admin Panel</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2 mt-16 md:mt-0 overflow-y-auto">
                    <button
                        onClick={() => { setActiveTab('products'); setSidebarOpen(false); }}
                        className={`w-full text-left p-3 rounded transition-colors ${activeTab === 'products' ? 'bg-brand-red' : 'hover:bg-stone-800'}`}
                    >
                        Platillos ({products.length})
                    </button>
                    <button
                        onClick={() => { setActiveTab('categories'); setSidebarOpen(false); }}
                        className={`w-full text-left p-3 rounded transition-colors ${activeTab === 'categories' ? 'bg-brand-red' : 'hover:bg-stone-800'}`}
                    >
                        Categorías ({categories.length})
                    </button>
                    <button
                        onClick={() => { setActiveTab('hero'); setSidebarOpen(false); }}
                        className={`w-full text-left p-3 rounded transition-colors ${activeTab === 'hero' ? 'bg-brand-red' : 'hover:bg-stone-800'}`}
                    >
                        🖼️ Portada / Hero
                    </button>
                    <button
                        onClick={() => { setActiveTab('promos'); setSidebarOpen(false); }}
                        className={`w-full text-left p-3 rounded transition-colors ${activeTab === 'promos' ? 'bg-brand-red' : 'hover:bg-stone-800'}`}
                    >
                        Promociones ({promotions.length})
                    </button>
                    <button
                        onClick={() => { setActiveTab('weekly'); setSidebarOpen(false); }}
                        className={`w-full text-left p-3 rounded transition-colors ${activeTab === 'weekly' ? 'bg-brand-red' : 'hover:bg-stone-800'}`}
                    >
                        Paquetes Semanales ({weeklyPackages.length})
                    </button>
                </nav>
                <div className="p-4 border-t border-stone-800 space-y-2">
                    <button 
                        onClick={handleLogout}
                        className="w-full text-left text-red-400 hover:text-red-300 text-sm p-3 rounded hover:bg-stone-800 transition-colors"
                    >
                        🚪 Cerrar Sesión
                    </button>
                    <button className="w-full text-left text-stone-400 hover:text-white text-sm p-3 rounded hover:bg-stone-800 transition-colors" onClick={() => window.location.href = '/'}>
                        ← Volver al sitio
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 pt-20 md:pt-8">
                {activeTab === 'products' && (
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-stone-800">Gestión de Platillos</h2>
                            <button
                                onClick={() => setShowAddProduct(!showAddProduct)}
                                className="bg-brand-orange text-white px-4 py-2 rounded hover:bg-brand-red flex items-center gap-2"
                            >
                                <Plus size={20} />
                                Agregar Producto
                            </button>
                        </div>

                        {/* Add Product Form */}
                        {showAddProduct && (
                            <div className="bg-stone-50 p-6 rounded-lg mb-6 border-2 border-brand-orange">
                                <h3 className="font-bold text-lg mb-4">Nuevo Producto</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Nombre del producto *"
                                        className="p-3 border rounded"
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Precio *"
                                        className="p-3 border rounded"
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                    />
                                    <select
                                        className="p-3 border rounded"
                                        value={newProduct.category_id}
                                        onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload(e, false)}
                                        className="p-2 border rounded text-sm"
                                    />
                                </div>
                                <textarea
                                    placeholder="Descripción"
                                    className="w-full p-3 border rounded mb-4"
                                    rows={2}
                                    value={newProduct.description}
                                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                />
                                {newProduct.image_url && (
                                    <img src={newProduct.image_url} alt="Preview" className="w-32 h-32 object-cover rounded mb-4" />
                                )}
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddProduct}
                                        disabled={uploading}
                                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {uploading ? 'Subiendo...' : 'Guardar'}
                                    </button>
                                    <button
                                        onClick={() => setShowAddProduct(false)}
                                        className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Products List */}
                        <div className="mb-8">
                            <h3 className="font-semibold mb-4 text-lg">Platillos Existentes</h3>
                            {products.length === 0 ? (
                                <div className="text-center py-8 text-stone-500">
                                    No hay platillos registrados aún.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {products.map((product) => (
                                        <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                            {editingProduct?.id === product.id ? (
                                                // Edit Mode
                                                <div className="p-4 bg-yellow-50">
                                                    <input
                                                        type="text"
                                                        className="w-full p-2 border rounded mb-2"
                                                        value={editingProduct.name}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                                    />
                                                    <input
                                                        type="number"
                                                        className="w-full p-2 border rounded mb-2"
                                                        value={editingProduct.price}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                                                    />
                                                    <select
                                                        className="w-full p-2 border rounded mb-2"
                                                        value={editingProduct.category_id}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, category_id: e.target.value })}
                                                    >
                                                        {categories.map(cat => (
                                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                        ))}
                                                    </select>
                                                    <textarea
                                                        className="w-full p-2 border rounded mb-2"
                                                        rows={2}
                                                        value={editingProduct.description}
                                                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                                                    />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleImageUpload(e, true)}
                                                        className="w-full p-2 border rounded mb-2 text-sm"
                                                    />
                                                    {editingProduct.image_url && (
                                                        <img src={editingProduct.image_url} alt="Preview" className="w-full h-32 object-cover rounded mb-2" />
                                                    )}
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={handleUpdateProduct}
                                                            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 flex items-center justify-center gap-1"
                                                        >
                                                            <Save size={16} /> Guardar
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingProduct(null)}
                                                            className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 flex items-center justify-center gap-1"
                                                        >
                                                            <X size={16} /> Cancelar
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                // View Mode
                                                <>
                                                    <div className="relative h-32">
                                                        <img
                                                            src={product.image_url}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute top-2 right-2 bg-brand-orange text-white text-xs font-bold px-2 py-1 rounded">
                                                            ${product.price}
                                                        </div>
                                                    </div>
                                                    <div className="p-3">
                                                        <h4 className="font-bold text-sm mb-1">{product.name}</h4>
                                                        <p className="text-xs text-stone-500 mb-2">{getCategoryName(product.category_id)}</p>
                                                        <p className="text-xs text-stone-600 line-clamp-2 mb-3">{product.description}</p>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => setEditingProduct(product)}
                                                                className="flex-1 bg-blue-600 text-white py-1 rounded hover:bg-blue-700 flex items-center justify-center gap-1 text-sm"
                                                            >
                                                                <Edit size={14} /> Editar
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteProduct(product.id)}
                                                                className="flex-1 bg-red-600 text-white py-1 rounded hover:bg-red-700 flex items-center justify-center gap-1 text-sm"
                                                            >
                                                                <Trash2 size={14} /> Eliminar
                                                            </button>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'categories' && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-stone-800">Gestión de Categorías</h2>
                            <div className="text-sm text-stone-600">
                                Edita las imágenes principales de cada categoría del menú
                            </div>
                        </div>

                        {categories.length === 0 ? (
                            <div className="text-center py-8 text-stone-500">
                                No hay categorías registradas.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.map((category) => (
                                    <div key={category.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                        {editingCategory?.id === category.id ? (
                                            // Edit Mode
                                            <div className="p-4 bg-blue-50">
                                                <div className="mb-4">
                                                    <img 
                                                        src={editingCategory.image_url} 
                                                        alt={editingCategory.name} 
                                                        className="w-full h-40 object-cover rounded mb-2"
                                                    />
                                                    <input
                                                        type="text"
                                                        className="w-full p-2 border rounded mb-2"
                                                        value={editingCategory.name}
                                                        onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                                        placeholder="Nombre de la categoría"
                                                    />
                                                    <div className="mb-2">
                                                        <label className="block text-sm font-semibold mb-1 text-stone-700">
                                                            � URL de Imagen
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="w-full p-2 border rounded mb-2"
                                                            value={editingCategory.image_url}
                                                            onChange={(e) => setEditingCategory({ ...editingCategory, image_url: e.target.value })}
                                                            placeholder="/images/categories/tacos.jpg"
                                                        />
                                                        <div className="text-xs text-stone-500 bg-stone-100 p-2 rounded mb-3">
                                                            💡 Opciones:
                                                            <br />• Imagen local: /images/categories/nombre.jpg
                                                            <br />• URL externa: https://...
                                                            <br />• LoremFlickr: https://loremflickr.com/800/600/tacos
                                                        </div>
                                                        
                                                        <label className="block text-sm font-semibold mb-1 text-stone-700">
                                                            📁 O Subir desde PC
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleCategoryImageUpload}
                                                            disabled={uploading}
                                                            className="w-full p-2 border rounded text-sm disabled:opacity-50"
                                                        />
                                                        {uploading && (
                                                            <p className="text-xs text-blue-600 mt-1">📤 Subiendo imagen...</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleUpdateCategory}
                                                        className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
                                                    >
                                                        💾 Guardar
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingCategory(null)}
                                                        className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 font-semibold"
                                                    >
                                                        ✖ Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // View Mode
                                            <>
                                                <img 
                                                    src={category.image_url} 
                                                    alt={category.name} 
                                                    className="w-full h-40 object-cover"
                                                />
                                                <div className="p-4">
                                                    <h3 className="font-bold text-lg mb-2 text-stone-800">{category.name}</h3>
                                                    <div className="text-sm text-stone-500 mb-3">
                                                        {products.filter(p => p.category_id === category.id).length} platillos
                                                    </div>
                                                    <button
                                                        onClick={() => setEditingCategory(category)}
                                                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold flex items-center justify-center gap-2"
                                                    >
                                                        <Edit size={16} />
                                                        Editar Imagen
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'promos' && (
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-stone-800">Banners y Promociones</h2>
                            <button
                                onClick={() => setShowAddPromotion(!showAddPromotion)}
                                className="bg-brand-orange text-white px-4 py-2 rounded hover:bg-brand-red flex items-center gap-2"
                            >
                                <Plus size={20} />
                                Agregar Promoción
                            </button>
                        </div>

                        {/* Add Promotion Form */}
                        {showAddPromotion && (
                            <div className="bg-orange-50 p-4 md:p-6 rounded-lg mb-6 border-2 border-brand-orange">
                                <h3 className="font-bold text-lg mb-4">Nueva Promoción</h3>
                                <div className="mb-4">
                                    {newPromotion.image_url && (
                                        <img 
                                            src={newPromotion.image_url} 
                                            alt="Vista previa" 
                                            className="w-full h-48 object-cover rounded mb-3"
                                        />
                                    )}
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded mb-2"
                                        value={newPromotion.title}
                                        onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })}
                                        placeholder="Título de la promoción *"
                                    />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                                        <div>
                                            <label className="block text-xs font-semibold mb-1 text-stone-700">Fecha Inicio *</label>
                                            <input
                                                type="date"
                                                className="w-full p-2 border rounded"
                                                value={newPromotion.start_date}
                                                onChange={(e) => setNewPromotion({ ...newPromotion, start_date: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold mb-1 text-stone-700">Fecha Fin *</label>
                                            <input
                                                type="date"
                                                className="w-full p-2 border rounded"
                                                value={newPromotion.end_date}
                                                onChange={(e) => setNewPromotion({ ...newPromotion, end_date: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <label className="block text-sm font-semibold mb-1 text-stone-700">
                                            URL de Imagen
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded mb-2"
                                            value={newPromotion.image_url}
                                            onChange={(e) => setNewPromotion({ ...newPromotion, image_url: e.target.value })}
                                            placeholder="/images/promociones/promo.jpg"
                                        />
                                        
                                        <label className="block text-sm font-semibold mb-1 text-stone-700 mt-2">
                                            📁 O Subir desde PC
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleNewPromotionImageUpload}
                                            disabled={uploading}
                                            className="w-full p-2 border rounded text-sm disabled:opacity-50"
                                        />
                                        {uploading && (
                                            <p className="text-xs text-blue-600 mt-1">📤 Subiendo imagen...</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddPromotion}
                                        disabled={uploading}
                                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {uploading ? 'Subiendo...' : 'Guardar'}
                                    </button>
                                    <button
                                        onClick={() => setShowAddPromotion(false)}
                                        className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}

                        {promotions.length === 0 ? (
                            <div className="text-center py-8 text-stone-500">
                                No hay promociones activas. Agrega una nueva.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {promotions.map((promo) => (
                                    <div key={promo.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                        {editingPromotion?.id === promo.id ? (
                                            // Edit Mode
                                            <div className="p-4 bg-blue-50">
                                                <div className="mb-4">
                                                    <img 
                                                        src={editingPromotion.image_url} 
                                                        alt={editingPromotion.title} 
                                                        className="w-full h-48 object-cover rounded mb-3"
                                                    />
                                                    <input
                                                        type="text"
                                                        className="w-full p-2 border rounded mb-2"
                                                        value={editingPromotion.title}
                                                        onChange={(e) => setEditingPromotion({ ...editingPromotion, title: e.target.value })}
                                                        placeholder="Título de la promoción"
                                                    />
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                                                        <div>
                                                            <label className="block text-xs font-semibold mb-1 text-stone-700">Fecha Inicio</label>
                                                            <input
                                                                type="date"
                                                                className="w-full p-2 border rounded"
                                                                value={editingPromotion.start_date}
                                                                onChange={(e) => setEditingPromotion({ ...editingPromotion, start_date: e.target.value })}
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-semibold mb-1 text-stone-700">Fecha Fin</label>
                                                            <input
                                                                type="date"
                                                                className="w-full p-2 border rounded"
                                                                value={editingPromotion.end_date}
                                                                onChange={(e) => setEditingPromotion({ ...editingPromotion, end_date: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="mb-2">
                                                        <label className="block text-sm font-semibold mb-1 text-stone-700">
                                                            URL de Imagen
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="w-full p-2 border rounded mb-2"
                                                            value={editingPromotion.image_url}
                                                            onChange={(e) => setEditingPromotion({ ...editingPromotion, image_url: e.target.value })}
                                                            placeholder="/images/promociones/promo.jpg"
                                                        />
                                                        
                                                        <label className="block text-sm font-semibold mb-1 text-stone-700 mt-2">
                                                            📁 O Subir desde PC
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handlePromotionImageUpload}
                                                            disabled={uploading}
                                                            className="w-full p-2 border rounded text-sm disabled:opacity-50"
                                                        />
                                                        {uploading && (
                                                            <p className="text-xs text-blue-600 mt-1">📤 Subiendo imagen...</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleUpdatePromotion}
                                                        className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
                                                    >
                                                        💾 Guardar
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingPromotion(null)}
                                                        className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 font-semibold"
                                                    >
                                                        ✖ Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // View Mode
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-stone-50 gap-4">
                                                <div className="flex items-center gap-4 flex-1">
                                                    <img src={promo.image_url} alt={promo.title} className="w-24 h-16 object-cover rounded flex-shrink-0" />
                                                    <div>
                                                        <h4 className="font-bold text-base">{promo.title}</h4>
                                                        <p className="text-sm text-stone-500">
                                                            {new Date(promo.start_date).toLocaleDateString()} - {new Date(promo.end_date).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setEditingPromotion(promo)}
                                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                                                    >
                                                        <Edit size={16} /> Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePromotion(promo.id)}
                                                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2"
                                                    >
                                                        <Trash2 size={16} /> Eliminar
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'weekly' && (
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-4 md:mb-6">
                            <h2 className="text-xl md:text-2xl font-bold text-stone-800">Paquetes Semanales</h2>
                            <button
                                onClick={() => setShowAddPackage(!showAddPackage)}
                                className="bg-brand-orange text-white px-4 py-2 rounded hover:bg-brand-red flex items-center gap-2"
                            >
                                <Plus size={20} />
                                Agregar Paquete
                            </button>
                        </div>

                        {/* Add Package Form */}
                        {showAddPackage && (
                            <div className="bg-orange-50 p-4 md:p-6 rounded-lg mb-6 border-2 border-brand-orange">
                                <h3 className="font-bold text-lg mb-4">Nuevo Paquete Semanal</h3>
                                <div className="mb-4">
                                    {newPackage.image_url && (
                                        <img 
                                            src={newPackage.image_url} 
                                            alt="Vista previa" 
                                            className="w-full h-40 object-cover rounded mb-3"
                                        />
                                    )}
                                    <select
                                        className="w-full p-2 border rounded mb-2"
                                        value={newPackage.day_of_week}
                                        onChange={(e) => setNewPackage({ ...newPackage, day_of_week: e.target.value })}
                                    >
                                        <option value="Lunes">Lunes</option>
                                        <option value="Martes">Martes</option>
                                        <option value="Miércoles">Miércoles</option>
                                        <option value="Jueves">Jueves</option>
                                        <option value="Viernes">Viernes</option>
                                        <option value="Sábado">Sábado</option>
                                        <option value="Domingo">Domingo</option>
                                    </select>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded mb-2"
                                        value={newPackage.name}
                                        onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                                        placeholder="Nombre del paquete *"
                                    />
                                    <textarea
                                        className="w-full p-2 border rounded mb-2"
                                        rows={2}
                                        value={newPackage.description}
                                        onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
                                        placeholder="Descripción *"
                                    />
                                    <input
                                        type="number"
                                        className="w-full p-2 border rounded mb-2"
                                        value={newPackage.price}
                                        onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                                        placeholder="Precio (0 para promoción gratuita)"
                                    />

                                    <div className="border-t pt-3 mt-3">
                                        <label className="block text-sm font-semibold mb-1 text-stone-700">
                                            URL de Imagen
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full p-2 border rounded mb-2"
                                            value={newPackage.image_url}
                                            onChange={(e) => setNewPackage({ ...newPackage, image_url: e.target.value })}
                                            placeholder="/images/paquetes/paquete.jpg"
                                        />
                                        
                                        <label className="block text-sm font-semibold mb-1 text-stone-700 mt-2">
                                            📁 O Subir desde PC
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleNewPackageImageUpload}
                                            disabled={uploading}
                                            className="w-full p-2 border rounded text-sm disabled:opacity-50"
                                        />
                                        {uploading && (
                                            <p className="text-xs text-blue-600 mt-1">📤 Subiendo imagen...</p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleAddPackage}
                                        disabled={uploading}
                                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                                    >
                                        {uploading ? 'Subiendo...' : 'Guardar'}
                                    </button>
                                    <button
                                        onClick={() => setShowAddPackage(false)}
                                        className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        )}

                        {weeklyPackages.length === 0 ? (
                            <div className="text-center py-8 text-stone-500">
                                No hay paquetes semanales configurados. Agrega uno nuevo.
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                {weeklyPackages.map(pkg => (
                                    <div key={pkg.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                                        {editingPackage?.id === pkg.id ? (
                                            // Edit Mode
                                            <div className="p-4 bg-yellow-50">
                                                <div className="mb-4">
                                                    {editingPackage.image_url && (
                                                        <img 
                                                            src={editingPackage.image_url} 
                                                            alt={editingPackage.name} 
                                                            className="w-full h-40 object-cover rounded mb-3"
                                                        />
                                                    )}
                                                    <label className="block text-sm font-semibold mb-1 text-stone-700">{pkg.day_of_week}</label>
                                                    <input
                                                        type="text"
                                                        className="w-full p-2 border rounded mb-2"
                                                        value={editingPackage.name}
                                                        onChange={(e) => setEditingPackage({ ...editingPackage, name: e.target.value })}
                                                        placeholder="Nombre del paquete"
                                                    />
                                                    <textarea
                                                        className="w-full p-2 border rounded mb-2"
                                                        rows={2}
                                                        value={editingPackage.description}
                                                        onChange={(e) => setEditingPackage({ ...editingPackage, description: e.target.value })}
                                                        placeholder="Descripción"
                                                    />
                                                    <input
                                                        type="number"
                                                        className="w-full p-2 border rounded mb-2"
                                                        value={editingPackage.price}
                                                        onChange={(e) => setEditingPackage({ ...editingPackage, price: parseFloat(e.target.value) })}
                                                        placeholder="Precio"
                                                    />

                                                    <div className="border-t pt-3 mt-3">
                                                        <label className="block text-sm font-semibold mb-1 text-stone-700">
                                                            URL de Imagen
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="w-full p-2 border rounded mb-2"
                                                            value={editingPackage.image_url || ''}
                                                            onChange={(e) => setEditingPackage({ ...editingPackage, image_url: e.target.value })}
                                                            placeholder="/images/paquetes/lunes.jpg"
                                                        />
                                                        
                                                        <label className="block text-sm font-semibold mb-1 text-stone-700 mt-2">
                                                            📁 O Subir desde PC
                                                        </label>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handlePackageImageUpload}
                                                            disabled={uploading}
                                                            className="w-full p-2 border rounded text-sm disabled:opacity-50"
                                                        />
                                                        {uploading && (
                                                            <p className="text-xs text-blue-600 mt-1">📤 Subiendo imagen...</p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={handleUpdatePackage}
                                                        className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 font-semibold"
                                                    >
                                                        💾 Guardar
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingPackage(null)}
                                                        className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 font-semibold"
                                                    >
                                                        ✖ Cancelar
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // View Mode
                                            <div className="p-4">
                                                {pkg.image_url && (
                                                    <img 
                                                        src={pkg.image_url} 
                                                        alt={pkg.name} 
                                                        className="w-full h-32 object-cover rounded mb-3"
                                                    />
                                                )}
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className="font-bold text-lg">{pkg.day_of_week}</h4>
                                                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Activo</span>
                                                </div>
                                                <h5 className="font-semibold text-brand-orange mb-1">{pkg.name}</h5>
                                                <p className="text-sm text-stone-500 mb-2 line-clamp-2">{pkg.description}</p>
                                                <div className="flex justify-between items-center gap-2">
                                                    <div className="text-brand-orange font-bold text-xl">
                                                        {pkg.price === 0 ? 'Promoción' : `$${pkg.price}`}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => setEditingPackage(pkg)}
                                                            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 flex items-center gap-1 text-sm"
                                                        >
                                                            <Edit size={14} /> Editar
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeletePackage(pkg.id)}
                                                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 flex items-center gap-1 text-sm"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'hero' && (
                    <div className="bg-white p-4 md:p-6 rounded-lg shadow max-w-4xl mx-auto">
                        <h2 className="text-xl md:text-2xl font-bold mb-2 text-stone-800">Imagen de Portada</h2>
                        <p className="text-sm md:text-base text-stone-600 mb-4 md:mb-6">Esta es la imagen principal que se muestra en la página de inicio</p>
                        
                        {/* Vista previa de la imagen actual */}
                        <div className="mb-4 md:mb-6">
                            <h3 className="font-semibold mb-2 md:mb-3 text-base md:text-lg">Vista Previa Actual</h3>
                            <div className="relative w-full h-48 md:h-64 lg:h-96 rounded-lg overflow-hidden border-2 md:border-4 border-stone-200">
                                <img 
                                    src={heroImageUrl} 
                                    alt="Portada del sitio" 
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://loremflickr.com/1920/1080/mexican,restaurant/all';
                                    }}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 md:p-4">
                                    <p className="text-white text-xs md:text-sm font-mono truncate">{heroImageUrl}</p>
                                </div>
                            </div>
                        </div>

                        {/* Formulario de actualización */}
                        <div className="bg-blue-50 p-4 md:p-6 rounded-lg space-y-4">
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-stone-700">
                                    📋 URL de Imagen
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 md:p-3 border rounded text-sm md:text-base"
                                    value={heroImageUrl}
                                    onChange={(e) => setHeroImageUrl(e.target.value)}
                                    placeholder="https://... o /images/hero-bg.jpg"
                                />
                                <div className="text-xs text-stone-500 mt-2 bg-white p-2 md:p-3 rounded">
                                    💡 <strong>Opciones:</strong>
                                    <br />• Imagen local: <code className="bg-stone-100 px-1">/images/hero-bg.jpg</code>
                                    <br />• URL externa: <code className="bg-stone-100 px-1">https://ejemplo.com/imagen.jpg</code>
                                    <br />• Para mejor calidad, usa imágenes de al menos <strong>1920x1080px</strong>
                                </div>
                            </div>

                            <div className="border-t pt-4">
                                <label className="block text-sm font-semibold mb-2 text-stone-700">
                                    📁 O Subir desde tu PC
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleHeroImageUpload}
                                    disabled={uploading}
                                    className="w-full p-2 md:p-3 border rounded text-sm disabled:opacity-50 bg-white"
                                />
                                {uploading && (
                                    <p className="text-sm text-blue-600 mt-2 animate-pulse">📤 Subiendo imagen...</p>
                                )}
                                <p className="text-xs text-stone-500 mt-2">
                                    Formatos aceptados: JPG, PNG, WebP. Tamaño recomendado: 1920x1080px
                                </p>
                            </div>

                            <div className="pt-4 border-t">
                                <button
                                    onClick={handleUpdateHeroImage}
                                    disabled={uploading}
                                    className="w-full bg-green-600 text-white py-2 md:py-3 rounded-lg hover:bg-green-700 font-semibold text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    💾 Guardar Cambios
                                </button>
                                <p className="text-xs text-stone-500 mt-2 text-center">
                                    Los cambios se verán reflejados al recargar la página principal
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
