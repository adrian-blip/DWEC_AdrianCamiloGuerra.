

 /**
 * # Clase listaEstudiante
 * 
 * Representa una colección de estudiantes con métodos para gestionar la lista y generar reportes.
 */
export class listaEstudiante {
    constructor() {
        this.estudiantes = []; // Lista de objetos Estudiante
    }

    /**
     * ## Método: Agregar estudiante
     * 
     * Agrega un nuevo estudiante a la lista si no existe ya.
     * 
     * @param {Estudiante} estudiante - Instancia de la clase Estudiante.
     */
    agregarEstudiante(estudiante) {
        try {
            if (this.estudiantes.some(e => e.id === estudiante.id)) {
                console.error(`El estudiante con ID ${estudiante.id} ya está en la lista.`);
                return;
            }
            this.estudiantes.push(estudiante);
            console.log(`Estudiante ${estudiante.nombre} agregado.`);
        } catch (error) {
            console.error("Ocurrió un error al agregar estudiante:", error.message);
        }
    }

    /**
     * ## Método: Eliminar estudiante
     * 
     * Elimina un estudiante de la lista.
     * 
     * @param {Estudiante} estudiante - Instancia de la clase Estudiante.
     */
    eliminarEstudiante(estudiante) {
        try {
            const index = this.estudiantes.findIndex(e => e.id === estudiante.id);
            if (index !== -1) {
                this.estudiantes.splice(index, 1);
                console.log(`Estudiante ${estudiante.nombre} eliminado.`);
            } else {
                console.error(`El estudiante ${estudiante.nombre} no existe.`);
            }
        } catch (error) {
            console.error("Ocurrió un error al eliminar estudiante:", error.message);
        }
    }

    /**
     * ## Método: Calcular promedio general
     * 
     * Calcula el promedio general de todas las calificaciones de todos los estudiantes.
     * 
     * @returns {number | undefined} - Promedio general o undefined si no hay estudiantes.
     */
    calcularPromedioGeneral() {
        try {
            const totalPromedio = this.estudiantes.reduce((acum, estudiante) => acum + estudiante.calcularPromedio(), 0);
            const cantidadEstudiantes = this.estudiantes.length;

            if (cantidadEstudiantes > 0) {
                return totalPromedio / cantidadEstudiantes;
            } else {
                console.error("No hay estudiantes en la lista.");
            }
        } catch (error) {
            console.error("Error al calcular promedio general:", error.message);
        }
    }

    /**
     * ## Método: Generar reporte
     * 
     * Genera un reporte detallado de los estudiantes y sus asignaturas.
     */
    generarReporte() {
        console.log("Reporte de Estudiantes:");
        this.estudiantes.forEach(est => {
            console.log(`- Estudiante: ${est.nombre} (ID: ${est.id})`);
            est.asignaturas.forEach(asig => {
                console.log(`  Asignatura: ${asig.nombre}`);
                console.log(`    Calificaciones: ${asig.calificaciones.join(", ")}`);
                console.log(`    Promedio: ${asig.promedioAsig()}`);
            });
        });
    }

    /**
     * ## Método: Listar estudiantes
     * 
     * Muestra una lista básica de estudiantes.
     */
    listarEstudiante() {
        console.log("Lista de Estudiantes:");
        this.estudiantes.forEach(est => {
            console.log(`Nombre: ${est.nombre}, ID: ${est.id}, Edad: ${est.edad}`);
        });
    }

    /**
     * ## Método: Listar asignaturas por estudiante
     * 
     * Muestra todas las asignaturas matriculadas por cada estudiante.
     */
    listaDeAsignaturasXestudiante() {
        console.log("Asignaturas por Estudiante:");
        this.estudiantes.forEach(est => {
            console.log(`Estudiante: ${est.nombre}`);
            est.asignaturas.forEach(asig => {
                console.log(`  Asignatura: ${asig.nombre}`);
            });
        });
    }

    /**
     * ## Método: Calificaciones y promedios por asignatura
     * 
     * Genera un reporte de calificaciones y promedios por asignatura para cada estudiante.
     */
    calificacionesYpromedioAsig() {
        console.log("Calificaciones y Promedios por Asignatura:");
        this.estudiantes.forEach(est => {
            console.log(`Estudiante: ${est.nombre}`);
            est.asignaturas.forEach(asig => {
                console.log(`  Asignatura: ${asig.nombre}`);
                console.log(`    Calificaciones: ${asig.calificaciones.join(", ")}`);
                console.log(`    Promedio: ${asig.promedioAsig()}`);
            });
        });
    }
}
