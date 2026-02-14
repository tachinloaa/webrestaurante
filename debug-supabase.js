// Script de debug para verificar la conexión a Supabase
// Ejecuta esto en la consola del navegador para verificar los datos

import { supabase } from './src/lib/supabase';

async function debugSupabase() {
    console.log('🔍 Verificando conexión a Supabase...');

    // Test 1: Verificar categorías
    console.log('\n📁 Categorías:');
    const { data: categories, error: catError } = await supabase
        .from('categories')
        .select('*');

    if (catError) {
        console.error('❌ Error obteniendo categorías:', catError);
    } else {
        console.log(`✅ ${categories?.length || 0} categorías encontradas`);
        console.table(categories);
    }

    // Test 2: Verificar productos
    console.log('\n🍔 Productos:');
    const { data: products, error: prodError } = await supabase
        .from('products')
        .select('*');

    if (prodError) {
        console.error('❌ Error obteniendo productos:', prodError);
    } else {
        console.log(`✅ ${products?.length || 0} productos encontrados`);
        console.table(products);
    }

    // Test 3: Verificar promociones
    console.log('\n🎉 Promociones:');
    const { data: promos, error: promoError } = await supabase
        .from('promotions')
        .select('*');

    if (promoError) {
        console.error('❌ Error obteniendo promociones:', promoError);
    } else {
        console.log(`✅ ${promos?.length || 0} promociones encontradas`);
        console.table(promos);
    }

    // Test 4: Verificar paquetes semanales
    console.log('\n📦 Paquetes Semanales:');
    const { data: packages, error: pkgError } = await supabase
        .from('weekly_packages')
        .select('*');

    if (pkgError) {
        console.error('❌ Error obteniendo paquetes:', pkgError);
    } else {
        console.log(`✅ ${packages?.length || 0} paquetes encontrados`);
        console.table(packages);
    }

    // Verificar relación entre productos y categorías
    console.log('\n🔗 Verificando relaciones:');
    if (products && categories) {
        products.forEach(prod => {
            const cat = categories.find(c => c.id === prod.category_id);
            if (!cat) {
                console.warn(`⚠️ Producto "${prod.name}" tiene category_id inválido: ${prod.category_id}`);
            }
        });
    }
}

// Ejecutar debug
debugSupabase();
