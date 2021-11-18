
let boton1 = document.querySelector(".b1");

let boton2 = document.querySelector(".b2");

let boton3 = document.querySelector(".b3");

let content = document.querySelector("#carta");

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'J', 'Q', 'K'];

const suit = ['suitspades', 'suitdiamonds', 'suitclubs', 'suithearts'];

let deck = [];

//--------------------------------------Functions of the posible combinations-----------------------

// -----------------------Constructor that is the base of the definition of a card

function CardSet() {

  this.value = "";
  this.use = false;

}

//------------------- Function that build the deck, the total combinations of cards in an array------------
function Build1(_suits, _number, _deck) {

  let index = 0;

  for (i in _suits) {
    for (j in _number) {
      _deck[index] = new CardSet();
      _deck[index].value = `${_number[j]}-${_suits[i]}`;
      index++
    }

  }

  return _deck
}

Build1(suit, numbers, deck)

//------------------------------------------- Function that set the type of a concrete card by the number and the pale-----------
function type(suit, number) {

  if (suit == 'suitdiamonds') content.setAttribute("class", "card suitdiamonds");
  else if (suit == 'suithearts') content.setAttribute("class", "card suithearts");
  else if (suit == 'suitclubs') content.setAttribute("class", "card suitclubs");
  else content.setAttribute("class", "card suitspades");

  // change the number content
  content.childNodes[0].textContent = number;
}

//-------------------------------------------------BUTTONS---------------------------------------------------------

// Button 1: Function that generates a complete random card
boton1.addEventListener("click", () => {

  let card = deck[Math.floor(Math.random() * deck.length)];

  let cardType = card.value.split('-')
  type(cardType[1], cardType[0]);
});

// Button 2: Function that generates a random card that will not be the same pale that the previous
boton2.addEventListener("click", () => {
  // we get the pale of the actual content, for not being repeated
  let noRepeat = content.className.split(' ')
  let card = deck[Math.floor(Math.random() * deck.length)];
  let cardType = card.value.split('-')
  //we check the pale, and if is the same we iterate until it dont
  while (noRepeat[1] == cardType[1]) {
    card = deck[Math.floor(Math.random() * deck.length)];
    cardType = card.value.split('-')
  }
  type(cardType[1], cardType[0])

});

// Button 3: Function that generate a random card by observe wich cards are being used and dont repeat a certain card until
// the complete set is used
boton3.addEventListener("click", () => {

  let newdeck = deck.filter(content =>
    // filtering the elements that didnt use it before, for a constant probability
    content.use == false
  )
  let n = Math.floor(Math.random() * newdeck.length);

  if (!newdeck[n]) {// we reset the cycle
    alert('Se ha completado el ciclo del mazo')
    Build1(suit, numbers, deck)
    type('suitdiamonds', '1')
  }
  else {// we set the cards used in the complete set and show it in the page
    newdeck[n].use = true;
    let pale = newdeck[n].value
    pale = pale.split('-')
    type(pale[1], pale[0])
  }

});
