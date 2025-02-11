
/**
 * # Clase Asignatura
 * 
 * Esta clase representa una asignatura con un nombre y una lista de calificaciones.
 */
export class Asignatura {
    #nombre; // Propiedad privada para el nombre de la asignatura
    #calificaciones; // Propiedad privada para almacenar las calificaciones

    /**
     * ## Constructor de la clase Asignatura
     * 
     * Este constructor inicializa una nueva instancia de la clase **Asignatura**.
     * 
     * @param {string} nombre - Nombre de la asignatura. Debe ser una cadena válida que cumpla con las restricciones: solo letras, espacios y números romanos.
     */
    constructor(nombre) {
        try {
            if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\sIVXLCDM]+$/.test(nombre)) {
                this.#nombre = nombre; // Valida que el nombre solo contenga caracteres permitidos
            } else {
                throw new Error("Nombre de la asignatura inválido.");
            }
            this.#calificaciones = []; // Inicializa la lista de calificaciones como un array vacío
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * ## Getter para obtener el nombre de la asignatura
     * 
     * Este método devuelve el nombre almacenado en la propiedad privada `#nombre`.
     * 
     * @returns {string} - Nombre de la asignatura.
     */
    get nombre() {
        return this.#nombre;
    }

    /**
     * ## Setter para modificar el nombre de la asignatura
     * 
     * Este método permite asignar un nuevo nombre a la asignatura, validando que sea una cadena válida.
     * 
     * @param {string} valor - Nuevo nombre de la asignatura.
     */
    set nombre(valor) {
        try {
            if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\sIVXLCDM]+$/.test(valor)) {
                this.#nombre = valor; // Actualiza el nombre si pasa la validación
            } else {
                throw new Error("Nombre de la asignatura inválido.");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * ## Getter para obtener las calificaciones
     * 
     * Este método devuelve el array de calificaciones almacenado en `#calificaciones`.
     * 
     * @returns {number[]} - Array de calificaciones de la asignatura.
     */
    get calificaciones() {
        return this.#calificaciones;
    }

    /**
     * ## Setter para asignar calificaciones
     * 
     * Este método permite asignar un nuevo array de calificaciones, validando que sea un array de números entre 0 y 10.
     * 
     * @param {number[]} valor - Array de calificaciones (cada número debe estar entre 0 y 10).
     */
    set calificaciones(valor) {
        try {
            if (Array.isArray(valor) && valor.every(c => typeof c === "number" && c >= 0 && c <= 10)) {
                this.#calificaciones = valor; // Actualiza el array de calificaciones si cumple las condiciones
            } else {
                throw new Error("Las calificaciones deben ser un array de números entre 0 y 10.");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * ## Método: promedioAsig
     * 
     * Este método calcula el promedio de las calificaciones almacenadas en `#calificaciones`.
     * 
     * @returns {string|null} - El promedio como un string con 2 decimales, o `null` si ocurre un error o no hay calificaciones.
     */
    promedioAsig() {
        try {
            if (this.#calificaciones.length > 0) {
                const total = this.#calificaciones.reduce((suma, valor) => suma + valor, 0); // Suma de todas las calificaciones
                return (total / this.#calificaciones.length).toFixed(2); // Devuelve el promedio con dos decimales
            } else {
                throw new Error("No hay calificaciones para calcular el promedio.");
            }
        } catch (error) {
            console.error(error.message);
            return null; // Retorna null en caso de error
        }
    }

    /**
 * Agrega calificaciones a una asignatura de un estudiante.
 * @function
 */
agregarCalificaciones() {
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
    
}

    /**
     * Crea un nuevo estudiante con los datos proporcionados por el usuario.
     * @function
     */
    crearEstudiante() {
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
        
    }

    /**
 * Matricula a un estudiante en una o varias asignaturas.
 * @function
 */
 matricularEstudiante() {
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
    
}

/**
 * Desmatricula a un estudiante de una o varias asignaturas.
 * @function
 */
 desmatricularEstudiante() {
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
    

}



    
}
