

class Asignatura {
    #nombre;
    #calificaciones;
    constructor(nombre) {
        if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\sIVXLCDM]+$/.test(nombre)) {
            this.#nombre = nombre; // Validar: letras, números romanos, espacios
        }

        this.#calificaciones = []; // Lista de números entre 0 y 10
    }

    // Getter y Setter para el nombre
    get nombre() {
        return this.#nombre;
    }
    set nombre(valor) {
        if (/^[A-Za-zñÑáéíóúÁÉÍÓÚüÜ\sIVXLCDM]+$/.test(valor)) {  // Letras, números romanos y espacios
            this.#nombre = valor;
        } else {
            console.error("Nombre de la asignatura inválido.");
        }
    }

    // Getter y Setter para las calificaciones
    get calificaciones() {
        return this.#calificaciones;
    }
    set calificaciones(valor) {
        if (Array.isArray(valor)) {
            this.#calificaciones = valor;
        } else {
            console.error("Las calificaciones deben ser un array.");
        }
    }


    promedioAsig() {
        if (this.#calificaciones.length > 0) {
            let cantidadCali = this.#calificaciones.length;
            let sumaCali = 0;
            this.#calificaciones.forEach(calificacion => {
                sumaCali += calificacion;
            });
            return cantidadCali / sumaCali;
        } else {
            console.log("No hay calificaciones")
        }
    }

}

class Asignaturas {
    constructor() {
        this.listaDeAsignaturas = []; // Inicializamos la lista de asignaturas como un array vacío
    }

    // Método para agregar una asignatura
    agregarAsignatura(asignatura) {
        // Verificar si la asignatura ya está en la lista
        if (!this.listaDeAsignaturas.includes(asignatura)) {
            this.listaDeAsignaturas.push(asignatura);
            console.log(`${asignatura.nombre} ha sido agregada.`);
        } else {
            console.log(`${asignatura.nombre} ya está en la lista.`);
        }
    }

    // Método para quitar una asignatura usando filter
    quitarAsignatura(asignatura) {
        // Usamos filter para crear una nueva lista sin la asignatura a eliminar
        let nuevaLista = this.listaDeAsignaturas.filter(a => a !== asignatura);

        // Si la nueva lista tiene la misma longitud, significa que no se eliminó nada
        if (nuevaLista.length !== this.listaDeAsignaturas.length) {
            this.listaDeAsignaturas = nuevaLista; // Actualizamos la lista
            console.log(`${asignatura.nombre} ha sido quitada.`);
        } else {
            console.log(`${asignatura.nombre} no se encuentra en la lista.`);
        }
    }
}


class Direccion {
    constructor(calle, numero, piso, codigoPostal, provincia, localidad) {
        this.calle = calle;
        this.numero = numero;
        this.piso = piso;
        this.codigoPostal = codigoPostal;
        this.provincia = provincia;
        this.localidad = localidad;
    }

    toString() {
        return `${this.calle} ${this.numero}, Piso ${this.piso}, ${this.codigoPostal} ${this.localidad}, ${this.provincia}`;
    }


};

// Clase base Persona para compartir atributos comunes entre estudiantes
class Persona {
    #nombre;
    #edad;

    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    get nombre() {
        return this.#nombre;
    }

    set nombre(valor) {
        let patron = new RegExp(/^[A-Za-záéíóúÁÉÍÓÚüÜ\s]+$/);
        if (patron.test(valor)) {  // Solo letras y espacios
            this.#nombre = valor;
        } else {
            console.error("Nombre inválido. Solo se permiten letras y espacios.");
        }
    }

    get edad() {
        return this.#edad;
    }

    set edad(valor) {
        if (valor > 0) {
            this.#edad = valor;
        } else {
            console.error("Edad inválida.");
        }
    }
}

// Clase Estudiante hereda de Persona
class Estudiante extends Persona {
    #id;
    #direccion;
    #asignaturas;

    constructor(id, nombre, edad, direccion) {
        super(nombre, edad);  // Llamamos al constructor de la clase Persona para gestionar nombre y edad
        this.#id = id;
        this.#direccion = direccion;
        this.#asignaturas = [];
    }


    // Getter y Setter para el id
    get id() {
        return this.#id;
    }
    set id(valor) {
        if (typeof valor === 'number' && valor > 0) {
            this.#id = valor;
        } else {
            console.error("ID inválido.");
        }
    }

  
    

    // Getter y Setter para la dirección
    get direccion() {
        return this.#direccion;
    }

    // Getter y Setter para asignaturas
    get asignaturas() {
        return this.#asignaturas;
    }

   

