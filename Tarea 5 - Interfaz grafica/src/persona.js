/**
 * Clase base que representa una persona.
 */
export class Persona {
    #nombre;
    #edad;

    /**
     * Constructor de la clase Persona.
     * @param {string} nombre - Nombre de la persona.
     * @param {number} edad - Edad de la persona.
     */
    constructor(nombre, edad) {
        try {
            this.nombre = nombre; // Usa el setter para validar el nombre
            this.edad = edad;     // Usa el setter para validar la edad
        } catch (error) {
            console.error("Error al crear persona:", error.message);
        }
    }

    /**
     * Getter para obtener el nombre de la persona.
     * @returns {string}
     */
    get nombre() {
        return this.#nombre;
    }

    /**
     * Setter para asignar el nombre de la persona.
     * @param {string} valor - Nuevo nombre.
     */
    set nombre(valor) {
        try {
            const patron = /^[A-Za-záéíóúÁÉÍÓÚüÜ\s]+$/; // Validar solo letras y espacios
            if (patron.test(valor)) {
                this.#nombre = valor.trim(); // Elimina espacios extra
            } else {
                throw new Error("Nombre inválido. Solo se permiten letras y espacios.");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * Getter para obtener la edad de la persona.
     * @returns {number}
     */
    get edad() {
        return this.#edad;
    }

    /**
     * Setter para asignar la edad de la persona.
     * @param {number} valor - Nueva edad.
     */
    set edad(valor) {
        try {
            if (typeof valor === "number" && valor > 0 && Number.isInteger(valor)) {
                this.#edad = valor;
            } else {
                throw new Error("Edad inválida. Debe ser un número entero mayor a 0.");
            }
        } catch (error) {
            console.error(error.message);
        }
    }
}
