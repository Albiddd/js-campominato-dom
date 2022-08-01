console.log('Campo Minato')

let gridEl = document.querySelector('.grid');
let bombsLocation = []
let punteggio = 0


const start = document.querySelector('.button');
start.addEventListener('click', startGame);



function startGame(){
    let difficulty = document.querySelector('#difficulty').value;
    reset();
    start.value = "Restart";  
   
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
    
    let numeroCelle = dimGriglia ** 2;
    
    bombsLocation = bombsGenerator(numeroCelle);
    console.log(bombsLocation)
    
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

function reset(){
    gridEl.innerHTML = (''); 
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
    const selectedCell = parseInt(this.dataset.numero);
    square.removeEventListener('click', clickHandler);
    
    // se il numero non è presente nell'array di bombe applico la classe safe e aumento il punteggio
    let className = 'safe';

    if (bombsLocation.includes(selectedCell)){
        className = 'danger';

    } else{
        punteggio++
    }
    this.classList.add(className)
}



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// in seguito al click
// se il numero è presente nella lista dei numeri generati
// ho calpestato una bomba e coloro di rosso la casella e termina la partita
// altrimenti sono salvo e continuo a cliccare
// se ho cliccato su una bomba o quando ho rivelato tutte le celle che non sono bombe.
// vinco la partita
// se calpesto una bomba o vinco devo comunicare il punteggio (il numero di volte che ho cliccato su una casella safe)