    // Métodos
    matricular(...asignaturas) {
        asignaturas.forEach(asignatura => {
            if (!this.#asignaturas.includes(asignatura)) {
                this.#asignaturas.push(asignatura);
                let fechaMatri = new Date();
                console.log("Fecha de matrícula: " + fechaMatri.toLocaleDateString('es-ES'));
                console.log(asignatura.nombre + " ha sido matriculada.");
            } else {
                console.log("Ya está matriculado en la asignatura " + asignatura.nombre);
            }
        });
    }

    desmatricular(...asignaturas) {
        asignaturas.forEach(asignatura => {
            let nuevaLista = this.#asignaturas.filter(a => a.nombre !== asignatura.nombre);
            if (nuevaLista.length !== this.#asignaturas.length) {
                this.#asignaturas = nuevaLista;
                const fechaMatri = new Date().toLocaleDateString('es-ES');
                console.log("Fecha de desmatrícula: " + fechaMatri);
                console.log(asignatura.nombre + " ha sido desmatriculada.");
            } else {
                console.log(asignatura.nombre + " no está matriculada.");
            }
        });
    }

    agregarCalificacion(asignaturaNombre, ...calificaciones) {
        // Validar todas las calificaciones antes de agregarlas
        calificaciones.forEach(calificacion => {
            if (!Number.isInteger(calificacion) || calificacion < 0 || calificacion > 10) {
                console.log("La calificación debe ser un número entero entre 0 y 10.");
            }
        });

        // Buscar la asignatura
        let comprobacion = this.#asignaturas.find(a => a.nombre === asignaturaNombre);
        if (comprobacion) {
            // Agregar todas las calificaciones válidas a la asignatura
            comprobacion.calificaciones.push(...calificaciones);
            console.log("Calificaciones agregadas a " + asignaturaNombre + ".");
        } else {
            console.log(asignaturaNombre + " no está matriculada.");
        }
    }

    calcularPromedio() {
        let totalCalificaciones = 0;
        let cantidadCalificaciones = 0;

        // Iteramos sobre cada asignatura
        this.#asignaturas.forEach(asignatura => {
            // Iteramos sobre las calificaciones de la asignatura
            asignatura.calificaciones.forEach(calificacion => {
                totalCalificaciones += calificacion; // Sumamos las calificaciones
                cantidadCalificaciones++; // Contamos la cantidad de calificaciones
            });
        });

        if (cantidadCalificaciones > 0) {
            return totalCalificaciones / cantidadCalificaciones;
        } else {
            console.log("No tienes ninguna calificación.");
        }
    }
    // Busca el patron de la asignatura
    buscarPatronAsignatura(patron) {
        let busqueda = this.#asignaturas.filter(asig => asig.nombre.toLowerCase().includes(patron.toLowerCase()));
        if (busqueda.length > 0) {
            console.log("Asignaturas que coinciden con el patrón '" + patron + "':");
            busqueda.forEach(asignatura => {
                console.log(asignatura.nombre);
            });
        } else {
            console.log("Búsqueda fallida.");
        }
    }
}


class listaEstudiante {
    constructor() {
        this.estudiantes = []; // Lista de objetos Estudiante
    }

    agregarEstudiante(estudiante) {
        for (let e of this.estudiantes) {
            if (e.id === estudiante.id) {
                console.log(`El estudiante con ID ${estudiante.id} ya está en la lista.`);
                return;
            }
        }
        this.estudiantes.push(estudiante);
        console.log(`Estudiante ${estudiante.nombre} agregado.`);
    }

    eliminarEstudiante(estudiante) {
        for (let e of this.estudiantes) {
            if (e.id === estudiante.id) {
                this.estudiantes = this.estudiantes.filter(e => e.id !== estudiante.id)
                console.log(" Estudiante eliminado");
            } else {
                console.log("El estudiante" + estudiante.nombre + " no existe")
            }
        }
    }

    buscarEstudiantePorNombre(patron) {
        // Buscar estudiantes que coincidan con el patrón
        let busqueda = this.estudiantes.filter(e => e.nombre.toLowerCase().includes(patron.toLowerCase()));
        if (busqueda.length > 0) {
            console.log("Estudiantes que coinciden con el patron" + patron)
            busqueda.forEach(asignatura => {
                console.log(asignatura);
            })
        } else {
            console.log("Busqueda fallida");
        }
    }



    calcularPromedioGeneral() {
        let totalPromedio = 0;
        let cantidadEstudiantes = this.estudiantes.length;
        if (cantidadEstudiantes > 0) {
            this.estudiantes.forEach(estudiante => {
                totalPromedio += estudiante.calcularPromedio();
            })
        } else {

            console.log("No hay estudiantes")
        }

        return (cantidadEstudiantes / totalPromedio);
    }



