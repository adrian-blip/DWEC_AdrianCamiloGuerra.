

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
 * Busca estudiantes por nombre y muestra los resultados que coinciden con el patrón.
 * 
 * @param {string} patron - El patrón de búsqueda que puede ser parte del nombre del estudiante.
 * @returns {void} - No retorna nada, solo muestra los resultados en la consola.
 * 
 * @example
 * // Ejemplo de búsqueda
 * buscarEstudiantePorNombre("juan");
 * // Esto imprimirá todos los estudiantes cuyo nombre contenga "juan", sin importar mayúsculas o minúsculas.
 */
    buscarEstudiantePorNombre(patron) {
        // Buscar estudiantes que coincidan con el patrón
        let busqueda = this.estudiantes.filter(e => e.nombre.toLowerCase().includes(patron.toLowerCase()));

        if (busqueda.length > 0) {
            // Si se encontraron estudiantes que coinciden
            console.log("Estudiantes que coinciden con el patron: " + patron);

            // Mostrar los estudiantes encontrados
            busqueda.forEach(e => {
                console.log(e.toString());
            });
        } else {
            // Si no se encontraron resultados
            console.log("Búsqueda fallida: No se encontraron estudiantes.");
        }
    }

    calcularPromedioGeneral() {
        if (this.estudiantes.length === 0) {
            console.error("No hay estudiantes en la lista.");
            return null;
        }
    
        // Sumar los promedios de todos los estudiantes
        const totalPromedio = this.estudiantes.reduce((acum, estudiante) => {
            const promedio = estudiante.calcularPromedio();
            if (promedio !== null) {
                acum += promedio;
            }
            return acum;
        }, 0);
    
        // Calcular el promedio general
        let valor = totalPromedio / this.estudiantes.length;
        console.log("El promedio general es: " + valor);
        return valor;  // Asegúrate de devolver el valor calculado
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
