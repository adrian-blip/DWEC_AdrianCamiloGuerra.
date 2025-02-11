let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
let asignaturas = JSON.parse(localStorage.getItem("asignaturas")) || [];

function guardarEnLocalStorage() {
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
    localStorage.setItem("asignaturas", JSON.stringify(asignaturas));
}

function cambiarSeccion(seccionId) {
    document.querySelectorAll(".seccion").forEach(seccion => {
        seccion.style.display = "none";
    });
    document.getElementById(seccionId).style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
    mostrarEstudiantes();
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

function cerrarModal() {
    document.querySelector(".modal").remove();
}

function agregarEstudiante() {
    const nombre = document.getElementById("nombre").value;
    const edad = document.getElementById("edad").value;
    const direccion = document.getElementById("direccion").value;
    
    if (nombre && edad && direccion) {
        estudiantes.push({ nombre, edad, direccion, asignaturas: {} });
        guardarEnLocalStorage();
        mostrarMensaje("Estudiante agregado correctamente");
    }
}

function agregarAsignatura() {
    const nombreAsignatura = document.getElementById("nombreAsignatura").value;
    if (nombreAsignatura) {
        asignaturas.push(nombreAsignatura);
        guardarEnLocalStorage();
        mostrarMensaje("Asignatura agregada correctamente");
    }
}

function matricularEstudiante() {
    const nombreEstudiante = document.getElementById("nombreEstudianteMatricular").value;
    const nombreAsignatura = document.getElementById("nombreAsignaturaMatricular").value;
    
    let estudiante = estudiantes.find(e => e.nombre === nombreEstudiante);
    if (estudiante && asignaturas.includes(nombreAsignatura)) {
        estudiante.asignaturas[nombreAsignatura] = [];
        guardarEnLocalStorage();
        mostrarMensaje("Estudiante matriculado correctamente");
    }
}

function desmatricularEstudiante() {
    const nombreEstudiante = document.getElementById("nombreEstudianteMatricular").value;
    const nombreAsignatura = document.getElementById("nombreAsignaturaMatricular").value;
    
    let estudiante = estudiantes.find(e => e.nombre === nombreEstudiante);
    if (estudiante && estudiante.asignaturas[nombreAsignatura]) {
        delete estudiante.asignaturas[nombreAsignatura];
        guardarEnLocalStorage();
        mostrarMensaje("Estudiante desmatriculado correctamente");
    }
}

function verPromedioEstudiante() {
    let mensaje = "Promedios de estudiantes:<br>";
    estudiantes.forEach(estudiante => {
        let total = 0, count = 0;
        Object.values(estudiante.asignaturas).forEach(calificaciones => {
            calificaciones.forEach(cal => {
                total += cal;
                count++;
            });
        });
        mensaje += `${estudiante.nombre}: ${count ? (total / count).toFixed(2) : 'N/A'}<br>`;
    });
    mostrarMensaje(mensaje);
}

function buscarEstudiantes() {
    const patron = prompt("Ingrese nombre a buscar");
    let resultado = estudiantes.filter(est => est.nombre.includes(patron));
    mostrarMensaje(resultado.length ? JSON.stringify(resultado, null, 2) : "No se encontraron estudiantes");
}

function buscarAsignaturas() {
    const patron = prompt("Ingrese patrón de búsqueda");
    let resultado = asignaturas.filter(asig => asig.includes(patron));
    mostrarMensaje(resultado.length ? resultado.join(", ") : "No se encontraron asignaturas");
}

function verListaEstudiantes() {
    mostrarMensaje(JSON.stringify(estudiantes, null, 2));
}

function verReporteEstudiantes() {
    let mensaje = "Reporte de estudiantes:<br>";
    estudiantes.forEach(est => mensaje += `${est.nombre}: ${JSON.stringify(est.asignaturas)}<br>`);
    mostrarMensaje(mensaje);
}

function eliminarEs() {
    const nombre = prompt("Ingrese el nombre del estudiante a eliminar");
    estudiantes = estudiantes.filter(est => est.nombre !== nombre);
    guardarEnLocalStorage();
    mostrarMensaje("Estudiante eliminado correctamente");
}

function eliminarA() {
    const nombre = prompt("Ingrese el nombre de la asignatura a eliminar");
    asignaturas = asignaturas.filter(asig => asig !== nombre);
    estudiantes.forEach(est => delete est.asignaturas[nombre]);
    guardarEnLocalStorage();
    mostrarMensaje("Asignatura eliminada correctamente");
}
