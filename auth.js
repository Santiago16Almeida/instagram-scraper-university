const { chromium } = require('playwright');

async function saveSession() {
  const browser = await chromium.launch({ headless: false }); // Visible para que puedas loguearte
  const context = await browser.new_context();
  const page = await context.newPage();

  await page.goto('https://www.instagram.com/accounts/login/');
  
  console.log("INICIA SESIÓN MANUALLY EN EL NAVEGADOR...");
  
  // Esperamos hasta que el navegador detecte que entraste al feed principal
  await page.waitForURL('https://www.instagram.com/', { timeout: 0 });
  
  // Guardamos las cookies y el almacenamiento local
  await context.storageState({ path: 'state.json' });
  
  console.log("Sesión guardada en state.json");
  await browser.close();
}

saveSession();