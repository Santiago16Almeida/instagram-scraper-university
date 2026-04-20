const { chromium } = require('playwright');

async function saveSession() {
  const browser = await chromium.launch({ headless: false }); 
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.instagram.com/accounts/login/');
  
  console.log("INICIA SESIÓN Y QUITA TODOS LOS CARTELES (Notificaciones, Cookies, etc.)");
  
  // Esperamos a que llegues al feed
  await page.waitForURL('https://www.instagram.com/', { timeout: 0 });
  
  // ESPERA DE SEGURIDAD: Te doy 10 segundos para que hagas clic en "Ahora no"
  console.log("Esperando 10 segundos para que limpies la pantalla antes de guardar...");
  await page.waitForTimeout(10000); 
  
  await context.storageState({ path: 'state.json' });
  
  console.log("Sesión guardada con éxito. Ahora sí puedes cerrar.");
  await browser.close();
}

saveSession();