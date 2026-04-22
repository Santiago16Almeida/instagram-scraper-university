#  Instagram con Scraper

Este proyecto es una herramienta de ingeniería de datos diseñada para la extracción, análisis y visualización de información pública de perfiles de Instagram. Desarrollado como parte de la asignatura de **Dispositivos móviles**..

##  Características

El sistema consta de un pipeline de tres etapas:
1. **Extracción (Scraping):** Uso de **Playwright** para navegar de forma automatizada y extraer metadatos del perfil (seguidores, seguidos, publicaciones) y contenido multimedia.
2. **Análisis de Datos:** Módulo que procesa las descripciones de las publicaciones, filtra *stop words* y genera un ranking de las 5 palabras clave.
3. **Visualización:** Generador automático de reportes en **HTML5/CSS3** para presentar los resultados y no solo por consola.

##  Tecnologías Utilizadas

* **Entorno:** Node.js
* **Automatización de Navegador:** Playwright (Chromium)
* **Lenguaje:** JavaScript (ES6+)
* **Persistencia:** Archivos JSON para intercambio de datos.
* **Librería Externa:** SheetJS, para exportación a Excel


##  Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:
* [Node.js](https://nodejs.org/) (Versión 16 o superior)
* Credenciales de Instagram configuradas en un archivo `state.json` para evitar bloqueos.

##  Instalar dependencias
npm install playwright

##  Ejecutar el pipeline

1. Extraer datos
node scraper.js [nombre_de_usuario]
2. Generar reporte visual
node generar_reporte.js
3. Analizar palabras clave
node analizador.js

## Estructura del Proyecto

scraper.js: Motor de extracción basado en Playwright.
analizador.js: Lógica de procesamiento de texto y estadísticas.
generar_reporte.js: Motor de renderizado de la interfaz HTML.
datos_instagram.json: Almacén temporal de datos extraídos.
reporte_final.html: Dashboard generado automáticamente.

## Autor

Santiago Agustín Almeida Auqui - 10mo Semestre de Ingeniería en Sistemas - Materia Dispositivos Móviles
