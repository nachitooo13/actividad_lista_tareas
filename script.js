// Lista de tareas
const tareas = [];

// Función para agregar una nueva tarea a la lista
function agregarTarea() {
    const nuevaTareaInput = document.getElementById("nuevaTarea");
    const tareaTexto = nuevaTareaInput.value.trim();

    if (tareaTexto !== "") {
        tareas.push({ texto: tareaTexto, completada: false });
        actualizarListaTareas();
        nuevaTareaInput.value = "";
    }
}

// Función para marcar o desmarcar una tarea como completada
function marcarTareaCompleta(index) {
    tareas[index].completada = !tareas[index].completada;
    actualizarListaTareas();
}

// Función para mostrar todas las tareas
function mostrarTodasLasTareas() {
    const listaTareas = document.getElementById("listaTareas");
    listaTareas.innerHTML = "";

    for (let i = 0; i < tareas.length; i++) {
        const tareaElemento = document.createElement("li");
        tareaElemento.textContent = tareas[i].texto;

        if (tareas[i].completada) {
            tareaElemento.classList.add("completed");
        }

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "delete";
        botonEliminar.onclick = function () {
            tareas.splice(i, 1);
            actualizarListaTareas();
        };

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tareas[i].completada;
        checkbox.onclick = function () {
            marcarTareaCompleta(i);
        };

        tareaElemento.appendChild(checkbox);
        tareaElemento.appendChild(botonEliminar);
        listaTareas.appendChild(tareaElemento);
    }
}

// Función para mostrar tareas completadas
function mostrarCompletadas() {
    const tareasCompletadas = tareas.filter(tarea => tarea.completada === true);
    const listaTareas = document.getElementById("listaTareas");
    listaTareas.innerHTML = "";

    for (let i = 0; i < tareasCompletadas.length; i++) {
        const tareaElemento = document.createElement("li");
        tareaElemento.textContent = tareasCompletadas[i].texto;
        tareaElemento.classList.add("completed");

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "delete";
        botonEliminar.onclick = function () {
            const index = tareas.findIndex(tarea => tarea.texto === tareasCompletadas[i].texto);
            tareas.splice(index, 1);
            actualizarListaTareas();
        };

        tareaElemento.appendChild(botonEliminar);
        listaTareas.appendChild(tareaElemento);
    }
}

// Función para mostrar tareas pendientes
function mostrarPendientes() {
    const tareasPendientes = tareas.filter(tarea => tarea.completada === false);
    const listaTareas = document.getElementById("listaTareas");
    listaTareas.innerHTML = "";

    for (let i = 0; i < tareasPendientes.length; i++) {
        const tareaElemento = document.createElement("li");
        tareaElemento.textContent = tareasPendientes[i].texto;

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "delete";
        botonEliminar.onclick = function () {
            const index = tareas.findIndex(tarea => tarea.texto === tareasPendientes[i].texto);
            tareas.splice(index, 1);
            actualizarListaTareas();
        };

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tareasPendientes[i].completada;
        checkbox.onclick = function () {
            marcarTareaCompleta(i);
        };

        tareaElemento.appendChild(checkbox);
        tareaElemento.appendChild(botonEliminar);
        listaTareas.appendChild(tareaElemento);
    }
}

// Agregar evento de clic al botón "Agregar"
document.getElementById("agregar").addEventListener("click", agregarTarea);

// Agregar eventos de clic a los botones "Mostrar Completadas", "Mostrar Pendientes" y "Mostrar Todas"
document.getElementById("mostrarCompletadas").addEventListener("click", mostrarCompletadas);
document.getElementById("mostrarPendientes").addEventListener("click", mostrarPendientes);
document.getElementById("mostrarTodas").addEventListener("click", mostrarTodasLasTareas);

// Inicializar la lista de tareas con el filtro "todas"
mostrarTodasLasTareas();

