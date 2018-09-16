var inquirer = require("inquirer");


var s;
var count = 0;
var winCount = 0;
var ml;
var First = 1;

var myGamePiece;
var myObstacles = [];
var mySound;
var myMusic;



var words = ["fish", "pancake", "biscuit", "table", "chair", "burger"];
// var words = ["fish", "cat", "pancake"];
// Pick a random word
var randomWord = words[Math.floor(Math.random() * words.length)];
var remainingLetters = randomWord.length;
// Set up the answer array
var answerArray = [];
var guessedLetters = [];

//here we fill the answer array with under scores
// the number of underscores matches the letters in the randomly choosen word
// function startUp ()
// {
for (var i = 0; i < randomWord.length; i++) {
    answerArray[i] = "_";
}

//put them in a string
s = answerArray.join(" ");
document.getElementById("answer").innerHTML = s;
// }

function Letter() {


    // here we get the letter that the user typed in the box
    var letter = document.getElementById("letter").value;

    // make sure we have a guess , later we need to add the code to check only one letter is entered etc.
    if (letter.length > 0) {
        for (var i = 0; i < randomWord.length; i++) {
            // if the randomword contains a letter that the user typed in
            if (randomWord[i] === letter) {
                // assign it to letter
                //   ml = ml.concat(letter);
                answerArray[i] = letter;
                remainingLetters--;
            }
        }
        // here is how many times it takes to guess        
        if (remainingLetters != 0) {
            guessedLetters[count] = letter;
            scoreDisplay();
            document.getElementById("letter").value = "";

        } else {
            //user was able to guess it correctly
            guessedLetters[count] = letter;
            // increment no of Win
            winCount++;
            document.getElementById("matched").innerHTML = "WINS: " + winCount;
            scoreDisplay();
            reset();
            // startGame();
        }

    }

}

function scoreDisplay() {
    
    count++;
    document.getElementById("counter").innerHTML = "No of clicks: " + count;
    document.getElementById("Remaining").innerHTML = "No of Guesses Remaining: " + (2 * randomWord.length - count);
    document.getElementById("guessed").innerHTML = "Letters already Guessed: " + guessedLetters;
    document.getElementById("answer").innerHTML = answerArray.join(" ");
    

}

function reset() {
    count= 0;
    document.getElementById("letter").value = "";
    
    answerArray = [];
    guessedLetters = [];
    document.getElementById("counter").innerHTML = "No of clicks: " + count ;
    document.getElementById("Remaining").innerHTML = "No of Guesses Remaining: " + count;
    document.getElementById("guessed").innerHTML = "Letters already Guessed: " + guessedLetters;
    
    randomWord = words[Math.floor(Math.random() * words.length)];
    remainingLetters = randomWord.length;

for ( i = 0; i < randomWord.length; i++) {
    answerArray[i] = "_";
}
s = answerArray.join(" ");
document.getElementById("answer").innerHTML = s;

}




function startGame() {
    // myGamePiece = new component(30, 30, "red", 10, 120);
    mySound = new sound("bounce.mp3");
    myMusic = new sound("gametheme.mp3");
    myMusic.play();
    myGameArea.start();
}
