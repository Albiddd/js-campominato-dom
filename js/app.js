console.log('Campo Minato')

let tabelloneEl = document.querySelector('.tabellone');

const start = document.querySelector('.button');
start.addEventListener('click', startGame);


function startGame(){
    let difficulty = document.querySelector('#difficulty').value;
    tabelloneEl.innerHTML = (''); 
    start.value = "Restart";  
   
    switch(difficulty){
        case 'medio':
            dimensione = 9
            break;
        case 'difficile':
            dimensione = 7
            break;
        default:
            dimensione = 10
    }

    gridGenerator(dimensione)
}

function gridGenerator(dimGriglia){
    
    let numeroCelle = dimGriglia ** 2;
    
    for(let i = 0; i < numeroCelle; i++){

        const cella = getSquareElement();
        cella.innerHTML = i + 1;
        tabelloneEl.style.gridTemplateColumns = `repeat(${dimGriglia}, 1fr)`;
        tabelloneEl.append(cella);
        
}
} 


function getSquareElement(){
    const square = document.createElement('div');
    square.classList.add('square');
    
    square.addEventListener('click', clickHandler); 
    return square;

}

function clickHandler(){
    const square = this;
    square.classList.toggle('clicked');  
    console.log(square.innerHTML);
    square.removeEventListener('click', clickHandler);
}