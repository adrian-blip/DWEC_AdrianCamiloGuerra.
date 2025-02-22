
# Proyecto de Gestión de Estudiantes

## 📌 Descripción
Este proyecto es una aplicación web para la gestión de estudiantes, asignaturas y calificaciones. Implementa validación mixta en los formularios, almacenamiento en Local Storage y organización de prompts para mejorar la experiencia del usuario.

---

## 📜 Validación Mixta (HTML + JavaScript)
Se aplicó una **validación mixta** que combina:
1. **Validación en HTML:** A través de atributos como `required`, `pattern` y `min/max`.
2. **Validación en JavaScript:** Para mejorar la experiencia del usuario con feedback en tiempo real.

### 🔹 Implementación en JavaScript
Se encapsuló la validación dentro de una función que maneja:
- **Errores personalizados** usando `setCustomValidity()`.
- **Eventos `input` y `submit`** para validar en tiempo real y al enviar.
- **Aplicación de estilos dinámicos** (borde rojo para errores, verde para válido).

```js
document.addEventListener("DOMContentLoaded", function () {
    const formularios = document.querySelectorAll("form");

    formularios.forEach((form) => {
        form.addEventListener("input", (event) => validarCampo(event.target));
        form.addEventListener("submit", (event) => validarFormulario(event, form));
    });

    function validarFormulario(event, form) {
        event.preventDefault(); // Evita el envío si hay errores
        let valido = true;

        form.querySelectorAll("input").forEach((input) => {
            if (!validarCampo(input)) {
                valido = false;
            }
        });

        if (valido) {
            console.log("Formulario válido. Enviando...");
            form.submit();
        } else {
            console.log("Formulario inválido. Corrige los errores.");
        }
    }

    function validarCampo(input) {
        input.setCustomValidity(""); // Resetear mensaje de error

        let valor = input.value.trim();
        let id = input.id;

        // Validaciones específicas por campo
        if (id === "edad" && (valor < 18 || valor > 100)) {
            input.setCustomValidity("Debes tener entre 18 y 100 años.");
        }

        if (id === "codigoPostal" && !/^\d{5}$/.test(valor)) {
            input.setCustomValidity("El código postal debe tener 5 dígitos.");
        }

        if (id === "nombreAsignaturaMatricular" || id === "nombreAsignaturaDesmatricular") {
            let asignaturas = valor.split(",").map((asig) => asig.trim());
            if (asignaturas.some((asig) => asig.length < 3)) {
                input.setCustomValidity("Cada asignatura debe tener al menos 3 letras.");
            }
        }

        if (id === "calificacion" && (valor < 0 || valor > 100)) {
            input.setCustomValidity("La calificación debe estar entre 0 y 100.");
        }

        // Aplicar clases de validación
        if (!input.validity.valid) {
            input.classList.add("invalid");
            input.classList.remove("valid");
            return false;
        } else {
            input.classList.add("valid");
            input.classList.remove("invalid");
            return true;
        }
    }
});
```

---

## 🏗️ Encapsulamiento del Proyecto
Se organizó el código en archivos separados para corregir el encapsulamiento, las clases manejadores de las asignaturas y estudiantes manejan sus propias funciones dentro de ellas hasta el almacenamiento de estas.:
- `index.html`: Contiene los formularios.
- `styles.css`: Estilos de validación y diseño.
- `index.js`: Funciones de validación e interactividad.
- `app.js`: Manejo de los eventos de escucha.



Esto permite una mejor **separación de responsabilidades**, facilitando futuras modificaciones.

---

## 💾 Uso de Local Storage
El proyecto almacena los datos en **Local Storage** 

### 🔹 Guardar Datos
```js
    guardarEnLocalStorage() {
        localStorage.setItem("estudiantes", JSON.stringify(this.obtenerListaEsutudiantes()));
    }

    guardarEnLocalStorage() {
        localStorage.setItem("asignaturas", JSON.stringify(this.obtenerListaAsignaturas()));
       
    }


```

### 🔹 Obtener Datos
```js
    obtenerListaEsutudiantes() {
        return this.estudiantes.map(estudiante => estudiante.toString());
    }

    obtenerListaAsignaturas() {
        return this.listaDeAsignaturas.map(asignatura => asignatura.toString()); // Se usa el toString() corregido
    }

```

Con esto, los datos no se pierden al recargar la página.

---





