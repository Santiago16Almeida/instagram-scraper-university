const fs = require('fs');

function generarHTML() {
    try {
        // 1. Leer los datos que descargó el scraper
        const rawData = fs.readFileSync('datos_instagram.json');
        const posts = JSON.parse(rawData);

        // 2. Crear la estructura del HTML
        let htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Reporte de Scraping - Instagram</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fafafa; margin: 0; padding: 20px; }
                h1 { color: #262626; text-align: center; }
                .container { display: flex; flex-wrap: wrap; justify-content: center; gap: 20px; }
                .card { background: white; border: 1px solid #dbdbdb; border-radius: 8px; width: 300px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
                .card img { width: 100%; height: 300px; object-fit: cover; }
                .card-content { padding: 15px; }
                .post-number { font-weight: bold; color: #0095f6; margin-bottom: 10px; display: block; }
                .description { font-size: 14px; color: #4b4b4b; line-height: 1.4; height: 80px; overflow: hidden; text-overflow: ellipsis; }
                .footer { text-align: center; margin-top: 40px; font-size: 12px; color: #8e8e8e; }
            </style>
        </head>
        <body>
            <h1>Reporte de Publicaciones Extraídas</h1>
            <div class="container">
        `;

        // 3. Generar una "tarjeta" por cada foto
        posts.forEach(post => {
            htmlContent += `
                <div class="card">
                    <img src="${post.link_foto}" alt="Post">
                    <div class="card-content">
                        <span class="post-number">Publicación #${post.post_nro}</span>
                        <p class="description">${post.descripcion}</p>
                    </div>
                </div>
            `;
        });

        htmlContent += `
            </div>
            <div class="footer">
                <p>Reporte generado automáticamente para el proyecto de Programación Distribuida</p>
                <p>Universidad Central del Ecuador</p>
            </div>
        </body>
        </html>
        `;

        // 4. Guardar el archivo HTML
        fs.writeFileSync('reporte_final.html', htmlContent);
        console.log("¡Reporte visual generado con éxito! Abre 'reporte_final.html' en tu navegador.");

    } catch (error) {
        console.error("Error al generar el reporte:", error.message);
    }
}

generarHTML();