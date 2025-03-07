# Proyecto JQuery

## Descripción del Repositorio

Este repositorio contiene el proyecto **JQuery**, desarrollado para la asignatura *Desarrollo Web en Entorno Cliente* como parte del curso de **2º DAW**.

El objetivo del proyecto es desarrollar dos versiones de una web que muestra contenido obtenido desde una API:

- Una estilizada con **TailwindCSS**, usando **JavaScript nativo**.
- Otra estilizada con **TailwindCSS**, pero implementada con **JQuery**.

## Enlace Web


**Creado por:** *Adrian camilo guerra polo*


---

## Estructura del Proyecto

```
jquery-AdrianCamiloGuerra/
|-- src/
|   |-- css/
|   |   |-- entrada.css
|   |   |-- salida.css
|   |-- html/
|   |   |-- index.html (JS Nativo)
|   |   |-- jquery.html (JQuery)
|   |-- img/
|   |-- js/
|   |   |-- catsApi.js
|   |   |-- catsApiJquery.js
|-- package.json
|-- tailwind.config.js
```

---

## TailwindCSS

### Configuración de Node.js

Se debe tener instalado **Node.js**. Para inicializar el proyecto:

```bash
npm init
```

### Instalación de TailwindCSS y DaisyUI

```bash
npm install --save-dev tailwindcss@3 tailwindcss daisyui
```

### Configuración de TailwindCSS

Para generar el archivo de configuración (Version 3):

```bash
npx tailwindcss init
```

Ejemplo de configuración personalizada en **tailwind.config.js**:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js}',
  ],
  safelist: [
   
  ],
  theme: {
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        'cat': {
         
        },
        'custom-bg': '#F8F3ED', 
        'custom-dark': '#4A4A4A', 
        'custom-accent': '#F4A261', 
        'custom-card': '#FFF6E5', 
      },
    },
    boxShadow: {
      'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      'header': '0 10px 5px 0 rgba(0, 0, 0, 0.2)',
      'footer': '0 -5px 5px 0 rgba(0, 0, 0, 0.2)',
    }
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        catTheme: {
          "primary": "#8D6E63", 
          "secondary": "#4A4A4A", 
          "accent": "#F4A261", 
          "neutral": "#FFF6E5", 
          "base-100": "#F8F3ED", 
          "info": "#B0BEC5", 
          "success": "#4CAF50", 
          "warning": "#FFB74D", 
          "error": "#D32F2F", 
        }
      },
    ],
  },
}

```

### Configuración del CSS

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Compilación de TailwindCSS

En **package.json**, agregar:

```json
"scripts": {
  "vigilar:css": "npx tailwindcss -i ./src/css/entrada.css -o ./src/css/salida.css --watch"
}
```

---

## Consumo de API con JavaScript

Se utiliza la API **PokAPThe Cat API** con dos enfoques:

- **JavaScript Nativo:** Usando `fetch` y `async/await`.
- **JQuery:** Usando `$.ajax()` y `Deferred`.


### Diferencias entre JavaScript y JQuery

| Característica | JavaScript | JQuery |
|---------------|------------|--------|
| Peticiones API | `fetch` y `async/await` | `$.ajax()` |
| Manejo de Errores | `try/catch` | `.fail()` |



---

## Configuración y Compilación de JQuery

### Instalación de Dependencias

```bash
npm install --save-dev jquery parcel npm-run-all rimraf
```

### Importar JQuery en JS

```js
import $ from 'jquery';
```

### Incluir JQuery en el HTML

```html
<script type="module" src="../js/pokemonAPI-JQuery.js" defer></script>
```

### Configuración de Scripts en package.json

```json
"scripts": {
    "vigilar:css": "npx tailwindcss -i ./src/css/entrada.css -o ./src/css/salida.css --watch",
    "parcel:des": "parcel serve ./src/html/jquery.html --dist-dir compilado/desarrollo",
    "parcel:prod": "parcel build ./src/html/jquery.html --dist-dir compilado/produccion"
}
```

---

## Ejecutar el Proyecto

1. Clonar el repositorio:

```bash
git clone 'URL_DEL_REPOSITORIO'
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el proyecto:

```bash
npm run dev
```

Para generar una versión optimizada:

```bash
npm run prod
```

Esto iniciará el proyecto en un servidor local.

---


