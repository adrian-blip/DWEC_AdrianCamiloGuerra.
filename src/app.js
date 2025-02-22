import { Asignatura } from './asignatura.js';
import { Direccion } from './direccion.js';
import { Estudiante } from './estudiante.js';
import { listaEstudiante } from './listaEst.js';  
import { Asignaturas } from './asignaturas.js';



document.addEventListener("DOMContentLoaded", function() {
    const listaEstudiantes = new listaEstudiante();  
    const listaAsignaturas = new Asignaturas();     

    // Mostrar estudiantes al cargar
    listaEstudiantes.mostrarEstudiantes();
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

    // Evento para matricular estudiante
    document.getElementById("matricularEstudiante").addEventListener("submit", function(event) {
        event.preventDefault();
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

    // Evento para buscar asignatura por patrón
    document.getElementById("buscarPatronAsignatura").addEventListener("submit", function(event) {
        event.preventDefault();
        listaAsignaturas.buscarPatronAsignatura();
    });


    document.getElementById("verListaEstudiantes").addEventListener("submit", function(event) {
        event.preventDefault();
        listaEstudiantes.listarEstudiante();
    });

    document.getElementById("verReporteEstudiantes").addEventListener("submit", function(event) {
        event.preventDefault();
        listaEstudiantes.generarReporte();
    });

    document.getElementById("listaDeAsignaturasPorestudiante").addEventListener("submit", function(event) {
        event.preventDefault();
        listaEstudiantes.listaDeAsignaturasXestudiante();
    });

    document.getElementById("calificacionesYpromedioAsignatura").addEventListener("submit", function(event) {
        event.preventDefault();
        listaEstudiantes.calificacionesYpromedioAsig();
    });

    document.getElementById("PromedioGeneral").addEventListener("submit", function(event) {
        event.preventDefault();
        listaEstudiantes.calcularPromedioGeneral();
    });
});




