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


/**
 * Muestra el menú interactivo y gestiona las opciones seleccionadas.
 * @function
 */
function mostrarMenu() {
    let opcion = prompt(`
        Menú:
        1. Crear estudiante
        2. Crear asignatura
        3. Matricular estudiante en asignatura
        4. Desmatricular estudiante de asignatura
        5. Agregar calificación a asignatura
        6. Ver promedio de estudiante
        7. Buscar asignaturas por nombre
        8. Buscar estudiantes por nombre
        9. Ver lista de estudiantes
        10. Ver reporte de estudiantes
        11. Ver lista de estudiantes por asignatura
        12. Ver calificaciones y promedios por asignatura
        13. Promedio general
        14. Eliminar estudiante
        15. Eliminar asignatura
        16. Salir
    `);

    switch (opcion) {
        case '1':
            crearEstudiante();
            break;
        case '2':
            crearAsignatura();
            break;
        case '3':
            matricularEstudiante();
            break;
        case '4':
            desmatricularEstudiante();
            break;
        case '5':
            agregarCalificaciones();
            break;
        case '6':
            verPromedioEstudiante();
            break;
        case '7':
            buscarAsignaturas();
            break;
        case '8':
            buscarEstudiantes();
            break;
        case '9':
            verListaEstudiantes();
            break;
        case '10':
            verReporteEstudiantes();
            break;
        case '11':
            listaDeAsignaturasPorestudiante();
            break;
        case '12':
            calificacionesYpromedioAsignatura();
            break;
        case '13':
            PromedioGeneral();
            break;
        case '14':
            eliminarEs();
            break;
        case '15':
            eliminarA();
            break;
        case '16':
            console.log("Saliendo...");
            break;
        default:
            console.log("Opción no válida.");
            mostrarMenu();
            break;
    }
}

/**
 * Crea un nuevo estudiante con los datos proporcionados por el usuario.
 * @function
 */
function crearEstudiante() {
    let id = prompt("Ingresa el ID del estudiante:");
    let nombre = prompt("Ingresa el nombre del estudiante:");
    let edad = prompt("Ingresa la edad del estudiante:");
    let calle = prompt("Ingresa la calle:");
    let numero = prompt("Ingresa el número de la dirección:");
    let piso = prompt("Ingresa el piso de la dirección:");
    let codigoPostal = prompt("Ingresa el código postal:");
    let provincia = prompt("Ingresa la provincia:");
    let localidad = prompt("Ingresa la localidad:");
    
    // formateo de "texto" a numero

    const edadN = Number(edad);
    const idN = Number(id);

    let direccion = new Direccion(calle, numero, piso, codigoPostal, provincia, localidad);
    let estudiante = new Estudiante(idN, nombre, edadN, direccion.toString());
    
    listaEstudiantes.agregarEstudiante(estudiante);
    mostrarMenu();
}

/**
 * Crea una nueva asignatura con el nombre proporcionado por el usuario.
 * @function
 */
function crearAsignatura() {
    let nombre = prompt("Ingresa el nombre de la asignatura:");
    let asignatura = new Asignatura(nombre);
    asignaturas.agregarAsignatura(asignatura);
    mostrarMenu();
}

/**
 * Matricula a un estudiante en una o varias asignaturas.
 * @function
 */
function matricularEstudiante() {
    let idEstudiante = prompt("Ingresa el ID del estudiante:");
    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    
    if (estudiante) {
        let nombreAsignatura = prompt("Ingresa el nombre de la asignaturas:").split(",");
        nombreAsignatura.forEach(nAsig => {
            let asignatura = asignaturas.listaDeAsignaturas.find(a => a.nombre === nAsig);
            if (asignatura) {
                estudiante.matricular(asignatura);
            } else {
                console.log("Asignatura no encontrada.");
            }
        });    
    } else {
        console.log("Estudiante no encontrado.");
    }
    mostrarMenu();
}

/**
 * Desmatricula a un estudiante de una o varias asignaturas.
 * @function
 */
function desmatricularEstudiante() {
    let idEstudiante = prompt("Ingresa el ID del estudiante:");
    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    
    if (estudiante) {
        let nombreAsignatura = prompt("Ingresa el nombre de la asignatura:").split(',');
        nombreAsignatura.forEach(nAsig=>{
            let asignatura = estudiante.asignaturas.find(a => a.nombre === nAsig);
            if (asignatura) {
                estudiante.desmatricular(asignatura);
            } else {
                console.log("El estudiante no está matriculado en esta asignatura.");
            }
        })    
    } else {
        console.log("Estudiante no encontrado.");
    }
    mostrarMenu();
}

/**
 * Agrega calificaciones a una asignatura de un estudiante.
 * @function
 */
