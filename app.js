let palabrasPosibles = ["ahorcado"];

let palabra = "ahorcado";

let palabraAdivinada = "";

let intentosDisponibles = 5;

const divIntentos = document.getElementById("intentos");
const divPalabra = document.getElementById("palabra");
const btnEnviar = document.getElementById("enviar");
const letra = document.getElementById("letra");

btnEnviar.addEventListener("click", (event)=> {
    event.preventDefault();
    let letraElegida = letra.value;
    console.log(intentar(letraElegida));
    divPalabra.innerHTML = palabraAdivinada;
    divIntentos.innerHTML = intentosDisponibles;
    verificar();
})

function comenzarJuego() {
    palabraAdivinada = "-".repeat(palabra.length);
    divPalabra.innerHTML = palabraAdivinada;
    intentosDisponibles = 5;
    divIntentos.innerHTML = intentosDisponibles;
}

function intentar(letra) {
    let letrasEncontradas = 0;
    let string = Array.from(palabraAdivinada);
    for (let i = 0; i < palabra.length; i++) {
        if (letra === palabra[i]) {
            string[i] = letra;
            letrasEncontradas++;
        }
    }
    if (letrasEncontradas === 0) {
        intentosDisponibles--;
    }
    console.log(letrasEncontradas)
    
    palabraAdivinada = string.toString().replaceAll(',','');
}

function verificar() {
    if (palabraAdivinada === palabra) {
        alert("Ganaste!!!")
    } else if (intentosDisponibles === 0) {
        alert("Perdiste!!!")
    }
}

comenzarJuego();