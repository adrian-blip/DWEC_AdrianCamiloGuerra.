// Mostrar el popup de reportes
function mostrarPopup() {
    document.getElementById("popupReportes").style.display = "block";
    
}

// Ocultar el popup
function cerrarPopup() {
    document.getElementById("popupReportes").style.display = "none";
}
// Función para abrir el modal
function abrirModal(id) {
    event.preventDefault(); // Evita que el formulario se envíe y recargue la página
    document.getElementById(id).style.display = "block";
}

// Función para cerrar el modal
function cerrarModal(id) {
    document.getElementById(id).style.display = "none";
}

function cerrarModal() {
    document.querySelector(".modal").remove();
}

function cambiarSeccion(seccionId) {
    document.querySelectorAll(".seccion").forEach(seccion => {
        seccion.style.display = "none";
    });
    document.getElementById(seccionId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    
    cambiarSeccion('menu');
});

function mostrarMensaje(mensaje) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button" onclick="cerrarModal()">&times;</span>
            <p>${mensaje}</p>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = "block";
}

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

