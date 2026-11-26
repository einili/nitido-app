// 1. Referencias del DOM
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const reiniciarBtn = document.getElementById("reiniciar");
const cuentaAtrasEl = document.getElementById("countdown");
const sliderEl = document.getElementById("slider");
const valorSliderEl = document.getElementById("valor-slider");
const tareaInputNombreEl = document.getElementById("task-name");
const tareaBtnEl = document.getElementById("task-send");
const tareaActualEl = document.getElementById("current-task");
const tareaFormEl = document.getElementById("task-form");
const historialListaEl = document.getElementById("history-list");



// 2. Variables de estado
let tiempoRestante = 25;
let tiempo = tiempoRestante * 60;
let intervalo = null;
let estaCorriendo = false;
let tareaActual = "Sin tarea asignada";

let historial = [];
const datosGuardados = localStorage.getItem("nitido_historial");
if (datosGuardados !== null) {
  historial = JSON.parse(datosGuardados);
}


// 3. Funciones
function actualizarTiempo() {

  if (tiempo <= 0) {
    clearInterval(intervalo);
    intervalo = null;
    estaCorriendo = false;
    tiempo = 0;
    cuentaAtrasEl.textContent = "00:00";
    document.title = "NitidoApp — Pomodoro";
    guardarSesion();
    return;
  }

  tiempo--;

  let minutos = Math.floor(tiempo / 60);
  let segundos = tiempo % 60;

  minutos = String(minutos).padStart(2, "0");
  segundos = String(segundos).padStart(2, "0");

  cuentaAtrasEl.textContent = `${minutos}:${segundos}`;
  document.title = `${minutos}:${segundos} — NitidoApp`;
}

function iniciarTemporizador() {
  // Si ya está corriendo, salimos para no crear otro intervalo
  if (estaCorriendo === true) {
    return;
  }

  estaCorriendo = true;
  intervalo = setInterval(actualizarTiempo, 1000);
}

function pausarTemporizador() {
  // Si ya está detenido, no hacemos nada
  if (estaCorriendo === false) {
    return;
  }

  clearInterval(intervalo);
  estaCorriendo = false;
}

function reiniciarTemporizador() {

  clearInterval(intervalo);
  intervalo = null;

  estaCorriendo = false;

  tiempo = tiempoRestante * 60;
  // tiempo = 3;

  let minutos = String(tiempoRestante).padStart(2, "0");

  cuentaAtrasEl.textContent = `${minutos}:00`;

  document.title = "NitidoApp — Pomodoro";
}

function cambiarTiempo()
{
  tiempoRestante = Number(sliderEl.value); // tome el valor del slider
  valorSliderEl.textContent = tiempoRestante;
  reiniciarTemporizador(); // ahora vuelve a iniciar la funcion con el nuevo valor seleccionado por el slider
}

function fijarTarea(event)
{
  event.preventDefault();
  let tareaNombreLimpio = tareaInputNombreEl.value.trim();
  if (tareaNombreLimpio === "")
  {
    return;
  }
  tareaActual = tareaNombreLimpio;
  tareaActualEl.textContent = `Tarea actual: ${tareaActual}`;
  tareaInputNombreEl.value = "";
}

function guardarSesion()
{
  let horaActual = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const fechaActual = new Date().toLocaleDateString("es-CL", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric" });
  const nuevaSesion = 
  {
    id: Date.now(),
    tarea: tareaActual,
    tiempo: tiempoRestante,
    hora: horaActual,
    fecha: fechaActual
  }
  historial.push(nuevaSesion);
  localStorage.setItem("nitido_historial", JSON.stringify(historial));
}

// function renderizarHistorial()
{
  
}


// 4. Eventos
playBtn.addEventListener("click", iniciarTemporizador);
pauseBtn.addEventListener("click", pausarTemporizador);
reiniciarBtn.addEventListener("click", reiniciarTemporizador);
sliderEl.addEventListener("input", cambiarTiempo);
tareaBtnEl.addEventListener("click", fijarTarea);
tareaFormEl.addEventListener("submit", fijarTarea);