import { supabase } from './lib/supabase';

// Script de debug - Pega esto en la consola del navegador (F12)
async function debugSupabase() {
    console.log('🔍 VERIFICANDO CONEXIÓN A SUPABASE...\n');

    // Test 1: Verificar configuración
    console.log('📋 Configuración:');
    console.log('URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Key:', import.meta.env.VITE_SUPABASE_ANON_KEY?.substring(0, 20) + '...');

    // Test 2: Verificar categorías
    console.log('\n📁 Probando categorías...');
    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('*');

    if (catError) {
        console.error('❌ ERROR en categorías:', catError);
    } else {
        console.log(`✅ ${categories?.length || 0} categorías encontradas`);
        console.table(categories);
    }

    // Test 3: Verificar productos
    console.log('\n🍔 Probando productos...');
    const { data: products, error: prodError } = await supabase
        .from('products')
        .select('*');

    if (prodError) {
        console.error('❌ ERROR en productos:', prodError);
    } else {
        console.log(`✅ ${products?.length || 0} productos encontrados`);
        console.table(products);
    }

    // Test 4: Verificar promociones
    console.log('\n🎉 Probando promociones...');
    const { data: promos, error: promoError } = await supabase
        .from('promotions')
        .select('*');

    if (promoError) {
        console.error('❌ ERROR en promociones:', promoError);
    } else {
        console.log(`✅ ${promos?.length || 0} promociones encontradas`);
        console.table(promos);
    }

    // Test 5: Verificar paquetes semanales
    console.log('\n📦 Probando paquetes semanales...');
    const { data: packages, error: pkgError } = await supabase
        .from('weekly_packages')
        .select('*');

    if (pkgError) {
        console.error('❌ ERROR en paquetes:', pkgError);
    } else {
        console.log(`✅ ${packages?.length || 0} paquetes encontrados`);
        console.table(packages);
    }

    console.log('\n✅ DEBUG COMPLETADO');
}

// Ejecutar automáticamente
debugSupabase();
