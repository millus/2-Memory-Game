/*
* TODO: Add real symbols here,
*/
let symbols2 = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let symbols = [
'001-mixer.svg','001-mixer.svg',
'002-baker.svg','002-baker.svg',
'006-rolling pin.svg','006-rolling pin.svg',
'008-cookie.svg','008-cookie.svg',
'013-flour.svg','013-flour.svg',
'017-donut.svg','017-donut.svg',
'023-whisk.svg','023-whisk.svg',
'043-apron.svg','043-apron.svg'];

/*Create board*/
const board = document.createElement('ul');
board.setAttribute('class', 'card-container');

/* Shuffles symbols */
symbols = shuffleCards(symbols);

/* Adds cards to the board off-screen with the shuffled symbols facing down. */
createCards(symbols, board);

/*Add board with cards to site, causing reflow/repaint*/
document.querySelector('.game-board').appendChild(board);

/* Look up the cards and adds symbols to them. */
const cards = document.querySelectorAll('.card');
addSymbols(symbols, cards);

/*Using event delegation, add event listener only to the board, not each card*/
board.addEventListener('click', flipCard);

/*Adding a restart btn with an event listener*/
const restartBtn = document.querySelector('.btn-restart');
restartBtn.addEventListener('click', restartGame);

/**
* @description Restarts the game by shuffling and adding symbols.
*/
function restartGame() {
  /* Flip all cards so all is facing down */
  flipAllCards(cards);
  /* Shuffles symbols */
  symbols = shuffleCards(symbols);
  /* Adds the new symbols*/
  addSymbols(symbols, cards);
}

/**
* @description Click on a card and flip it 180deg, by toggling card-flip class on the div holding the card-sides.
* @param {event} evt - Takes in an event object.
*/
function flipCard (evt) {
  if(evt.target.parentElement.classList.contains('card')) {
   evt.target.parentElement.classList.toggle('card-flip');
  }
}

/**
* @description Flip all cards so they all face down by removing card-flip.
* @param {NodeList} cards - Takes in a NodeList of all the cards.
*/
function flipAllCards (cards) {
  for(const card of cards) {
    card.classList.remove('card-flip');
  }
 }

/**
* @description Adding symbols to the existing cards card-front. Using hide/change all/show for reducing reflow/repaints.
* @param {array} symbols - An array of pairs of symbols.
*/
function addSymbols (symbols, cards) {
  for(let i = 0; i < cards.length; i++) {
    cards.item(i).lastElementChild.classList.add('hide');
    cards.item(i).lastElementChild.innerHTML = `<img class="card-symbol" src="img/${symbols[i]}" alt="${symbols[i]}"></img>`;
  }
  for(const card of cards) {
    card.lastElementChild.classList.remove('hide');
  }
}

/**
* @description Create 2-sided cards off-screen.
* @param {array} symbols - The symbols for the cards facing down.
* @param {ul} board - The card-container representing the board.
* @see https://www.w3schools.com/howto/howto_css_flip_card.asp
*/
function createCards(symbols, board) {

  for(const symbol of symbols) {

    /* Creates the elements needed to build a card */
    const cardPos = document.createElement("li"); /* the card pos on the board */
    const card = document.createElement("div"); /* the card div that contains two card-sides, and make them stay in same pos */

    const cardUp = document.createElement("div"); /* card-side facing up */

    const cardDown = document.createElement("div"); /* card-side facing down */


    /* Sets the correct class attributes to the newly created card-elements */
    cardPos.setAttribute('class', 'card-pos');
    card.setAttribute('class', 'card');
    cardUp.setAttribute('class','card-back');
    cardDown.setAttribute('class','card-front');

    /* Adds the needed card-elements to eachother and to the existing board (<ul> container) */
    cardPos.appendChild(card);
    card.appendChild(cardUp);
    card.appendChild(cardDown);
    board.appendChild(cardPos);
  }
}

/**
* @description Shuffles an array of symbols using Fisher-Yates shuffle.
* @param {array} symbols - The symbols on the cards facing down.
* @returns {array} The shuffled version of the array symbols.
* @see https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976
*/
function shuffleCards(symbols) {
  let symbolPos = symbols.length; /* Starts shuffle at the last symbol */
  let temp = 0;
  let randomPos = 0;

  /* Ends shuffle when back on the first symbol, position 0 */
  while (symbolPos !== 0) {

    randomPos = Math.floor(Math.random() * symbolPos);

    /* Keep on going back til all symbols have been shuffled. */
    symbolPos--;

    /* Using a temp variable to swap the symbol on randomPos and symbolPos. */
    temp = symbols[symbolPos];
    symbols[symbolPos] = symbols[randomPos];
    symbols[randomPos] = temp;
  }

  return symbols;
}
