const fs = require('fs');

function analizarPalabras() {
    try {
        const rawData = fs.readFileSync('datos_instagram.json');
        const jsonCompleto = JSON.parse(rawData); // Aquí se define la variable
        const posts = jsonCompleto.posts;

        //Une todas las descripciones
        let textoTotal = posts.map(p => p.descripcion || "").join(' ').toLowerCase();

        //Limpiar símbolos
        textoTotal = textoTotal.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

        //Separar por palabras
        const palabras = textoTotal.split(/\s+/);

        //Palabras simples
        const stopWords = ['y', 'el', 'la', 'de', 'que', 'en', 'a', 'es', 'un', 'con', 'por', 'para', 'las', 'los', 'del', 'se', 'su', 'al', 'o', 'este', 'the', 'is', 'in', 'and', 'to', 'of', 'with', 'for'];

        //Contar palabras repetidas
        const contador = {};
        palabras.forEach(palabra => {
            if (palabra.length > 2 && !stopWords.includes(palabra)) {
                contador[palabra] = (contador[palabra] || 0) + 1;
            }
        });

        //Ordenar y sacar las 5 mejores
        const top5 = Object.entries(contador)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);

        //Guardar el resultado
        jsonCompleto.topPalabras = top5.map(p => ({ palabra: p[0], cantidad: p[1] }));

        //Sobrescribimos el archivo JSON
        fs.writeFileSync('datos_instagram.json', JSON.stringify(jsonCompleto, null, 2));

        console.log("\n ANALIZADOR DE DATOS COMPLETADO");
        console.table(jsonCompleto.topPalabras);

    } catch (error) {
        console.error(" Error al analizar:", error.message);
    }
}

// Ejecutamos la función
analizarPalabras();