var userCount = 0;
var compCount = 0;
var index = 0;
var max = 51;
var win = 0;
var percent = 0;

// Correct class naming convention
class Card {
    constructor(value, suit) {
        this.value = value;
        this.suit = suit;
    }
}

const imgContainer = document.getElementById('mainimg') // The image where the cards appear
const button1 = document.getElementById("button1") // The negative 1 button
const button2 = document.getElementById("button2") // The zero button
const button3 = document.getElementById("button3") // The positive 1 button
const endText = document.getElementById("endText") // The text that displays both scores
const cardText = document.getElementById("countText") // The text that shows how many cards in the deck remain
const mainDiv = document.getElementById("main-div") // The main div
const buttonDiv = document.getElementById("button-div")
const startButton = document.getElementById("startButton")
const restartButton = document.getElementById("restartButton")
const restartDiv = document.getElementById('restart-div')
const rules = document.getElementById('rules')


const cards = [];  // Where the cards are stored
const suits = ['club', 'spade', 'diamond', 'heart'] // The suits for the cards

function setup() {
    cards.length = 0;  // Reset the deck
    max = 51; // Reset the max for random number
    // Loop over suits
    for (var i = 0; i < 4; i++) {
        // Determine suit by index

        // Loop over card values
        for (var x = 2; x <= 10; x++) {
            // Ensure the card is correctly pushed with proper object creation
            cards.push(new Card(x, suits[i]));
        }
        cards.push(new Card('jack', suits[i])); // Add a jack of suit
        cards.push(new Card('queen', suits[i])); // Add a queen of suit
        cards.push(new Card('king', suits[i])); // Add a king of suit
        cards.push(new Card('ace', suits[i])); // Add a ace of suit
    }
    compCount = 0; // The count of the computer
    userCount = 0; // The count of the user
    percent = 0; // How many counts the user got correct
    // The following is CSS for making stuff visible and invisible
    buttonDiv.style.animation = 'reveal 3s';
    buttonDiv.style.visibility = 'visible';
    imgContainer.style.animation = 'reveal 3s';
    imgContainer.style.visibility = 'visible';
    cardText.style.animation = 'reveal 3s';
    cardText.style.visibility = 'visible';
    startButton.style.display = 'none';
    restartDiv.style.animation = 'hide 3s';
    restartDiv.style.visibility = 'hidden';
    endText.innerHTML = '';
    rules.style.display = 'none';
    cardText.innerHTML = 'Cards remaining in deck: 52'
    randCard()  // Set the picture for the first card
}

function randNum(min, max) {
    return Math.floor(Math.random() * (max-min + 1)) + min;
}

function randCard() {
    index = randNum(0, max) // Choose a random number between 0 and the number of cards left
    var name = cards[index].value + '' + cards[index].suit; // File Name of card chosen
    var path = "src/" + name + ".svg" // Path of card chosen
    imgContainer.src = path; // Sets the image to the card chosen
}

function compCalc() {
    value = cards[index].value;
    if (value > 1 && value <= 6) {
        compCount += 1;
    } else if(value > 6 && value <= 9) {
        compCount += 0;
    } else if(value == 10 || value == 'jack' || value == 'queen' || value == 'king' || value == 'ace') {
        compCount = compCount - 1;
    }
    console.log(compCount + ' ' + userCount + ' ' + value + ' ' + cards[index].value)
    if (userCount == compCount) {
        percent += 1;
    }
    console.log(percent)
}

function plus1() {
    if(cards.length == 0) {
        end()
    } else {
        userCount += 1;
        compCalc();
        cardRemove();
        randCard();
    }
    
}

function zero() {
    if(cards.length == 0) {
        end()
    } else {
        compCalc();
        cardRemove();
        randCard();
    }
}

function minus1() {
    if (cards.length == 0) {
        end()
    } else {
        userCount = userCount - 1;
        compCalc();
        cardRemove();
        randCard();
    }
    
}

function cardRemove() {
    cards.splice(index, 1)
    max = max - 1
    cardText.innerHTML = 'Cards remaining in deck: ' + cards.length;
}

function end() {
    var accuracy = Math.round((percent / 52 * 100) * 100) / 100; // Divde the correct number by 52 then convert to percent
    var text = 'You got ended up with ' + userCount + '.<br>You had an accuracy of ' + accuracy + '%'; // String for end screen text
    endText.innerHTML = text; // Display end screen text
    console.log(text, (percent / 52)) // Debugging
    // The following is CSS for hiding the game screens and showing the end screen
    buttonDiv.style.animation = 'hide 3s';
    buttonDiv.style.visibility = 'hidden';
    imgContainer.style.animation = 'hide 3s';
    imgContainer.style.visibility = 'hidden';
    cardText.style.animation = 'hide 3s';
    cardText.style.visibility = 'hidden';
    restartDiv.style.animation = 'reveal 3s';
    restartDiv.style.visibility = 'visible';

}
console.log(cards);

button1.onclick = function() {
    button1.style.animation = 'flash 0.3s';
    minus1()
}
button2.onclick = function() {
    button2.style.animation = 'flash 0.3s';
    zero()
}
button3.onclick = function() {
    button3.style.animation = 'flash 0.3s';
    plus1()
}

startButton.onclick = () => {
    startButton.style.animation = 'flash 0.3s';
    setup()
}

restartButton.onclick = () => {
    restartButton.style.animation = 'flash 0.3s';
    setup()
}


button1.addEventListener("animationend", (e) => e.target.style.animation = '');
button2.addEventListener("animationend", (e) => e.target.style.animation = '');
button3.addEventListener("animationend", (e) => e.target.style.animation = '');
startButton.addEventListener("animationend", (e) => e.target.style.animation = '');
restartButton.addEventListener("animationend", (e) => e.target.style.animation = '');
imgContainer.addEventListener("animationend", (e) => e.target.style.animation = '');
endText.addEventListener("animationend", (e) => e.target.style.animation = '');
cardText.addEventListener("animationend", (e) => e.target.style.animation = '');
mainDiv.addEventListener("animationend", (e) => e.target.style.animation = '');
buttonDiv.addEventListener("animationend", (e) => e.target.style.animation = '');
rules.addEventListener("animationend", (e) => e.target.style.animation = '');
