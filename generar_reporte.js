const fs = require('fs');

function generarHTML() {
    try {
        // 1. Leer el JSON completo
        const rawData = fs.readFileSync('datos_instagram.json');
        const data = JSON.parse(rawData);

        // Extraemos las partes del objeto
        const info = data.infoPerfil;
        const posts = data.posts;

        // 2. Crear la estructura del HTML con la cabecera de estadísticas
        let htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Reporte: ${info.publicaciones || 'Perfil'}</title>
            <style>
                body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background-color: #fafafa; margin: 0; padding: 20px; color: #262626; }
                .header-perfil { max-width: 935px; margin: 0 auto 40px auto; padding: 20px; display: flex; flex-direction: column; align-items: center; border-bottom: 1px solid #dbdbdb; }
                .stats-container { display: flex; gap: 40px; margin-top: 20px; }
                .stat-item { text-align: center; }
                .stat-value { font-weight: bold; font-size: 18px; display: block; }
                .stat-label { color: #8e8e8e; font-size: 14px; }
                
                h1 { margin: 0; font-size: 28px; font-weight: 300; }
                .container { display: flex; flex-wrap: wrap; justify-content: center; gap: 28px; max-width: 1000px; margin: 0 auto; }
                .card { background: white; border: 1px solid #dbdbdb; width: 300px; overflow: hidden; }
                .card img { width: 100%; height: 300px; object-fit: cover; transition: transform 0.3s; }
                .card img:hover { transform: scale(1.02); }
                .card-content { padding: 12px; border-top: 1px solid #efefef; }
                .description { font-size: 14px; line-height: 1.5; color: #262626; height: 60px; overflow: hidden; }
                .footer { text-align: center; margin-top: 50px; font-size: 13px; color: #8e8e8e; border-top: 1px solid #dbdbdb; padding-top: 20px; }
            </style>
        </head>
        <body>
            <div class="header-perfil">
                <h1>Reporte de Datos Extraídos</h1>
                <div class="stats-container">
                    <div class="stat-item">
                        <span class="stat-value">${info.publicaciones}</span>
                        <span class="stat-label">Publicaciones</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${info.seguidores}</span>
                        <span class="stat-label">Seguidores</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${info.seguidos}</span>
                        <span class="stat-label">Seguidos</span>
                    </div>
                </div>
            </div>

            <div class="container">
        `;

        // 3. Generar las tarjetas
        posts.forEach(post => {
            htmlContent += `
                <div class="card">
                    <img src="${post.link_foto}" alt="Post">
                    <div class="card-content">
                        <p class="description"><b>Post #${post.post_nro}:</b> ${post.descripcion}</p>
                    </div>
                </div>
            `;
        });

        htmlContent += `
            </div>
            <div class="footer">
                <p><b>Ingeniería de Datos - UCE</b></p>
                <p>Desarrollado por: Santiago Agustín Almeida Auqui</p>
            </div>
        </body>
        </html>
        `;

        fs.writeFileSync('reporte_final.html', htmlContent);
        console.log("Reporte HTML actualizado con estadísticas.");

    } catch (error) {
        console.error("Error al generar el reporte:", error.message);
    }
}

generarHTML();