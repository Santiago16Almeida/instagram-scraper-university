const { chromium } = require('playwright');
const fs = require('fs');

async function scrapeInstagram(perfil) {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ storageState: 'state.json' });
  const page = await context.newPage();

  try {
    if (!perfil) {
      console.log(" Error: Falta el nombre de usuario.");
      await browser.close();
      return;
    }

    console.log(`\n Navegando al perfil de: ${perfil}...`);

    // CAMBIO: Usamos 'domcontentloaded' que es más rápido y menos propenso a errores de timeout
    await page.goto(`https://www.instagram.com/${perfil}/`, {
      waitUntil: 'domcontentloaded',
      timeout: 60000 // Aumentamos a 60 segundos por si el internet está lento
    });

    console.log(" Esperando que aparezcan los elementos...");
    // Esperamos a que al menos un post o la cabecera sea visible
    await page.waitForSelector('header', { timeout: 10000 }).catch(() => console.log("Aviso: La cabecera tardó mucho, intentando seguir..."));

    await page.waitForTimeout(5000);

    // Scroll suave
    await page.mouse.wheel(0, 600);
    await page.waitForTimeout(3000);

    const data = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('header a, header span, header li'));

      const findStat = (textos) => {
        const found = links.find(el => {
          const content = el.innerText.toLowerCase();
          return textos.some(t => content.includes(t));
        });
        return found ? found.innerText.split('\n')[0].split(' ')[0] : "N/A";
      };

      const estadisticas = {
        publicaciones: findStat(['publicaciones', 'posts']),
        seguidores: findStat(['seguidores', 'followers']),
        seguidos: findStat(['seguidos', 'following'])
      };

      const images = Array.from(document.querySelectorAll('img'));
      const postsFiltrados = images.filter(img => {
        const src = img.src || '';
        return (src.includes('fbcdn.net') || src.includes('instagram')) && img.width > 150;
      }).slice(0, 10);

      const listaPosts = postsFiltrados.map((img, index) => ({
        post_nro: index + 1,
        descripcion: img.alt || "Sin descripción disponible",
        link_foto: img.src
      }));

      return { infoPerfil: estadisticas, posts: listaPosts };
    });

    if (data.posts.length > 0) {
      fs.writeFileSync('datos_instagram.json', JSON.stringify(data, null, 2));
      console.log("\n DATOS GUARDADOS CORRECTAMENTE");
      console.log(` Perfil: ${perfil}`);
      console.log(` Stats: ${data.infoPerfil.publicaciones} | ${data.infoPerfil.seguidores} | ${data.infoPerfil.seguidos}`);
    } else {
      console.log(" No se encontraron fotos. Verifica que tu cuenta en 'state.json' siga activa.");
    }

  } catch (err) {
    console.error(" Error de navegación:", err.message);
  } finally {
    setTimeout(async () => {
      await browser.close();
      console.log(" Proceso terminado.");
    }, 2000);
  }
}

const cuentaAInvestigar = process.argv[2];
scrapeInstagram(cuentaAInvestigar);