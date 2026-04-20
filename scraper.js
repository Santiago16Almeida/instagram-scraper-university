const { chromium } = require('playwright');

async function scrapeInstagram(perfil) {
  // Cargamos el navegador usando el estado guardado
  const browser = await chromium.launch({ headless: true }); 
  const context = await browser.new_context({ storageState: 'state.json' });
  const page = await context.newPage();

  console.log(`Navegando al perfil de: ${perfil}...`);
  await page.goto(`https://www.instagram.com/${perfil}/`);

  // Esperamos a que las imágenes de los posts carguen
  await page.waitForSelector('article img');

  // Extraemos los datos
  const data = await page.evaluate(() => {
    const posts = Array.from(document.querySelectorAll('article img')).slice(0, 10);
    return posts.map((img, index) => ({
      id: index + 1,
      descripcion: img.getAttribute('alt') || "Sin descripción",
      url_imagen: img.getAttribute('src')
    }));
  });

  console.log("--- RESULTADOS EXTRAÍDOS ---");
  console.table(data);

  await browser.close();
}

// Cambia 'cristiano' por cualquier cuenta pública para probar
scrapeInstagram('cristiano');