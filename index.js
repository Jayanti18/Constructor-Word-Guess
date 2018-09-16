// Requiring our letter module exported from letter.js
const Word = require("./Word.js");

const inquirer = require("inquirer");

const clc = require('cli-color');

const figlet = require('figlet');

const isLetter = require('is-letter');

const boxen = require('boxen');

let incorrect = clc.red.bold;

let correct = clc.green.bold;

let gameTextColor = clc.cyanBright;

let userGuessedCorrectly = false;

const wordList = ["cat", "fish", "tiger", "monkey"];

let randomWord;
let someWord;

let wins = 0;
let losses = 0;
let guessesRemaining = 10;

let userGuess = "";

let lettersAlreadyGuessedList = "";
let lettersAlreadyGuessedListArray = [];

let slotsFilledIn = 0;

figlet("Constructor-Word-Guess", function(err, data) {
  if (err) {
    console.log('ERROR');
    console.dir(err);
    return;
  }
  console.log(data)
  confirmStart();
});


function confirmStart() {
  let readyToStartGame = [{
      type: 'text',
      name: 'playerName',
      message: 'What is your name?'
    },
    {
      type: 'confirm',
      name: 'readyToPlay',
      message: 'Are you ready to play?',
      default: true
    }
  ];
  inquirer.prompt(readyToStartGame).then(answers => {
    if (answers.readyToPlay) {
      console.log(gameTextColor("Great! Welcome, " + answers.playerName));
      startGame();
    } else {
      console.log(gameTextColor("Good bye, " + answers.playerName));
      return;
    }
  });
}


function startGame() {
  guessesRemaining = 10;
  chooseRandomWord();
  lettersAlreadyGuessedList = "";
  lettersAlreadyGuessedListArray = [];
}


function chooseRandomWord() {
  randomWord = wordList[Math.floor(Math.random() * wordList.length)].toUpperCase();
  someWord = new Word(randomWord);
  console.log(gameTextColor("Your word contains " + randomWord.length + " letters."));
  console.log(gameTextColor("WORD TO GUESS:"));
  someWord.splitWord();
  someWord.generateLetters();
  guessLetter();
}



function guessLetter() {
  if (slotsFilledIn < someWord.letters.length || guessesRemaining > 0) {
    inquirer.prompt([{
      name: "letter",
      message: "Guess a letter:",
      validate: function(value) {
        if (isLetter(value)) {
          return true;
        } else {
          return false;
        }
      }
    }]).then(function(guess) {
      guess.letter.toUpperCase();
      console.log(gameTextColor("You guessed: " + guess.letter.toUpperCase()));
      userGuessedCorrectly = false;
      if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) > -1) {
        console.log(gameTextColor("You already guessed that letter."));
        console.log(gameTextColor("====================================================================="));
        guessLetter();
      } else if (lettersAlreadyGuessedListArray.indexOf(guess.letter.toUpperCase()) === -1) {
        lettersAlreadyGuessedList = lettersAlreadyGuessedList.concat(" " + guess.letter.toUpperCase());
        lettersAlreadyGuessedListArray.push(guess.letter.toUpperCase());
        console.log(boxen(gameTextColor('Letters already guessed: ') + lettersAlreadyGuessedList, {
          padding: 1
        }));

        for (i = 0; i < someWord.letters.length; i++) {
          if (guess.letter.toUpperCase() === someWord.letters[i].character && someWord.letters[i].letterGuessedCorrectly === false) {
            someWord.letters[i].letterGuessedCorrectly === true;
            userGuessedCorrectly = true;
            someWord.underscores[i] = guess.letter.toUpperCase();
            someWord.underscores.join("");
            console.log(someWord.underscores);
            slotsFilledIn++
            console.log("Number of slots remaining " + slotsFilledIn);
          }
        }
        console.log(gameTextColor("WORD TO GUESS:"));
        someWord.splitWord();
        someWord.generateLetters();

        if (userGuessedCorrectly) {
          console.log(correct('CORRECT!'));
          console.log(gameTextColor("====================================================================="));
          checkIfUserWon();
        } else {
          console.log(incorrect('INCORRECT!'));
          guessesRemaining--;
          console.log(gameTextColor("You have " + guessesRemaining + " guesses left."));
          console.log(gameTextColor("====================================================================="));
          checkIfUserWon();
        }
      }
    });
  }
}




function checkIfUserWon() {
  if (guessesRemaining === 0) {
    console.log(gameTextColor("====================================================================="));
    console.log(incorrect('YOU LOST.'));
    console.log(gameTextColor("The correct city was: " + randomWord));
    losses++;
    console.log(gameTextColor("Wins: " + wins));
    console.log(gameTextColor("Losses: " + losses));
    console.log(gameTextColor("====================================================================="));
    playAgain();
  }

  else if (slotsFilledIn === someWord.letters.length) {
    console.log(gameTextColor("====================================================================="));
    console.log(correct("YOU WON!"));
    wins++;
    console.log(gameTextColor("Wins: " + wins));
    console.log(gameTextColor("Losses: " + losses));
    console.log(gameTextColor("====================================================================="));
    playAgain();
  } else {
    guessLetter("");
  }

}



function playAgain() {
	let playGameAgain = [
    {
	    type: 'confirm',
	    name: 'playAgain',
	    message: 'Do you want to play again?',
	    default: true
	  }
	];

	inquirer.prompt(playGameAgain).then(userWantsTo => {
		if (userWantsTo.playAgain){
			lettersAlreadyGuessedList = "";
			lettersAlreadyGuessedListArray = [];
			slotsFilledIn = 0;
			console.log(gameTextColor("Welcome back."));
			startGame();
		}

		else {
			console.log(gameTextColor("Good bye!"));
			return;
		}
	});
}


