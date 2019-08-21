/*
* TODO: Add real symbols here,
*/
let symbols = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
const board = document.querySelector('.card-container');

/* Shuffles symbols */
symbols = shuffleCards(symbols);

/* Adds cards to the board with the shuffled symbols facing down. */
addCardsToBoard(symbols, board);



/**
* @description Create and add 2-sided cards to the DOM with symbol as content.
* @param {array} symbols - The symbols for the cards facing down.
* @param {ul} board - The card-container representing the board.
* @see https://www.w3schools.com/howto/howto_css_flip_card.asp
*/
function addCardsToBoard(symbols, board) {

  for(const symbol of symbols) {

    /* Creates the elements needed to build a card */
    const card = document.createElement("li"); /* the card spot on the board */
    const cardBox = document.createElement("div"); /* the box making the card-sides stay on top in same pos */
    const cardUp = document.createElement("div"); /* card-side facing up */
    const cardDown = document.createElement("div"); /* card-side facing down */

    /* Sets the correct class attributes to the newly created card-elements */
    card.setAttribute('class', 'card');
    cardBox.setAttribute('class', 'card-box');
    cardUp.setAttribute('class','card-front');
    cardDown.setAttribute('class','card-back');

    /* Adds the needed card-elements to eachother and to the existing board (<ul> container) */
    board.appendChild(card);
    card.appendChild(cardBox);
    cardBox.appendChild(cardUp);
    cardBox.appendChild(cardDown);

    /* Adds the symbols to the card-side facing down. */
    cardDown.textContent = `${symbol}`;

    /*TODO fix this method to smaller ones*/
    cardBox.addEventListener('click', function () {cardBox.classList.toggle('card-flip');});

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
