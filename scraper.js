const { chromium } = require('playwright');
const fs = require('fs');

async function scrapeInstagram(perfil) {
  const browser = await chromium.launch({ headless: false }); 
  const context = await browser.newContext({ storageState: 'state.json' });
  const page = await context.newPage();

  try {
    console.log(`Navegando al perfil de: ${perfil}...`);
    await page.goto(`https://www.instagram.com/${perfil}/`, { waitUntil: 'domcontentloaded' });

    console.log("Esperando 5 segundos para que cargue el contenido dinámico...");
    await page.waitForTimeout(5000); // Espera manual de seguridad

    // Bajamos un poquito el scroll para forzar la carga de imágenes
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(2000);

    const data = await page.evaluate(() => {
      // Buscamos todas las imágenes. Filtramos las que son muy pequeñas (iconos)
      const imgs = Array.from(document.querySelectorAll('img'));
      
      // Filtramos imágenes que probablemente son posts (suelen tener alt o dimensiones grandes)
      const posts = imgs.filter(img => {
        const src = img.getAttribute('src') || '';
        return src.includes('scontent') && !src.includes('150x150'); // Filtra miniaturas de perfil
      }).slice(0, 10);

      return posts.map((img, index) => ({
        post_nro: index + 1,
        descripcion: img.getAttribute('alt') || "Publicación de Instagram",
        link_foto: img.getAttribute('src')
      }));
    });

    if (data.length > 0) {
        fs.writeFileSync('datos_instagram.json', JSON.stringify(data, null, 2));
        console.log("¡POR FIN! Se generó 'datos_instagram.json'");
        console.table(data);
    } else {
        console.log("No se detectaron fotos de posts. Intenta refrescar tu state.json");
    }

  } catch (err) {
    console.error("Error:", err.message);
  } finally {
    setTimeout(async () => { await browser.close(); }, 3000);
  }
}

scrapeInstagram('natgeo');