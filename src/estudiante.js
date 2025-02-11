/**
 * # Clase Estudiante
 * 
 * Representa un estudiante que hereda las propiedades y métodos de la clase `Persona`.
 * Permite gestionar datos como dirección, asignaturas, calificaciones, entre otros.
 */
import { Persona } from './persona.js';
import { Asignatura } from './asignatura.js';

export class Estudiante extends Persona {
    #id;
    #direccion;
    #asignaturas;

    /**
     * ## Constructor de la clase Estudiante
     * 
     * Inicializa un nuevo objeto `Estudiante`.
     * 
     * @param {number} id - ID del estudiante.
     * @param {string} nombre - Nombre del estudiante.
     * @param {number} edad - Edad del estudiante.
     * @param {Direccion} direccion - Dirección del estudiante.
     */
    constructor(id, nombre, edad, direccion) {
        try {
            super(nombre, edad); // Invocamos al constructor de la clase base (Persona)
            this.id = id; // ID único del estudiante
            this.#direccion = direccion; // Dirección del estudiante
            this.#asignaturas = []; // Lista de asignaturas matriculadas
        } catch (error) {
            console.error("Error al crear estudiante:", error.message);
        }
    }

    /**
     * ## Getter: Obtiene el ID del estudiante.
     * @returns {number} - El ID del estudiante.
     */
    get id() {
        return this.#id;
    }

