#  Instagram con Scraper

Este proyecto es una herramienta de ingeniería de datos diseñada para la extracción, análisis y visualización de información pública de perfiles de Instagram. Desarrollado como parte de la asignatura de **Dispositivos móviles**.

## Arquitectura de la Solución

El proyecto sigue un patrón de diseño **Modular y Secuencial**, separando las responsabilidades para facilitar el mantenimiento y la escalabilidad:

1. **Capa de Persistencia de Sesión:** Gestión de estado de autenticación (Cookies/LocalStorage).
2. **Capa de Extracción:** Automatización basada en eventos y espera de selectores.
3. **Capa de Transformación:** Procesamiento de lenguaje natural básico (Tokenización y limpieza).
4. **Capa de Presentación:** Dashboards dinámicos en el cliente.

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

## Instalación y Configuración

npm install playwright
1. Clonar el repositorio:
   git clone https://github.com/Santiago16Almeida/instagram-scraper-university.git
   cd instagram-scraper-university

2. Instalar todas las dependencias:
   npm install

3. Configurar el entorno:
   * Copia el archivo `.env.example` y cámbiale el nombre a `.env`.
   * Edita `TARGET_USER` con el usuario que quieras.

4. Generar sesión (Solo la primera vez):
   node auth.js
   *Inicia sesión manualmente y espera a que el navegador se cierre solo.*

##  Ejecutar el pipeline

1. Extraer datos
node scraper.js [nombre_de_usuario]
2. Analizar palabras clave
node analizador.js
3. Generar reporte visual
node generar_reporte.js


## Estructura del Proyecto

scraper.js: Motor de extracción basado en Playwright.
analizador.js: Lógica de procesamiento de texto y estadísticas.
generar_reporte.js: Motor de renderizado de la interfaz HTML.
datos_instagram.json: Almacén temporal de datos extraídos.
reporte_final.html: Dashboard generado automáticamente.

## Estrategia Anti-Bloqueos
Para minimizar el riesgo de baneo o bloqueos por parte de Meta, se implementaron las siguientes tácticas:
* **Persistencia de Sesión:** Uso de `state.json` para cargar cookies previamente autenticadas, asi evita el flujo de login constante que dispara alertas de bots.
* **Humanización (Jitter):** Se incorporaron tiempos de espera aleatorios entre la navegación y la extracción de datos.
* **Intercepción de User-Agent:** El navegador se configura con un User-Agent de escritorio real para evitar ser detectado como un motor de renderizado automatizado (Headless).

## Análisis de Solicitudes Web
Durante el desarrollo, se identificó que Instagram utiliza una arquitectura de **Single Page Application (SPA)**. 
* Los datos no están presentes en el HTML inicial; se cargan mediante llamadas asíncronas a una API interna.
* El scraper fue diseñado para esperar la carga del DOM e interceptar respuestas de tipo XHR/Fetch que contienen los metadatos del perfil en formato JSON estructurado.

## Desafíos Encontrados
1. **Dinamicidad de Clases:** Instagram cambia constantemente los nombres de las clases CSS. Se resolvió usando selectores basados en jerarquía de etiquetas y atributos de accesibilidad (`alt`, `header`).
2. **Expiración de Tokens:** Las imágenes de Instagram tienen URLs con firmas temporales. Se mitigó procesando la información inmediatamente después de la extracción.


## Autor

Santiago Agustín Almeida Auqui - 10mo Semestre de Ingeniería en Sistemas - Materia Dispositivos Móviles
