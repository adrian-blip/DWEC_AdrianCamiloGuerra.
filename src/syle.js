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
