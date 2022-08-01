console.log('Campo Minato')

let gridEl = document.querySelector('.grid');
let bombsLocation = [];
let punteggio = 0;
let winningScore = 0;
const start = document.querySelector('.button');
start.addEventListener('click', startGame);
let arrayCelle = [];
let numeroCelle = 0;

function startGame(){
    let difficulty = document.querySelector('#difficulty').value;
    // eseguo la funzione di reset del gioco
    reset();
    start.value = "Restart"; 
   
    let dimensione;
    
    switch(difficulty){
        case 'medium':
            dimensione = 9
            break;
        case 'hard':
            dimensione = 7
            break;
        default:
            dimensione = 10
    }
    
    gridGenerator(dimensione)
}



function gridGenerator(dimGriglia){
    
    numeroCelle = dimGriglia ** 2; 

    winningScore = numeroCelle - 16;

    bombsLocation = bombsGenerator(numeroCelle);
    console.log(bombsLocation);
    
    for(let i = 0; i < numeroCelle; i++){

        const cella = getSquareElement();
        cella.dataset.numero = i + 1

        gridEl.style.gridTemplateColumns = `repeat(${dimGriglia}, 1fr)`;
        gridEl.append(cella);        
    }
} 


function bombsGenerator(max){
    // creo 16 numeri da 1 a numeroCelle
    const bombe = []
    // ciclo che genera le bombe
    while(bombe.length < 16){
        // genero numero casuale intero da 1 a max
        const n = getRandomIntInclusive(1, max) 
        // se il numero non è presente nell'array bombe
        if(!bombe.includes(n)){
            bombe.push(n)

        }
    }
    return bombe
}

// Genero numeri casuali
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function reset(){
    gridEl.innerHTML = (''); 
    punteggio = 0;
    // rimuovo la classe che ferma il gioco una volta premuto restart
    gridEl.classList.remove("stop");
    const gameOverElement = document.querySelector(".game-over");
    gameOverElement.classList.add("hidden");
}


function getSquareElement(){
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('click', clickHandler); 
    return square;

}

function clickHandler(){
    const square = this;
    // square.classList.toggle('clicked');  
    const selectedSquare = parseInt(this.dataset.numero);
    square.removeEventListener('click', clickHandler);
    
    // se il numero non è presente nell'array di bombe applico la classe safe e aumento il punteggio
    let className = 'safe';

    if (bombsLocation.includes(selectedSquare)){
        className = 'danger';
        gameOver();

    } else{
        // incremento il punteggio
        punteggio++;
        if (punteggio == winningScore){
            youWin()
        }
    }
    this.classList.add(className);

}

function youWin(){
    document.getElementById('result').innerHTML = 'YOU WIN!'
    gridEl.classList.add("stop");

    //aggiungo classe che mostra titolo del game over
    const gameOverElement = document.querySelector(".game-over");
    gameOverElement.classList.remove("hidden");

    // Stampo il punteggio a fine partita
    document.getElementById('game-points').innerHTML = 'Hai realizzato ' + punteggio + ' punti.'
}

function gameOver(){
    document.getElementById('result').innerHTML = 'YOU LOSE!'
    // Aggiungo la classe che ferma gli eventi del mouse quando clicco su una bomba, alla griglia
    gridEl.classList.add("stop");

    //aggiungo classe che mostra titolo del game over
    const gameOverElement = document.querySelector(".game-over");
    gameOverElement.classList.remove("hidden");

    // Stampo il punteggio a fine partita
    document.getElementById('game-points').innerHTML = 'Hai realizzato ' + punteggio + ' punti.'

   
}

// function bombShow(){
//     for(let i = 0; i < numeroCelle; i++){
//         arrayCelle[i]
    
//     }
//     if(bombsLocation.includes([i])){

//     }
// }



// ho calpestato una bomba e coloro di rosso la casella e termina la partita
// altrimenti sono salvo e continuo a cliccare
// se ho cliccato su una bomba o quando ho rivelato tutte le celle che non sono bombe.
// vinco la partita
// se calpesto una bomba o vinco devo comunicare il punteggio (il numero di volte che ho cliccato su una casella safe)
