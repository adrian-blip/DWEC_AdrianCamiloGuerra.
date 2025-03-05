import { Asignatura } from '../../src/asignatura.js';
import { Direccion } from '../../src/direccion.js';
import { Estudiante } from '../../src/estudiante.js';
import { listaEstudiante } from '../../src/listaEst.js';  
import { Asignaturas } from '../../src/asignaturas.js';



document.addEventListener("DOMContentLoaded", function() {
    event.preventDefault();
    const listaEstudiantes = new listaEstudiante();  
    const listaAsignaturas = new Asignaturas();     

    
    listaAsignaturas.mostrarAsignaturas();

    // Evento para crear estudiante
    document.getElementById("crearEstudiante").addEventListener("submit", function(event) {
        event.preventDefault();
        listaEstudiantes.crearEstudiante();
    });

    // Evento para crear asignatura
    document.getElementById("crearAsignatura").addEventListener("submit", function(event) {
        event.preventDefault();
        listaAsignaturas.crearAsignatura();
        console.log("Formulario de asignaturas enviado");
    });

    // Evento para eliminar estudiante
    document.getElementById("eliminarEstudiante").addEventListener("submit", function(event) {
        event.preventDefault();
        listaEstudiantes.eliminarEstudiante();
    });

    document.getElementById("eliminarAsignatura").addEventListener("submit", function(event) {
        event.preventDefault();
         
        listaAsignaturas.quitarAsignatura(); 
    });
    

    // Evento para crear asignatura
    document.getElementById("crearAsignatura").addEventListener("submit", function(event) {
        event.preventDefault();
        listaAsignaturas.crearAsignatura();
        console.log("Formulario de asignaturas enviado");
    });

    // Evento para matricular estudiante
    document.getElementById("matricularEstudiante").addEventListener("submit", function(event) {
        event.preventDefault();
        console.log("Funciona el evento de matricular est.")
        listaEstudiantes.matricularEstudiante();
    });

    // Evento para desmatricular estudiante
    document.getElementById("desmatricularEstudiante").addEventListener("submit", function(event) {
        event.preventDefault();
        listaEstudiantes.desmatricularEstudiante();
    });

    // Evento para gestionar calificaciones
    document.getElementById("gestionarCalificaciones").addEventListener("submit", function(event) {
        event.preventDefault();
        listaEstudiantes.agregarCalificaciones();
    });

    document.getElementById("modalPromedio").addEventListener("submit", function(event) {
        event.preventDefault();
        listaEstudiantes.verPromedioEstudiante();
    });

    document.getElementById("modalAsigBusq").addEventListener("submit", function(event) {
        event.preventDefault(); 
        listaAsignaturas.buscarPatronAsignatura();
    });
    

    document.getElementById("modalEstBus").addEventListener("submit", function(event) {
        event.preventDefault(); 
        listaEstudiantes.buscarEstudiantePorNombre();
    });

    document.getElementById("verListaEstudiantes").addEventListener("click", function(event) {
        event.preventDefault();
        listaEstudiantes.listarEstudiante();
    });

    document.getElementById("verReporteEstudiantes").addEventListener("click", function(event) {
        event.preventDefault();
        listaEstudiantes.generarReporte();
    });

    document.getElementById("listaDeAsignaturasPorestudiante").addEventListener("click", function(event) {
        event.preventDefault();
        listaEstudiantes.listaDeAsignaturasXestudiante();
    });

    document.getElementById("calificacionesYpromedioAsignatura").addEventListener("click", function(event) {
        event.preventDefault();
        listaEstudiantes.calificacionesYpromedioAsig();
    });

    document.getElementById("PromedioGeneral").addEventListener("click", function(event) {
        event.preventDefault();
        listaEstudiantes.calcularPromedioGeneral();
    });
});




