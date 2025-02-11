/**
 * # Clase Asignaturas
 * 
 * Esta clase permite gestionar una colección de asignaturas. Ofrece métodos para agregar y quitar asignaturas de una lista.
 */
export class Asignaturas {
    /**
     * ## Constructor de la clase Asignaturas
     * 
     * Inicializa una nueva instancia de la clase **Asignaturas** con una lista vacía de asignaturas.
     */
    constructor() {
        this.listaDeAsignaturas = []; // Lista que almacenará las asignaturas
    }

    /**
 * Crea una nueva asignatura con el nombre proporcionado por el usuario.
 * @function
 */
 crearAsignatura() {
    let nombre = prompt("Ingresa el nombre de la asignatura:");
    let asignatura = new Asignatura(nombre);
    asignaturas.agregarAsignatura(asignatura);
    mostrarMenu();
}

    /**
     * ## Método: agregarAsignatura
     * 
     * Este método agrega una nueva asignatura a la lista, siempre y cuando no exista ya una asignatura con el mismo nombre.
     * 
     * @param {Asignatura} asignatura - La asignatura a agregar. Debe ser una instancia válida de la clase **Asignatura**.
     */
    agregarAsignatura(asignatura) {
        try {
            // Validar si la asignatura ya existe en la lista
            if (!this.listaDeAsignaturas.some(a => a.nombre === asignatura.nombre)) {
                this.listaDeAsignaturas.push(asignatura); // Agrega la asignatura si no existe
                console.log(`${asignatura.nombre} ha sido agregada.`);
            } else {
                console.warn(`${asignatura.nombre} ya está en la lista.`); // Mensaje de advertencia si ya existe
            }
        } catch (error) {
            console.error("Error al agregar asignatura:", error.message); // Manejo de errores
        }
    }

    /**
     * ## Método: quitarAsignatura
     * 
     * Este método quita una asignatura de la lista si existe. Si no está presente, muestra un mensaje de advertencia.
     * 
     * @param {Asignatura} asignatura - La asignatura a quitar. Debe ser una instancia válida de la clase **Asignatura**.
     */
    quitarAsignatura(asignatura) {
        try {
            // Filtrar la lista para excluir la asignatura que se desea quitar
            const nuevaLista = this.listaDeAsignaturas.filter(a => a.nombre !== asignatura.nombre);

            // Si la longitud cambia, significa que la asignatura fue encontrada y eliminada
            if (nuevaLista.length !== this.listaDeAsignaturas.length) {
                this.listaDeAsignaturas = nuevaLista; // Actualizamos la lista
                console.log(`${asignatura.nombre} ha sido quitada.`);
            } else {
                console.warn(`${asignatura.nombre} no se encuentra en la lista.`); // Mensaje de advertencia si no existe
            }
        } catch (error) {
            console.error("Error al quitar asignatura:", error.message); // Manejo de errores
        }
    }

 
}
