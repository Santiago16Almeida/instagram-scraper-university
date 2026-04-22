const fs = require('fs');

function generarHTML() {
    try {
        const dataRaw = fs.readFileSync('datos_instagram.json', 'utf8');
        const data = JSON.parse(dataRaw);

        const info = data.infoPerfil || {};
        const posts = data.posts || [];
        const topPalabras = data.topPalabras || [];

        console.log("--- DEBUG ---");
        console.log("Palabras encontradas en el JSON:", topPalabras.length);
        console.log("Contenido de palabras:", JSON.stringify(topPalabras));
        console.log("-------------");

        let htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <title>Reporte de Ingeniería</title>
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fafafa; margin: 0; padding: 20px; }
                .header { text-align: center; padding: 40px 0; border-bottom: 1px solid #eee; }
                .stats { display: flex; justify-content: center; gap: 50px; margin: 20px 0; }
                .stat-box { text-align: center; }
                .stat-num { display: block; font-weight: bold; font-size: 22px; }
                .stat-text { color: #8e8e8e; font-size: 14px; }
                
                /* Caja del Analizador corregida */
                .analizador-box { 
                    background: white; 
                    border: 1px solid #dbdbdb; 
                    border-radius: 15px; 
                    padding: 30px; 
                    margin: 30px auto; 
                    max-width: 850px; 
                    text-align: center;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                .tags-flex { 
                    display: flex; 
                    justify-content: center; 
                    gap: 15px; 
                    flex-wrap: wrap; 
                    margin-top: 20px; 
                }
                .tag-chip { 
                    background: linear-gradient(45deg, #0095f6, #0072b1);
                    color: white; 
                    padding: 10px 20px; 
                    border-radius: 30px; 
                    font-weight: bold; 
                    font-size: 15px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
                .tag-num { 
                    background: rgba(255,255,255,0.3); 
                    padding: 2px 8px; 
                    border-radius: 10px; 
                    margin-left: 8px; 
                    font-size: 12px; 
                }

                .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 25px; max-width: 1100px; margin: 40px auto; }
                .post-card { background: white; border: 1px solid #dbdbdb; border-radius: 4px; overflow: hidden; }
                .post-card img { width: 100%; height: 300px; object-fit: cover; }
                .post-info { padding: 15px; font-size: 14px; line-height: 1.4; }
                .footer { text-align: center; padding: 40px; color: #8e8e8e; font-size: 12px; border-top: 1px solid #eee; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1 style="font-size: 36px; margin: 0;">Reporte de Datos Extraídos</h1>
                <div class="stats">
                    <div class="stat-box"><span class="stat-num">${info.publicaciones}</span><span class="stat-text">Publicaciones</span></div>
                    <div class="stat-box"><span class="stat-num">${info.seguidores}</span><span class="stat-text">Seguidores</span></div>
                    <div class="stat-box"><span class="stat-num">${info.seguidos}</span><span class="stat-text">Seguidos</span></div>
                </div>
            </div>

            <div class="analizador-box">
                <span style="color: #666; font-weight: bold; letter-spacing: 1px;"> TOP 5 PALABRAS CLAVE</span>
                <div class="tags-flex">
                    ${topPalabras.length > 0
                ? topPalabras.map((p, index) => `
                            <div class="tag-chip">
                                <span style="color: #FFD700; font-weight: 900; margin-right: 5px;">${index + 1}.</span> 
                                ${p.palabra} 
                                <span class="tag-num">${p.cantidad}</span>
                            </div>
                        `).join('')
                : '<p style="color: red;"> No se detectaron palabras clave en el JSON. Ejecuta de nuevo el analizador.</p>'
            }
                </div>
            </div>

            <div class="grid">
                ${posts.map(post => `
                    <div class="post-card">
                        <img src="${post.link_foto}">
                        <div class="post-info">
                            <b>Post #${post.post_nro}</b><br>
                            ${post.descripcion ? post.descripcion.substring(0, 120) : "Sin descripción"}...
                        </div>
                    </div>
                `).join('')}
            </div>

            <div class="footer">
                <p><b>FACULTAD DE INGENIERÍA - UCE</b></p>
                <p>Proyecto desarrollado por: Santiago Agustín Almeida Auqui</p>
            </div>
        </body>
        </html>`;

        fs.writeFileSync('reporte_final.html', htmlContent, 'utf8');
        console.log(" Proceso terminado. Abre reporte_final.html");

    } catch (err) {
        console.error(" Error crítico:", err.message);
    }
}

generarHTML();