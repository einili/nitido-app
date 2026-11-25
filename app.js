console.log("¡JavaScript está funcionando!");

// 1. Referencias del DOM
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const reiniciarBtn = document.getElementById("reiniciar");
const cuentaAtrasEl = document.getElementById("countdown");
const sliderEl = document.getElementById("slider");
const valorSliderEl = document.getElementById("valor-slider");



// 2. Variables de estado
let tiempoRestante = 25;
let tiempo = tiempoRestante * 60;
let intervalo = null;
let estaCorriendo = false;


// 3. Funciones
function actualizarTiempo() {

  if (tiempo <= 0) {
    clearInterval(intervalo);
    intervalo = null;
    estaCorriendo = false;
    tiempo = 0;
    cuentaAtrasEl.textContent = "00:00";
    document.title = "NitidoApp — Pomodoro";
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

// 4. Eventos
playBtn.addEventListener("click", iniciarTemporizador);
pauseBtn.addEventListener("click", pausarTemporizador);
reiniciarBtn.addEventListener("click", reiniciarTemporizador);
sliderEl.addEventListener("input", cambiarTiempo);
