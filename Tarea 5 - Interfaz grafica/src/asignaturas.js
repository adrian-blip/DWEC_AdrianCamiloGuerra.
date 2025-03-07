
import { Asignatura } from './asignatura.js';
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
        this.cargarAsignaturas(); // Cargar datos de asignaturas al iniciar
        this.mostrarAsignaturas();
    }
    cargarAsignaturas() {
        const asignaturasJSON = localStorage.getItem('asignaturas');
        if (asignaturasJSON) {
            this.listaDeAsignaturas = JSON.parse(asignaturasJSON).map(asignaturaData =>
                new Asignatura(
                    asignaturaData.nombre,
                    asignaturaData.calificaciones || [] // Asegurar que las calificaciones existan
                )
            );
        }
    }
    

      /**
     * Carga las asignaturas desde el localStorage.
     */
      

    /**
     * Guarda las asignaturas en localStorage.
     */
    guardarEnLocalStorage() {
          localStorage.setItem("asignaturas", JSON.stringify(this.obtenerListaAsignaturas()));
            
    }
    
    obtenerListaAsignaturas() {
        return this.listaDeAsignaturas.map(asignatura => asignatura.toString()); // Se usa el toString() corregido
    }
    

    /**
     * Muestra las asignaturas en la página.
     */
    mostrarAsignaturas() {
        let tabla = document.getElementById("listaAsignaturas");
        tabla.innerHTML = ""; // Limpiar la tabla antes de mostrar nuevos datos

        this.listaDeAsignaturas.forEach(asig => {
            let fila = `<tr>
                            <td>${asig.nombre}</td>
                        </tr>`;
            tabla.innerHTML += fila;
        });
    }


/**
 * Crea una nueva asignatura con el nombre proporcionado por el usuario.
 * @function
 */
        crearAsignatura() {
            // Obtener valor del formulario
            let nombre = document.getElementById("nombreAsignatura").value.trim();
    
            // Validación
            if (!nombre) {
                mostrarMensaje("El nombre de la asignatura es obligatorio.");
                return;
            }
    
            // Crear objeto Asignatura y agregarlo a la lista
            let asignatura = new Asignatura(nombre);
            this.agregarAsignatura(asignatura);
    
         
            // Guardar en localStorage
            this.guardarEnLocalStorage();

            

            // Limpiar el formulario
            document.getElementById("crearAsignatura").reset();

            // Actualizar la vista
            this.mostrarAsignaturas();
    
            
            document.getElementById("crearAsignatura").reset();
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
                this.guardarEnLocalStorage();
                
                console.log(`${asignatura.nombre} ha sido agregada.`);
            } else {
                console.log(`${asignatura.nombre} ya está en la lista.`); // Mensaje de advertencia si ya existe
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
    quitarAsignatura() {
        try {
            let input = document.getElementById('nombreAsignaturaE');
            if (!input) return;  // Si el input no existe, salimos
    
            let asigNombre = input.value.trim().toLowerCase();
            if (!asigNombre) return; // Si el usuario no ingresó nada, salimos
    
            // Buscar la asignatura en la lista
            const asignaturaIndex = this.listaDeAsignaturas.findIndex(a => a.nombre.trim().toLowerCase() === asigNombre);
    
            if (asignaturaIndex !== -1) {
                this.listaDeAsignaturas.splice(asignaturaIndex, 1); // Eliminar la asignatura
                this.guardarEnLocalStorage(); // Guardar en localStorage usando tu función existente
                this.mostrarAsignaturas(); // Refrescar la lista en pantalla
    
            }
        } catch (error) {
            console.error("Error al quitar asignatura:", error.message);
        }
    }
    
    
    
    
    
    


    /**
     * ## Método: Buscar asignaturas
     * 
     * Busca asignaturas matriculadas que coincidan con un patrón.
     * 
     * @param {string} patron - Patrón de búsqueda.
     */
    buscarPatronAsignatura() {
        // Obtener el input del usuario
        let patron = document.getElementById("inputPatronAsignatura").value.trim().toLowerCase();
        let resultadoAsignaturas = document.getElementById("resultadoAsignaturas");
    
        resultadoAsignaturas.innerHTML = ""; // Limpiar resultados anteriores
    
        if (!patron) {
            resultadoAsignaturas.innerHTML = "<p>Por favor, ingresa un patrón de búsqueda.</p>";
            return;
        }
    
        console.log("Patrón ingresado:", patron);
        console.log("Lista actual de asignaturas:", this.listaDeAsignaturas);
    
        if (!Array.isArray(this.listaDeAsignaturas) || this.listaDeAsignaturas.length === 0) {
            resultadoAsignaturas.innerHTML = "<p>No hay asignaturas registradas.</p>";
            return;
        }
    
        let resultados = this.listaDeAsignaturas.filter(asig => 
            asig.nombre && asig.nombre.toLowerCase().includes(patron)
        );
    
        if (resultados.length > 0) {
            resultadoAsignaturas.innerHTML = "<strong>Asignaturas encontradas:</strong><ul>";
            resultados.forEach(asignatura => {
                resultadoAsignaturas.innerHTML += `<li>${asignatura.nombre}</li>`;
                console.log("Asignatura encontrada:", asignatura.nombre);
            });
            resultadoAsignaturas.innerHTML += "</ul>";
        } else {
            resultadoAsignaturas.innerHTML = "<p>No se encontraron asignaturas con ese patrón.</p>";
        }
    }
    

}
