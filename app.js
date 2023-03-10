let palabrasPosibles = ["ahorcado", "pizza", "camaron", "carniceria", "clasificacion", "ambiguedad", "transito", "caramelera", "anestesia", "programacion", "calefactor", "alicate", "pasteleria", "magnifico", "establecimiento", "infusion", "influencia", "marisco", "vertebrado", "acuatico", "heladera", "cartilago", "esperanza", "infierno", "television", "lenguaje", "imposible", "hortaliza", "sudoku", "esfuerzo", "autopista", "fotografia", "resplandor", "cartera", "montaña", "pelicula", "martillo", "bosquejo", "iguana", "competencia", "lasagna", "helado", "conducir", "electrico", "hospital", "zurdo"];

let palabra = "";

let palabraAdivinada = "";

let intentosDisponibles = 0;

let letraClickeada = "";

const letra = document.getElementById("letra");
const divPalabra = document.getElementById("palabra");
const btnEnviar = document.getElementById("enviar");
const historial = document.getElementById("historial");
const mensaje = document.getElementById("mensaje");
const ahorcado = document.getElementById("ahorcado");
const btnReiniciar = document.getElementById("reiniciar");

const btnLetra = document.getElementsByClassName("keyboard-button");
    

    for (let i=0; i< btnLetra.length; i++) {
        btnLetra[i].addEventListener("click", (e) => {
            console.log(e.target.innerHTML); 
            letraClickeada = e.target.innerHTML;
            letra.innerHTML = letraClickeada.toUpperCase();
        });
    }



btnEnviar.addEventListener("click", ()=> {
    let letraElegida = letraClickeada;
    console.log(intentar(letraElegida));
    divPalabra.innerHTML = palabraAdivinada;
    ahorcado.setAttribute("src", imagen(intentosDisponibles));
    verificar();
});

btnReiniciar.addEventListener("click", comenzarJuego);


function comenzarJuego() {
    palabra = random(palabrasPosibles);
    palabraAdivinada = "_".repeat(palabra.length);
    divPalabra.innerHTML = palabraAdivinada;
    intentosDisponibles = 6;
    btnReiniciar.classList.add("oculto");
    mensaje.innerHTML = "";
    historial.innerHTML = "";
    ahorcado.setAttribute("src", imagen(intentosDisponibles));
}

function intentar(letra) {
    mensaje.innerHTML = "";
    let letrasEncontradas = 0;
    let string = Array.from(palabraAdivinada);

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
        letra.innerHTML = "";
        mensaje.innerHTML = "😄 ¡Felicitaciones! ¡Ganaste!";
        btnReiniciar.classList.remove("oculto");
    } else if (intentosDisponibles === 0) {
        letra.innerHTML = "";
        mensaje.innerHTML = `😢 ¡Perdiste! La palabra era "${palabra.toUpperCase()}".`;
        btnReiniciar.classList.remove("oculto");
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

comenzarJuego();