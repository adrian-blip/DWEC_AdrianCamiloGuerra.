# Configuración de Parcel con Soporte para Modern y Legacy Builds

Este proyecto utiliza **Parcel** como bundler para gestionar la compilación de código moderno y legacy, asegurando compatibilidad con distintos navegadores.

## 🚀 Instalación y Configuración

### 1 **Instalar Dependencias**

Asegúrate de tener **Node.js** instalado. Luego, en la raíz del proyecto, ejecuta:

```sh
npm install
```

Esto instalará todas las dependencias necesarias, incluyendo Parcel y Babel para garantizar la compatibilidad con navegadores antiguos.

Si aún no tienes Parcel instalado globalmente, puedes hacerlo con:

```sh
npm install parcel -D
```

También instalaremos Babel para transformar el código en versiones compatibles con navegadores antiguos:

```sh
npm install @babel/preset-env -D
```

---



### 2 **Configuración de Babel**

Para garantizar compatibilidad con navegadores antiguos como **Internet Explorer 11**, creamos un archivo `.babel.config` en la raíz del proyecto con este contenido, igual que en la tarea 4.5:

```json
{
  export default {   
    presets: [
        [
            "@babel/preset-env",
            {
                targets: "> 0.25%, firefox>10, chrome>10, safari>10, not dead", 
                useBuiltIns: "usage", 
                corejs: 3 // Version de corejs.
            }
        ]
    ]
}
}


```

Esto asegurará que Parcel transpile el código para soportar navegadores más antiguos.

---

### 3 **Scripts en `package.json`**

Modificamos los scripts de **NPM** para utilizar Parcel en lugar de Webpack:

```json
"scripts": {
  "doc": "npx jsdoc -c jsdoc.json",
  "limpia:doc": "rimraf docs",
  "generar:jsdoc": "npm-run-all limpia:doc doc",
  "des": "parcel serve src/index.html",
  "prod": "parcel build src/index.html ",
  "servidor": "npm run des",
  "limpia-com": "rimraf dist",
  "generar-bundle": "npm run limpia-com && npm run des && npm run prod"
}
```

📌 **Explicación de los scripts:**

- **`parcel serve`** → Levanta un servidor de desarrollo con recarga en vivo.
- **`parcel build`** → Genera la versión de producción..
- **`limpia-com`** → Elimina la carpeta `dist` antes de generar nuevos archivos.
- **`generar-bundle`** → Realiza la limpieza, el desarrollo y la compilación final en un solo comando.

---
📌 **Comprobacion de resultado:**

- **`entrar en la web http://localhost:1234** Y ver el correcto funcionamento del proyecto.


