const cards = document.querySelectorAll('.card');
let hasFlippedCad = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard(){
    if(lockBoard) return; // se for verdadeira so retorna e nada acontece
    if(this === firstCard) return;
    this.classList.add('flip'); //adiciona a carta uma vez

    if(!hasFlippedCad){ //se for false , mudar para true
        hasFlippedCad = true;
        firstCard = this;  //primeira carta vai ser igual ao elemento clicado
        return;
    }
    secondCard = this;

    hasFlippedCad = false;

    checkForMath();
}
function checkForMath(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
     return;
    }

    unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
 
    resetBoard();
}

//voltar as cartas , como era antes
function unflipCards(){
 lockBoard = true;

 setTimeout(() => {
 firstCard.classList.remove('flip');
 secondCard.classList.remove('flip');

 resetBoard();


 }, 1500);

}

function resetBoard(){
    [hasFlippedCad, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//embaralhar as cartas
(function shuffle(){
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