function agregarCalificaciones() {
    let idEstudiante = prompt("Ingresa el ID del estudiante:");
    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    
    if (estudiante) {
        let nombreAsignatura = prompt("Ingresa el nombre de la asignatura:");
        let asignatura = estudiante.asignaturas.find(a => a.nombre === nombreAsignatura);
        
        if (asignatura) {
            // Obtener las calificaciones y validarlas
            let calificacionesPromt = prompt("Ingresa las calificaciones separadas por coma:").split(',');
            let calificaciones = [];

            // Validar cada calificación
            calificacionesPromt.forEach(n => {
                let valor = parseFloat(n.trim());
                if (!isNaN(valor)) {
                    calificaciones.push(valor);
                } else {
                    console.log(`La calificación '${n.trim()}' no es válida y será ignorada.`);
                }
            });

            // Si el estudiante tiene la asignatura, agregar las calificaciones solo a ese estudiante
            if (calificaciones.length > 0) {
                asignatura.calificaciones.push(...calificaciones);  // Se agregan las calificaciones solo a este estudiante
                console.log(`Calificaciones agregadas correctamente a la asignatura ${nombreAsignatura} del estudiante ${estudiante.nombre}.`);
            } else {
                console.log("No se agregaron calificaciones válidas.");
            }
        } else {
            console.log("El estudiante no está matriculado en esta asignatura.");
        }
    } else {
        console.log("Estudiante no encontrado.");
    }
    mostrarMenu();
}


/**
 * Muestra el promedio de un estudiante dado su ID.
 * @function
 */
function verPromedioEstudiante() {
    let idEstudiante = prompt("Ingresa el ID del estudiante:");
    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    
    if (estudiante) {
        console.log(`El promedio de ${estudiante.nombre} es: ${estudiante.calcularPromedio()}`);
    } else {
        console.log("Estudiante no encontrado.");
    }
    mostrarMenu();
}

/**
 * Busca asignaturas por nombre mediante un patrón y muestra las coincidencias.
 * 
 * @returns {void} - No retorna nada, solo muestra las asignaturas encontradas en la consola.
 */
function buscarAsignaturas() {
    // Solicitar el patrón de búsqueda
    let patron = prompt("Ingresa el patrón para buscar asignaturas:");

    // Filtrar las asignaturas que coinciden con el patrón
    let asignaturasEncontradas = asignaturas.listaDeAsignaturas.filter(a => 
        a.nombre.toLowerCase().includes(patron.toLowerCase())
    );

    // Verificar si se encontraron asignaturas
    if (asignaturasEncontradas.length > 0) {
        console.log("Asignaturas que coinciden con el patrón '" + patron + "':");
        
        // Mostrar las asignaturas encontradas
        asignaturasEncontradas.forEach(a => {
            console.log(a.nombre); // Mostrar el nombre de la asignatura
        });
    } else {
        console.log("No se encontraron asignaturas con ese patrón.");
    }

    // Volver a mostrar el menú
    mostrarMenu();
}


/**
 * Busca estudiantes por nombre mediante un patrón y muestra las coincidencias.
 * @function
 */
function buscarEstudiantes() {
    let patron = prompt("Ingresa el patrón para buscar estudiantes:");
    listaEstudiantes.buscarEstudiantePorNombre(patron);
    mostrarMenu();
}

/**
 * Muestra la lista de estudiantes registrados.
 * @function
 */
function verListaEstudiantes() {
    listaEstudiantes.listarEstudiante();
    mostrarMenu();
}

/**
 * Muestra la lista de asignaturas por estudiante.
 * @function
 */
function listaDeAsignaturasPorestudiante() {
    listaEstudiantes.listaDeAsignaturasXestudiante();
    mostrarMenu();
}

/**
 * Muestra las calificaciones y promedios por asignatura.
 * @function
 */
function calificacionesYpromedioAsignatura() {
    listaEstudiantes.calificacionesYpromedioAsig();
    mostrarMenu();
}

/**
 * Genera y muestra un reporte de los estudiantes con sus asignaturas y calificaciones.
 * @function
 */
function verReporteEstudiantes() {
    listaEstudiantes.generarReporte();
    mostrarMenu();
}

/**
 * Calcula y muestra el promedio general de todos los estudiantes.
 * @function
 */
function PromedioGeneral() {
    listaEstudiantes.calcularPromedioGeneral();
    mostrarMenu();
}

/**
 * Elimina un estudiante basado en su ID.
 * @function
 */
function eliminarEs() {
    let idEstudiante = prompt("Ingresa el ID del estudiante a eliminar:");
    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    if(estudiante) {
        listaEstudiantes.eliminarEstudiante(estudiante);
    }
    mostrarMenu();
}

/**
 * Elimina una asignatura por su nombre.
 * @function
 */
function eliminarA() {
    let asig = prompt("Dime la asignatura a eliminar");
    let nombreA = asignaturas.listaDeAsignaturas.find(a => a.nombre == asig);
    asignaturas.quitarAsignatura(nombreA);
    mostrarMenu();
}

// Inicializa las instancias necesarias para la ejecución del código.
let asignaturas = new Asignaturas();
let listaEstudiantes = new listaEstudiante();
mostrarMenu();