    generarReporte() {
        console.log("Reporte de Estudiantes:");
        this.estudiantes.forEach(est => {
            console.log(` Estudiante: ${est.nombre} (ID: ${est.id})`);
            est.asignaturas.forEach(asig => {
                console.log(`   Asignatura: ${asig.nombre}`);
                console.log(`     Calificaciones: ${asig.calificaciones.join(", ")}`);
                console.log(`     Promedio: ${asig.promedioAsig()}`);
            });
        });
    }

    listarEstudiante() {
        console.log("Lista de estudiantes");
        this.estudiantes.forEach(estudiante => {
            console.log("Nombre: " + estudiante.nombre + "id: " + estudiante.id + "Edad : " + estudiante.id)
        })
    }


    listaDeAsignaturasXestudiante() {
        console.log("Lista de estudiantes por asignatura");
        this.estudiantes.forEach(est => {
            console.log(" Estudiante : " + est.nombre)
            est.asignaturas.forEach(asig => {
                console.log("Asignatura : " + asig.nombre);
            })
        })
    }

    calificacionesYpromedioAsig() {
        console.log("Calificaciones y Promedios por Asignatura:");
        this.estudiantes.forEach(est => {
            console.log("Estudiante" + est.nombre);
            est.asignaturas.forEach(asig => {
                console.log("Asignatura : "+ asig.nombre)
                console.log("calificaciones : " + asig.calificaciones.join(","));
                console.log("Promedio :" + asig.promedioAsig());
            })
        })
    }

}


// Menú interactivo
function mostrarMenu() {
    let opcion = prompt(`
        Menú:
        1. Crear estudiante
        2. Crear asignatura
        3. Matricular estudiante en asignatura
        4. Desmatricular estudiante de asignatura
        5. Agregar calificación a asignatura
        6. Ver promedio de estudiante
        7. Buscar asignaturas por nombre
        8. Buscar estudiantes por nombre
        9. Ver lista de estudiantes
        10. Ver reporte de estudiantes
        11. Ver lista de estudiantes por asignatura
        12. Ver calificaciones y promedios por asignatura
        13. Promedio general
        14. Eliminar estudiante
        15. Eliminar asignatura
        16. Salir
    `);

    switch (opcion) {
        case '1':
            crearEstudiante();
            break;
        case '2':
            crearAsignatura();
            break;
        case '3':
            matricularEstudiante();
            break;
        case '4':
            desmatricularEstudiante();
            break;
        case '5':
            agregarCalificacion();
            break;
        case '6':
            verPromedioEstudiante();
            break;
        case '7':
            buscarAsignaturas();
            break;
        case '8':
            buscarEstudiantes();
            break;
        case '9':
            verListaEstudiantes();
            break;
        case '10':
            verReporteEstudiantes();
            break;
        case '11':
            listaDeAsignaturasPorestudiante();
            break;
        case '12':
            calificacionesYpromedioAsignatura();
            break;
        case '13':
            PromedioGeneral();
            break;
        case '14':
            eliminarEs();
            break;
        case '15':
            eliminarA();
            break;
        case '16':
            console.log("Saliendo...");
            break;
        default:
            console.log("Opción no válida.");
            mostrarMenu();
            break;
    }
}

// Crear un estudiante
function crearEstudiante() {
    let id = prompt("Ingresa el ID del estudiante:");
    let nombre = prompt("Ingresa el nombre del estudiante:");
    let edad = prompt("Ingresa la edad del estudiante:");
    let calle = prompt("Ingresa la calle:");
    let numero = prompt("Ingresa el número de la dirección:");
    let piso = prompt("Ingresa el piso de la dirección:");
    let codigoPostal = prompt("Ingresa el código postal:");
    let provincia = prompt("Ingresa la provincia:");
    let localidad = prompt("Ingresa la localidad:");

    let direccion = new Direccion(calle, numero, piso, codigoPostal, provincia, localidad);
    let estudiante = new Estudiante(id, nombre, edad, direccion.toString());
    
    listaEstudiantes.agregarEstudiante(estudiante);
    mostrarMenu();
}

// Crear una asignatura
function crearAsignatura() {
    let nombre = prompt("Ingresa el nombre de la asignatura:");
    let asignatura = new Asignatura(nombre);
    asignaturas.agregarAsignatura(asignatura);
    mostrarMenu();
}

