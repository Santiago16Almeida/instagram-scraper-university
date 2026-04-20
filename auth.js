const { chromium } = require('playwright');

async function saveSession() {
  // Lanzamos el navegador
  const browser = await chromium.launch({ headless: false }); 
  
  // CORRECCIÓN: Es newContext() (CamelCase), no new_context
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.instagram.com/accounts/login/');
  
  console.log("POR FAVOR, INICIA SESIÓN MANUALMENTE...");
  
  // Esperamos a que entres al feed para confirmar el login
  await page.waitForURL('https://www.instagram.com/', { timeout: 0 });
  
  // Guardamos el estado
  await context.storageState({ path: 'state.json' });
  
  console.log("Sesión guardada con éxito en state.json");
  await browser.close();
}

saveSession().catch(err => console.error("Error detallado:", err));