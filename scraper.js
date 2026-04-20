const { chromium } = require('playwright');
const fs = require('fs');

async function scrapeInstagram(perfil) {
  // Ponemos headless: false para ver si Instagram nos bloquea o pide algo
  const browser = await chromium.launch({ headless: false }); 
  const context = await browser.newContext({ storageState: 'state.json' });
  const page = await context.newPage();

  try {
    console.log(`Navegando al perfil de: ${perfil}...`);
    // Añadimos un tiempo de espera para que la página cargue bien
    await page.goto(`https://www.instagram.com/${perfil}/`, { waitUntil: 'networkidle' });

    console.log("Esperando a que carguen las publicaciones...");
    // Esperamos específicamente por las imágenes de los posts
    await page.waitForSelector('img', { timeout: 10000 });

    const data = await page.evaluate(() => {
      // Instagram a veces cambia las clases, buscamos todas las imágenes dentro de los links de posts
      const posts = Array.from(document.querySelectorAll('article img')).slice(0, 10);
      return posts.map((img, index) => ({
        post_nro: index + 1,
        descripcion: img.getAttribute('alt') || "Sin descripción",
        link_foto: img.getAttribute('src')
      }));
    });

    if (data.length === 0) {
        console.log("No se encontraron imágenes. ¿El perfil es privado?");
    } else {
        fs.writeFileSync('datos_instagram.json', JSON.stringify(data, null, 2));
        console.log("¡Éxito! Datos guardados en 'datos_instagram.json'");
        console.table(data);
    }

  } catch (err) {
    console.error("Error durante el scraping:", err.message);
  } finally {
    // Cerramos después de 5 segundos para que alcances a ver qué pasó
    setTimeout(async () => {
        await browser.close();
    }, 5000);
  }
}

// Prueba con un perfil público garantizado (como la cuenta de la UCE o National Geographic)
scrapeInstagram('natgeo');