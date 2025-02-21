
/**
* # Clase listaEstudiante
* 
* Representa una colección de estudiantes con métodos para gestionar la lista y generar reportes.
*/
export class listaEstudiante {
    constructor() {
        this.estudiantes = []; // Lista de objetos Estudiante
        this.cargarEstudiantes(); // Cargar datos al iniciar
        this.mostrarEstudiantes();
    }

    cargarEstudiantes() {
        const estudiantesJSON = localStorage.getItem('estudiantes');
        if (estudiantesJSON) {
            this.estudiantes = JSON.parse(estudiantesJSON).map(estudianteData =>
                new Estudiante(
                    estudianteData.id,
                    estudianteData.nombre,
                    estudianteData.edad,
                    estudianteData.direccion
                )
            );
        }
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
            this.guardarEnLocalStorage()
            console.log(`Estudiante ${estudiante.nombre} agregado.`);
        } catch (error) {
            console.error("Ocurrió un error al agregar estudiante:", error.message);
        }
    }
    /**
     * Crea un nuevo estudiante con los datos proporcionados por el usuario.
     * @function
     */
     crearEstudiante() {
        // Obtener valores del formulario
        let id = document.getElementById("id").value.trim();
        let nombre = document.getElementById("nombre").value.trim();
        let edad = document.getElementById("edad").value.trim();
        let calle = document.getElementById("calle").value.trim();
        let numero = document.getElementById("numero").value.trim();
        let piso = document.getElementById("piso").value.trim();
        let codigoPostal = document.getElementById("codigoPostal").value.trim();
        let provincia = document.getElementById("provincia").value.trim();
        let localidad = document.getElementById("localidad").value.trim();
    
        // Validaciones básicas
        if (!id || !nombre || !edad || !calle || !numero || !piso || !codigoPostal || !provincia || !localidad) {
            mostrarMensaje("Todos los campos son obligatorios.");
            return;
        }
    
        const idN = Number(id);
        const edadN = Number(edad);
        
        if (isNaN(idN) || isNaN(edadN) || edadN < 1) {
            mostrarMensaje("ID y edad deben ser números válidos.");
            return;
        }
    
        // Crear objeto dirección
        let direccion = new Direccion(calle, numero, piso, codigoPostal, provincia, localidad);
    
        // Crear objeto estudiante
        let estudiante = new Estudiante(idN, nombre, edadN, direccion.toString());
    
        // Agregar estudiante a la lista
        this.agregarEstudiante(estudiante);
    
        
        this.guardarEnLocalStorage();
        this.mostrarEstudiantes();
    
        // Mostrar mensaje de éxito
        mostrarMensaje("Estudiante agregado correctamente.");
    
        // Limpiar el formulario
        document.getElementById("crearEstudiante").reset();
    }

     /**
     * Guarda los estudiantes en localStorage.
     */
     guardarEnLocalStorage() {
        localStorage.setItem("estudiantes", JSON.stringify(this.estudiantes));
    }

    /**
     * Muestra los estudiantes en la página.
     */
    mostrarEstudiantes() {
        let tabla = document.getElementById("listaEstudiantes");
        tabla.innerHTML = ""; // Limpiar la tabla antes de mostrar nuevos datos

        this.estudiantes.forEach(est => {
            let fila = `<tr>
                            <td>${est.id}</td>
                            <td>${est.nombre}</td>
                            <td>${est.edad}</td>
                            <td>${est.direccion}</td>
                        </tr>`;
            tabla.innerHTML += fila;
        });
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
        let patronx = document.getElementById("inputPatronxEstudiante").value.trim().toLowerCase();
    let resultadoEstudiantes = document.getElementById("resultadoEstudiantes");

    resultadoEstudiantes.innerHTML = ""; // Limpiar resultados anteriores

    if (!patronx) {
        resultadoEstudiantes.innerHTML = "<p>Por favor, ingresa un nombre o parte de él.</p>";
        return;
    }

    let busqueda = this.estudiantes.filter(e => 
        e.nombre.toLowerCase().includes(patron)
    );

    if (busqueda.length > 0) {
        resultadoEstudiantes.innerHTML = "<strong>Estudiantes encontrados:</strong><ul>";
        busqueda.forEach(e => {
            resultadoEstudiantes.innerHTML += `<li>${e.nombre} (ID: ${e.id})</li>`;
        });
        resultadoEstudiantes.innerHTML += "</ul>";
    } else {
        resultadoEstudiantes.innerHTML = "<p>No se encontraron estudiantes con ese nombre.</p>";
    }

    abrirModal("modalEstBus");
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
 * Muestra el promedio de un estudiante dado su ID.
 * @function
 */
verPromedioEstudiante() {
    let idEstudiante = document.getElementById("idEstudiantePromedio").value.trim();
    let resultadoPromedio = document.getElementById("resultadoPromedio");

    if (!idEstudiante) {
        resultadoPromedio.innerHTML = "Por favor, ingresa un ID válido.";
        return;
    }

    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    
    if (estudiante) {
        resultadoPromedio.innerHTML = `El promedio de ${estudiante.nombre} es: ${estudiante.calcularPromedio()}`;
    } else {
        resultadoPromedio.innerHTML = "Estudiante no encontrado.";
    }
    
}
/**
 * Elimina un estudiante basado en su ID.
 * @function
 */
eliminarEs() {
    let idEstudiante = prompt("Ingresa el ID del estudiante a eliminar:");
    let estudiante = this.estudiantes.find(e => e.id == idEstudiante);
    if(estudiante) {
        this.estudiantes.eliminarEstudiante(estudiante);
        this.guardarEnLocalStorage()
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
 * Matricula a un estudiante en una o varias asignaturas.
 * @function
 */


matricularEstudiante() {
    // Obtener valores del formulario
    let idEstudiante = document.getElementById("idEstudianteMatricular").value.trim();
    let nombreAsignaturas = document.getElementById("nombreAsignaturaMatricular").value.trim().split(",");

    // Validaciones
    if (!idEstudiante || !nombreAsignaturas.length) {
        mostrarMensaje("Todos los campos son obligatorios.");
        return;
    }

    // Buscar estudiante por ID
    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    
    if (estudiante) {
        nombreAsignaturas.forEach(nombreAsignatura => {
            nombreAsignatura = nombreAsignatura.trim();
            let asignatura = listaAsignaturas.asignaturas.find(a => a.nombre === nombreAsignatura);
            
            if (asignatura) {
                estudiante.matricular(asignatura);
            } else {
                
                mostrarMensaje("No encontramos la asignatura");
            }
        });

        this.guardarEnLocalStorage()
        
        // Mensaje de éxito y limpiar formulario
        mostrarMensaje("Estudiante matriculado correctamente.");
        document.getElementById("matricularEstudiante").reset();
    } else {
        mostrarMensaje("Estudiante no encontrado.");
    }
}

/**
 * Desmatricula a un estudiante de una o varias asignaturas.
 * @function
 */
desmatricularEstudiante() {
    // Obtener valores del formulario
    let idEstudiante = document.getElementById("idEstudianteDesmatricular").value.trim();
    let nombreAsignaturas = document.getElementById("nombreAsignaturaDesmatricular").value.trim().split(",");

    // Validaciones
    if (!idEstudiante || !nombreAsignaturas.length) {
        mostrarMensaje("Todos los campos son obligatorios.");
        return;
    }

    // Buscar estudiante por ID
    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    
    if (estudiante) {
        nombreAsignaturas.forEach(nombreAsignatura => {
            nombreAsignatura = nombreAsignatura.trim();
            let asignaturaIndex = estudiante.asignaturas.findIndex(a => a.nombre === nombreAsignatura);

            if (asignaturaIndex !== -1) {
                estudiante.asignaturas.splice(asignaturaIndex, 1);
            } else {
                console.log(`El estudiante no está matriculado en '${nombreAsignatura}'.`);
            }
        });

        this.guardarEnLocalStorage()
        
        // Mensaje de éxito y limpiar formulario
        mostrarMensaje("Estudiante desmatriculado correctamente.");
        document.getElementById("desmatricularEstudiante").reset();
    } else {
        mostrarMensaje("Estudiante no encontrado.");
    }
}



       /**
 * Agrega calificaciones a una asignatura de un estudiante.
 * @function
 */
       agregarCalificaciones() {
        
    
        // Obtener valores del formulario
        let idEstudiante = document.getElementById("idEstudianteCalificacion").value.trim();
        let nombreAsignatura = document.getElementById("nombreAsignaturaCalificacion").value.trim();
        let calificacionesInput = document.getElementById("calificaciones").value.trim().split(",");
    
        // Validaciones básicas
        if (!idEstudiante || !nombreAsignatura || !calificacionesInput.length) {
            mostrarMensaje("Todos los campos son obligatorios.");
            return;
        }
    
        // Buscar estudiante por ID
        let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
        
        if (estudiante) {
            let asignatura = estudiante.asignaturas.find(a => a.nombre === nombreAsignatura);
            
            if (asignatura) {
                let calificaciones = [];
    
                // Validar y convertir calificaciones
                calificacionesInput.forEach(n => {
                    let valor = parseFloat(n.trim());
                    if (!isNaN(valor)) {
                        calificaciones.push(valor);
                    } else {
                        console.log(`La calificación '${n.trim()}' no es válida y será ignorada.`);
                    }
                });
    
                if (calificaciones.length > 0) {
                    asignatura.calificaciones.push(...calificaciones);
    
                    // Guardar cambios en localStorage
                    guardarEnLocalStorage("estudiantes", listaEstudiantes.estudiantes);
    
                    mostrarMensaje(`Calificaciones agregadas correctamente a ${nombreAsignatura} del estudiante ${estudiante.nombre}.`);
                    document.getElementById("formAgregarCalificaciones").reset();
                } else {
                    mostrarMensaje("No se agregaron calificaciones válidas.");
                }
            } else {
                mostrarMensaje("El estudiante no está matriculado en esta asignatura.");
            }
        } else {
            mostrarMensaje("Estudiante no encontrado.");
        }
    }
    
    

}
