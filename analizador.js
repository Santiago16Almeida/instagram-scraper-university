const fs = require('fs');

function analizarPalabras() {
    try {
        const rawData = fs.readFileSync('datos_instagram.json');
        const jsonCompleto = JSON.parse(rawData);
        const posts = jsonCompleto.posts;

        // Unir todas las descripciones en un solo texto gigante
        let textoTotal = posts.map(p => p.descripcion).join(' ').toLowerCase();

        // (quitar puntos, comas y símbolos)
        textoTotal = textoTotal.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

        // Separar por palabras
        const palabras = textoTotal.split(/\s+/);

        // Palabras "basura" que no queremos contar (Stop words)
        const stopWords = ['y', 'el', 'la', 'de', 'que', 'en', 'a', 'es', 'un', 'con', 'por', 'para', 'las', 'los', 'del', 'se', 'su', 'al', 'o', 'este', 'the', 'is', 'in', 'and', 'to', 'of', 'with', 'for'];

        // Contar palabras
        const contador = {};
        palabras.forEach(palabra => {
            if (palabra.length > 2 && !stopWords.includes(palabra)) {
                contador[palabra] = (contador[palabra] || 0) + 1;
            }
        });

        // Ordena de mayor a menor y sacar las 5 mejores
        const top5 = Object.entries(contador)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        console.log("\n--- ANALIZADOR DE DATOS ---");
        console.log("Las 5 palabras clave más mencionadas en este perfil:");
        console.table(top5.map(p => ({ Palabra: p[0], Repeticiones: p[1] })));

    } catch (error) {
        console.error("Error al analizar:", error.message);
    }
}

analizarPalabras();