let palabrasPosibles = ["ahorcado", "pizza", "camaron", "carniceria", "clasificacion", "ambiguedad", "transito", "caramelera", "anestesia", "programacion", "calefactor", "alicate", "pasteleria", "magnifico", "establecimiento", "infusion", "influencia", "marisco", "vertebrado", "acuatico", "heladera", "cartilago", "esperanza", "infierno", "television", "lenguaje", "imposible", "hortaliza", "sudoku", "esfuerzo", "autopista", "fotografia", "resplandor", "cartera", "montaña", "pelicula", "martillo", "bosquejo", "iguana", "competencia", "lasagna", "helado", "conducir", "electrico", "hospital", "zurdo"];

let palabra = "";

let palabraAdivinada = "";

let intentosDisponibles = 0;

const divPalabra = document.getElementById("palabra");
const btnEnviar = document.getElementById("enviar");
const letra = document.getElementById("letra");
const historial = document.getElementById("historial");
const mensaje = document.getElementById("mensaje");
const ahorcado = document.getElementById("ahorcado");
const btnReiniciar = document.getElementById("reiniciar");
const form = document.getElementById("form");

btnEnviar.addEventListener("click", (event)=> {
    event.preventDefault();
    let letraElegida = letra.value;
    console.log(intentar(letraElegida));
    divPalabra.innerHTML = palabraAdivinada;
    ahorcado.setAttribute("src", imagen(intentosDisponibles));
    letra.value = "";
    verificar();
    letra.focus();
});

btnReiniciar.addEventListener("click", comenzarJuego);


function comenzarJuego() {
    palabra = random(palabrasPosibles);
    palabraAdivinada = "_".repeat(palabra.length);
    divPalabra.innerHTML = palabraAdivinada;
    intentosDisponibles = 6;
    btnReiniciar.classList.add("oculto");
    form.classList.remove("oculto");
    mensaje.innerHTML = "";
    historial.innerHTML = "";
    ahorcado.setAttribute("src", imagen(intentosDisponibles));
    letra.focus();
}

function intentar(letra) {
    mensaje.innerHTML = "";
    let letrasEncontradas = 0;
    let string = Array.from(palabraAdivinada);

    if (!esLetra(letra)) {
        mensaje.innerHTML = "🚫 Solo se permiten letras"
        return
    }
    

    if (historial.innerHTML.includes(letra.toUpperCase()) || palabraAdivinada.includes(letra.toUpperCase())) {
        mensaje.innerHTML = "⛔ Esa letra ya fue utilizada"
        return
    }

    for (let i = 0; i < palabra.length; i++) {
        if (letra.toUpperCase() === palabra[i].toUpperCase()) {
            string[i] = letra;
            letrasEncontradas++;
        }
    }

    if (letrasEncontradas === 0) {
        historial.insertAdjacentText("beforeend",`${letra.toUpperCase()} `);
        intentosDisponibles--;
    }
    
    palabraAdivinada = string.toString().replaceAll(',','').toUpperCase();
}

function verificar() {
    if (palabraAdivinada.toUpperCase() === palabra.toUpperCase()) {
        mensaje.innerHTML = "😄 ¡Felicitaciones! ¡Ganaste!";
        btnReiniciar.classList.remove("oculto");
        form.classList.add("oculto");
    } else if (intentosDisponibles === 0) {
        mensaje.innerHTML = `😢 ¡Perdiste! La palabra era "${palabra.toUpperCase()}".`;
        btnReiniciar.classList.remove("oculto");
        form.classList.add("oculto");
    }
}

function imagen (intentos) {
    switch (intentos) {
        case 6: return "img/ahorcado_6.png"; 
        case 5: return "img/ahorcado_5.png";  
        case 4: return "img/ahorcado_4.png";
        case 3: return "img/ahorcado_3.png";
        case 2: return "img/ahorcado_2.png";
        case 1: return "img/ahorcado_1.png"; 
        case 0: return "img/ahorcado_0.png"; 
    }
}

function random(array) {
    let indice = Math.floor(Math.random() * (array.length - 1));
    return array[indice];
}

function esLetra (letra) {
    let reg = /[A-Za-zÑñ]/;

    return reg.test(letra);
}
comenzarJuego();