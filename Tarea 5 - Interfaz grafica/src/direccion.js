/**
 * # Clase Direccion
 * 
 * Esta clase representa una dirección postal, permitiendo almacenar y gestionar información relacionada con la ubicación de una persona o lugar.
 */
export class Direccion {
    /**
     * ## Constructor de la clase Direccion
     * 
     * Inicializa una nueva instancia de la clase **Direccion** con los datos proporcionados.
     * 
     * @param {string} calle - El nombre de la calle.
     * @param {number|string} numero - El número de la calle. Puede incluir letras como "5B".
     * @param {string} piso - El número o descripción del piso (por ejemplo, "3ºA").
     * @param {string} codigoPostal - El código postal asociado a la dirección.
     * @param {string} provincia - La provincia donde se encuentra la dirección.
     * @param {string} localidad - La localidad o ciudad donde se encuentra la dirección.
     */
    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        this.calle = calle; // Nombre de la calle
        this.numero = numero; // Número de la calle
        this.piso = piso; // Piso o descripción del piso
        this.codigoPostal = codigoPostal; // Código postal
        this.provincia = provincia; // Provincia
        this.localidad = localidad; // Localidad o ciudad
    }

    /**
     * ## Método: toString
     * 
     * Este método genera una representación en cadena de la dirección postal. 
     * Incluye la calle, número, piso, código postal, localidad y provincia.
     * 
     * @returns {string} - Representación en cadena de la dirección.
     */
    toString() {
        return `${this.calle} ${this.numero}, Piso ${this.piso}, ${this.codigoPostal} ${this.localidad}, ${this.provincia}`;
    }
    toJSON() {
        return {
            calle: this.calle,
            numero: this.numero,
            piso: this.piso,
            codigoPostal: this.codigoPostal,
            provincia: this.provincia,
            localidad: this.localidad
        };
    }
    
}
