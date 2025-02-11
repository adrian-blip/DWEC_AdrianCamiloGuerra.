
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

 



 





    
}
