/*
TODO: Code tested in browser, and worked for traversing cards with for...of
const cards = document.querySelectorAll('.card');
undefined
cards
NodeList(16) [li.card, li.card, li.card, li.card, li.card, li.card, li.card, li.card, li.card, li.card, li.card, li.card, li.card, li.card, li.card, li.card]0: li.card1: li.card2: li.card3: li.card4: li.card5: li.card6: li.card7: li.card8: li.card9: li.card10: li.card11: li.card12: li.card13: li.card14: li.card15: li.cardlength: 16__proto__: NodeList
for (const card of cards){}
undefined
for (const card of cards){ if (card.textContent === '3'){card.style.backgroundColor ='red'}else{card.style.backgroundColor = 'blue';}}
"blue"

*/

/* TODO: Add real symbols here,
 * and update function to have 2-sided cards. */
const symbols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
const container = document.querySelector('.card-container');


/* Method for creating the cards and adding them to the DOM with symbol as content */
for(const symbol of symbols){
  const card = document.createElement("li"); /* makes <li></li> */
  const cardBox = document.createElement("div");
  const cardUp = document.createElement("div");
  const cardDown = document.createElement("div");
  card.setAttribute('class', 'card');
  cardUp.setAttribute('class','card-front'); /* makes <li class="card card-front"> </li> */
  cardDown.setAttribute('class','card-back');
  cardBox.setAttribute('class', 'card-box');
  container.appendChild(card);
  card.appendChild(cardBox);
  cardBox.appendChild(cardUp); /* adds the new <li> to existing <ul> */
  cardBox.appendChild(cardDown);
  cardDown.textContent = `${symbol}`; /* inserts the symbol in the <li> */
}