// Matricular un estudiante en una asignatura
function matricularEstudiante() {
    let idEstudiante = prompt("Ingresa el ID del estudiante:");
    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    
    if (estudiante) {
        let nombreAsignatura = prompt("Ingresa el nombre de la asignatura:");
        let asignatura = asignaturas.listaDeAsignaturas.find(a => a.nombre === nombreAsignatura);
        
        if (asignatura) {
            estudiante.matricular(asignatura);
        } else {
            console.log("Asignatura no encontrada.");
        }
    } else {
        console.log("Estudiante no encontrado.");
    }
    mostrarMenu();
}

// Desmatricular un estudiante de una asignatura
function desmatricularEstudiante() {
    let idEstudiante = prompt("Ingresa el ID del estudiante:");
    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    
    if (estudiante) {
        let nombreAsignatura = prompt("Ingresa el nombre de la asignatura:");
        let asignatura = estudiante.asignaturas.find(a => a.nombre === nombreAsignatura);
        
        if (asignatura) {
            estudiante.desmatricular(asignatura);
        } else {
            console.log("El estudiante no está matriculado en esta asignatura.");
        }
    } else {
        console.log("Estudiante no encontrado.");
    }
    mostrarMenu();
}

// Agregar calificación a una asignatura
function agregarCalificacion() {
    let idEstudiante = prompt("Ingresa el ID del estudiante:");
    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    
    if (estudiante) {
        let nombreAsignatura = prompt("Ingresa el nombre de la asignatura:");
        let asignatura = estudiante.asignaturas.find(a => a.nombre === nombreAsignatura);
        
        if (asignatura) {
            let calificaciones = prompt("Ingresa las calificaciones separadas por coma:").split(',');
            estudiante.agregarCalificacion(nombreAsignatura, ...calificaciones);
        } else {
            console.log("El estudiante no está matriculado en esta asignatura.");
        }
    } else {
        console.log("Estudiante no encontrado.");
    }
    mostrarMenu();
}

// Ver el promedio de un estudiante
function verPromedioEstudiante() {
    let idEstudiante = prompt("Ingresa el ID del estudiante:");
    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    
    if (estudiante) {
        console.log(`El promedio de ${estudiante.nombre} es: ${estudiante.calcularPromedio()}`);
    } else {
        console.log("Estudiante no encontrado.");
    }
    mostrarMenu();
}

// Buscar asignaturas por nombre
function buscarAsignaturas() {
    let patron = prompt("Ingresa el patrón para buscar asignaturas:");
    let idEstudiante = prompt("Ingresa el ID del estudiante:");

    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante); // Buscar estudiante por ID
    if (estudiante) {
        estudiante.buscarPatronAsignatura(patron);  // Usamos el método para buscar asignaturas por nombre
    } else {
        console.log("Estudiante no encontrado.");
    }
    mostrarMenu();  // Regresamos al menú
}


// Buscar estudiantes por nombre
function buscarEstudiantes() {
    let patron = prompt("Ingresa el patrón para buscar estudiantes:");
    listaEstudiantes.buscarEstudiantePorNombre(patron);  // Llamamos al método para buscar por nombre
    mostrarMenu();  // Regresamos al menú principal
}


// Ver lista de estudiantes
function verListaEstudiantes() {
    listaEstudiantes.listarEstudiante();
    mostrarMenu();
}

function listaDeAsignaturasPorestudiante(){
    listaEstudiantes.listaDeAsignaturasXestudiante();
    mostrarMenu();
}

function listaDeAsignaturasPorestudiante(){
    listaEstudiantes.listaDeAsignaturasXestudiante();
    mostrarMenu();
}

function calificacionesYpromedioAsignatura(){
    listaEstudiantes.calificacionesYpromedioAsig();
    mostrarMenu();
}
// Ver reporte de estudiantes
function verReporteEstudiantes() {
    listaEstudiantes.generarReporte();
    mostrarMenu();
}

function PromedioGeneral(){
    listaEstudiantes.calcularPromedioGeneral();
    mostrarMenu();
}

function eliminarEs(){
    let idEstudiante = prompt("Ingresa el ID del estudiante a eliminar:");
    let estudiante = listaEstudiantes.estudiantes.find(e => e.id == idEstudiante);
    if(estudiante){
        listaEstudiantes.eliminarEstudiante(estudiante);
    }
    
    mostrarMenu();
}

function eliminarA(){
    let asig = prompt("Dime la asignatura a eliminar")
    let nombreA = asignaturas.listaDeAsignaturas.find(a => a.nombre == asig)
    asignaturas.quitarAsignatura(nombreA);
    mostrarMenu();
}

// Crear las instancias necesarias para probar el código
let asignaturas = new Asignaturas();
let listaEstudiantes = new listaEstudiante();
mostrarMenu();
