// 1. Referencias del DOM
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const reiniciarBtn = document.getElementById("reiniciar");
const cuentaAtrasEl = document.getElementById("countdown");

// 2. Variables de estado
let tiempoRestante = 25;
let tiempo = tiempoRestante * 60;
let intervalo = null;
let estaCorriendo = false;

// 3. Funciones
function actualizarTiempo() {
  const minutos = Math.floor(tiempo / 60);
  let segundos = tiempo % 60;

  // Representación visual con dos dígitos
  if (segundos < 10) {
    segundos = "0" + segundos;
  }

  cuentaAtrasEl.innerHTML = `${minutos} : ${segundos}`;
  tiempo--;

  // Freno automático al llegar a cero
  if (tiempo < 0) {
    clearInterval(intervalo);
    estaCorriendo = false;
  }
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

function reiniciarTemporizador()
{
  clearInterval(intervalo);
  estaCorriendo = false;
  tiempo = tiempoRestante * 60;
  cuentaAtrasEl.innerHTML = `${tiempoRestante} : 00`;
}

// 4. Eventos
playBtn.addEventListener("click", iniciarTemporizador);
pauseBtn.addEventListener("click", pausarTemporizador);
reiniciarBtn.addEventListener("click", reiniciarTemporizador);
