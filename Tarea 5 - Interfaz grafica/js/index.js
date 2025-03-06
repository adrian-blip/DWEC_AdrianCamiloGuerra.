// Mostrar el popup de reportes
function mostrarPopup() {
    document.getElementById("popupReportes").style.display = "block";
}

// Ocultar el popup
function cerrarPopup() {
    document.getElementById("popupReportes").style.display = "none";
}

// Función para abrir el modal sin recargar la página
function abrirModal(id) {
    let modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "block";
    }
}

// Función para cerrar el modal
function cerrarModal(id) {
    let modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "none";
    }
}

function cambiarSeccion(seccionId) {
    // Oculta todas las secciones
    document.querySelectorAll(".seccion").forEach(seccion => {
        seccion.style.display = "none";
    });

    // Muestra la sección seleccionada
    const seccionMostrar = document.getElementById(seccionId);
    if (seccionMostrar) {
        seccionMostrar.style.display = "block";
    } else {
        console.error(`Sección con ID '${seccionId}' no encontrada.`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Asegurar que la primera sección visible sea 'menu'
    cambiarSeccion('menu');
});


// Evitar la recarga de formularios y mantener los resultados visibles
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Evita la recarga

            // Verifica si el formulario está dentro de un modal
            let modal = form.closest(".modal");
            if (modal) {
                // No cerramos el modal automáticamente, el usuario lo hará con la "X"
                console.log(`Formulario ${form.id} procesado sin cerrar el modal.`);
            }
        });
    });

    // Mostrar la sección de inicio por defecto
    cambiarSeccion('menu');
});


document.addEventListener("DOMContentLoaded", () => {
    // Evita la recarga del formulario dentro de la modal
    document.getElementById("modalPromedio").addEventListener("submit", function (event) {
        event.preventDefault(); // Detiene la recarga

    });
});




// Validacion mixta

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

