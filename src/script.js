import { Asignatura } from './asignatura.js';
import { Direccion } from './direccion.js';
import { Estudiante } from './estudiante.js';
import { listaEstudiante } from './listaEst.js';  
import { Asignaturas } from './asignaturas.js';

/**
 * Función de pruebas para simular varios escenarios y operaciones.
 * @function
 */
function pruebas() {
    // Creación de asignaturas
    let matematicas = new Asignatura("Matemáticas");
    let historia = new Asignatura("Historia");
    let literatura = new Asignatura("Literatura");
    let fisica = new Asignatura("Física");

    // Asignación de calificaciones a las asignaturas
    matematicas.calificaciones = [8, 9, 10];
    historia.calificaciones = [7, 6, 8];
    literatura.calificaciones = [10, 9, 9];
    fisica.calificaciones = [6, 5, 7];

    // Creación de direcciones
    let direccion1 = new Direccion("Calle Falsa", 123, 2, "28080", "Madrid", "Madrid");
    let direccion2 = new Direccion("Avenida Siempre Viva", 456, 3, "28001", "Madrid", "Madrid");

    // Creación de estudiantes
    let estudiante1 = new Estudiante(1, "Juan Pérez", 20, direccion1);
    let estudiante2 = new Estudiante(2, "Ana García", 22, direccion2);
    let estudiante3 = new Estudiante(3, "Pedro Gómez", 21, direccion1);

    // Matricular estudiantes en asignaturas
    estudiante1.matricular(matematicas, historia, literatura);
    estudiante2.matricular(historia, literatura);
    estudiante3.matricular(fisica, historia);

    // Agregar calificaciones a las asignaturas
    estudiante1.agregarCalificacion("Matemáticas", 8, 9);
    estudiante1.agregarCalificacion("Historia", 7);
    estudiante2.agregarCalificacion("Historia", 6, 7);
    estudiante2.agregarCalificacion("Literatura", 10, 9);
    estudiante3.agregarCalificacion("Física", 7, 8);

    // Mostrar los promedios de los estudiantes
    console.log(`Promedio de ${estudiante1.nombre}: ${estudiante1.calcularPromedio()}`);
    console.log(`Promedio de ${estudiante2.nombre}: ${estudiante2.calcularPromedio()}`);
    console.log(`Promedio de ${estudiante3.nombre}: ${estudiante3.calcularPromedio()}`);

    // Mostrar detalles de los estudiantes
    console.log(estudiante1.toString());
    console.log(estudiante2.toString());
    console.log(estudiante3.toString());

    // Crear una lista de estudiantes y agregar estudiantes
    let listaEstudiantes = new listaEstudiante();

    listaEstudiantes.agregarEstudiante(estudiante1);
    listaEstudiantes.agregarEstudiante(estudiante2);
    listaEstudiantes.agregarEstudiante(estudiante3);

    // Intentar agregar un estudiante duplicado
    console.log("Intentando agregar un estudiante duplicado...");
    listaEstudiantes.agregarEstudiante(estudiante1); // Esto no debería ser posible

    // Eliminar un estudiante
    console.log("Eliminando estudiante...");
    listaEstudiantes.eliminarEstudiante(estudiante2); // Eliminar el estudiante Ana García

    // Buscar estudiantes por nombre
    console.log("Buscando estudiantes...");
    listaEstudiantes.buscarEstudiantePorNombre("Juan");
    listaEstudiantes.buscarEstudiantePorNombre("Ana"); // Este no debería encontrar nada

    // Generar reporte de estudiantes
    console.log("Generando reporte de estudiantes...");
    listaEstudiantes.generarReporte();

    // Listar asignaturas por estudiante
    console.log("Generando listado de asignaturas por estudiante...");
    listaEstudiantes.listaDeAsignaturasXestudiante();

    // Mostrar las calificaciones y promedios de las asignaturas
    console.log("Generando calificaciones y promedios por asignatura...");
    listaEstudiantes.calificacionesYpromedioAsig();

    // Buscar asignaturas por patrón
    console.log("Buscando asignaturas con patrones...");
    estudiante1.buscarPatronAsignatura("Liter");
    estudiante2.buscarPatronAsignatura("Fís");

    // Desmatricular estudiantes de asignaturas
    console.log("Desmatriculando estudiantes...");
    estudiante1.desmatricular(matematicas); // Desmatricular de Matemáticas
    estudiante3.desmatricular(fisica); // Desmatricular de Física

    // Mostrar detalles después de la desmatriculación
    console.log(estudiante1.toString());
    console.log(estudiante3.toString());

    // Mostrar el promedio general de todos los estudiantes
    console.log("Promedio general de todos los estudiantes: " + listaEstudiantes.calcularPromedioGeneral());
}

// Llamada a la función para realizar las pruebas
pruebas();