    /**
     * ## Setter: Asigna el ID del estudiante.
     * @param {number} valor - Nuevo ID.
     */
    set id(valor) {
        try {
            if (typeof valor === 'number' && valor > 0) {
                this.#id = valor;
            } else {
                throw new Error("ID inválido.");
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    /**
     * ## Getter: Obtiene la dirección del estudiante.
     * @returns {Direccion} - Dirección del estudiante.
     */
    get direccion() {
        return this.#direccion;
    }

    /**
     * ## Getter: Obtiene las asignaturas del estudiante.
     * @returns {Asignatura[]} - Lista de asignaturas.
     */
    get asignaturas() {
        return this.#asignaturas;
    }

    /**
     * ## Método: Representación en cadena del estudiante.
     * 
     * Genera una descripción del estudiante, incluyendo su ID, nombre, edad, dirección y asignaturas matriculadas.
     * 
     * @returns {string} - Información detallada del estudiante.
     */
    toString() {
        try {
            let asig = this.#asignaturas.map(asignatura => asignatura.nombre).join(", ");
            return `Estudiante: 
                ID: ${this.#id}
                Nombre: ${this.nombre}
                Edad: ${this.edad}
                Dirección: ${this.#direccion.toString()}
                Asignaturas: ${asig}`;
        } catch (error) {
            console.error("Error al generar descripción del estudiante:", error.message);
            return "Información no disponible";
        }
    }


     /**
     * ## Método: Matricular asignaturas
     * 
     * Matricula al estudiante en una o más asignaturas. Asegura que cada estudiante tenga su propia instancia de la asignatura.
     * 
     * @param {...Asignatura} asignaturas - Asignaturas a matricular.
     */
     matricular(...asignaturas) {
        try {
            asignaturas.forEach(asignatura => {
                // Clonamos la asignatura para asegurarnos de que sea única por estudiante
                let nuevaAsignatura = new Asignatura(asignatura.nombre); // Crea una nueva instancia de la asignatura
                // Aquí también podemos copiar las calificaciones si es necesario
                nuevaAsignatura.calificaciones = [...asignatura.calificaciones];
                
                if (!this.#asignaturas.includes(nuevaAsignatura)) {
                    this.#asignaturas.push(nuevaAsignatura);
                    console.log(`Asignatura "${nuevaAsignatura.nombre}" matriculada.`);
                } else {
                    console.log(`El estudiante ya está matriculado en "${nuevaAsignatura.nombre}".`);
                }
            });
        } catch (error) {
            console.error("Error al matricular asignaturas:", error.message);
        }
    }

    /**
     * ## Método: Desmatricular asignaturas
     * 
     * Desmatricula al estudiante de una o más asignaturas.
     * 
     * @param {...Asignatura} asignaturas - Asignaturas a desmatricular.
     */
    desmatricular(...asignaturas) {
        try {
            asignaturas.forEach(asignatura => {
                let nuevaLista = this.#asignaturas.filter(a => a.nombre !== asignatura.nombre);
                if (nuevaLista.length !== this.#asignaturas.length) {
                    this.#asignaturas = nuevaLista;
                    console.log(`Asignatura "${asignatura.nombre}" desmatriculada.`);
                } else {
                    console.log(`El estudiante no está matriculado en "${asignatura.nombre}".`);
                }
            });
        } catch (error) {
            console.error("Error al desmatricular asignaturas:", error.message);
        }
    }

    /**
     * ## Método: Agregar calificaciones
     * 
     * Agrega una o más calificaciones a una asignatura matriculada.
     * 
     * @param {string} asignaturaNombre - Nombre de la asignatura.
     * @param {...number} calificaciones - Calificaciones a agregar (entre 0 y 10).
     */
    agregarCalificacion(asignaturaNombre, ...calificaciones) {
        try {
            calificaciones.forEach(calificacion => {
                if (calificacion < 0 || calificacion > 10) {
                    throw new Error("La calificación debe ser un número entre 0 y 10.");
                }
            });

            let asignatura = this.#asignaturas.find(a => a.nombre === asignaturaNombre);
            if (asignatura) {
                asignatura.calificaciones.push(...calificaciones);
                console.log(`Calificaciones agregadas a "${asignaturaNombre}".`);
            } else {
                console.log(`Asignatura "${asignaturaNombre}" no encontrada.`);
            }
        } catch (error) {
            console.error("Error al agregar calificaciones:", error.message);
        }
    }

    /**
 * Calcula el promedio de calificaciones de todas las asignaturas de un estudiante.
 * 
 * @returns {number|null} El promedio de las calificaciones o null si no hay calificaciones.
 */
calcularPromedio() {
    let totalCalificaciones = 0;
    let cantidadCalificaciones = 0;

    // Asegurarse de que #asignaturas existe y tiene asignaturas
    if (!this.#asignaturas || this.#asignaturas.length === 0) {
        console.error("El estudiante no tiene asignaturas.");
        return null;
    }

    // Sumar todas las calificaciones de las asignaturas
    this.#asignaturas.forEach(asignatura => {
        if (asignatura.calificaciones && asignatura.calificaciones.length > 0) {
            asignatura.calificaciones.forEach(calificacion => {
                totalCalificaciones += calificacion;
                cantidadCalificaciones++;
            });
        }
    });

    // Si no hay calificaciones, retornar un mensaje de error
    if (cantidadCalificaciones === 0) {
        console.error("No hay calificaciones para calcular el promedio.");
        return null;
    }

    // Retornar el promedio de calificaciones
    return totalCalificaciones / cantidadCalificaciones;
}


    /**
     * ## Método: Buscar asignaturas
     * 
     * Busca asignaturas matriculadas que coincidan con un patrón.
     * 
     * @param {string} patron - Patrón de búsqueda.
     */
    buscarPatronAsignatura(patron) {
        try {
            let resultados = this.#asignaturas.filter(asig => asig.nombre.toLowerCase().includes(patron.toLowerCase()));
            if (resultados.length > 0) {
                console.log(`Asignaturas que coinciden con '${patron}':`);
                resultados.forEach(asignatura => console.log(asignatura.nombre));
            } else {
                console.log(`No se encontraron asignaturas que coincidan con '${patron}'.`);
            }
        } catch (error) {
            console.error("Error al buscar asignaturas:", error.message);
        }
    }

    /**
 * Muestra el promedio de un estudiante dado su ID.
 * @function
 */
verPromedioEstudiante() {
    let idEstudiante = prompt("Ingresa el ID del estudiante:");
    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    
    if (estudiante) {
        console.log(`El promedio de ${estudiante.nombre} es: ${estudiante.calcularPromedio()}`);
    } else {
        console.log("Estudiante no encontrado.");
    }
    
}

/**
 * Elimina un estudiante basado en su ID.
 * @function
 */
 eliminarEs() {
    let idEstudiante = prompt("Ingresa el ID del estudiante a eliminar:");
    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    if(estudiante) {
        listaEstudiantes.eliminarEstudiante(estudiante);
    }
    
}
}
