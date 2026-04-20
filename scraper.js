const { chromium } = require('playwright');
const fs = require('fs');

async function scrapeInstagram(perfil) {
  const browser = await chromium.launch({ headless: false }); 
  const context = await browser.newContext({ storageState: 'state.json' });
  const page = await context.newPage();

  try {
    console.log(`Navegando al perfil de: ${perfil}...`);
    
    // Cambiamos 'networkidle' por 'domcontentloaded' (es mucho más rápido)
    await page.goto(`https://www.instagram.com/${perfil}/`, { 
        waitUntil: 'domcontentloaded',
        timeout: 60000 
    });

    console.log("Esperando a que aparezcan las fotos...");
    
    // Esperamos a que aparezca cualquier imagen dentro de un artículo
    // Le damos 15 segundos para encontrar al menos una
    await page.waitForSelector('article img', { timeout: 15000 });

    const data = await page.evaluate(() => {
      const posts = Array.from(document.querySelectorAll('article img')).slice(0, 10);
      return posts.map((img, index) => ({
        post_nro: index + 1,
        descripcion: img.getAttribute('alt') || "Sin descripción",
        link_foto: img.getAttribute('src')
      }));
    });

    if (data.length > 0) {
        fs.writeFileSync('datos_instagram.json', JSON.stringify(data, null, 2));
        console.log("¡Éxito! Se generó 'datos_instagram.json'");
        console.table(data);
    } else {
        console.log("Se cargó la página pero no se encontraron posts.");
    }

  } catch (err) {
    console.error("Error durante el scraping:", err.message);
    // Si falla por timeout, igual intentamos sacar lo que haya cargado
    console.log("Intentando rescatar datos de lo que cargó...");
  } finally {
    setTimeout(async () => {
        await browser.close();
    }, 3000);
  }
}

scrapeInstagram('natgeo');