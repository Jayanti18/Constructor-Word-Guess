// Requiring our letter module exported from letter.js
const Letter = require("./Letter");

let Word = function(myWord) {
	this.myWord = myWord;
	this.letters = [];
	this.underscores = [];
	this.splitWord = function() {
		this.letters = this.myWord.split("");
		numberUnderscoresNeeded = this.letters.length;
		for (let i = 0; i < numberUnderscoresNeeded; i++ ) {
		this.underscores.push("_ ");
		}
		console.log(this.underscores.join(" "));
	}
	this.generateLetters = function() {
		for (let i = 0; i < this.letters.length; i++){
			this.letters[i] = new Letter (this.letters[i]);
			this.letters[i].letterGuessedCorrectly = true;
			console.log(this.letters[i]);
			this.letters[i].showCharacter();
		}
	}
}
module.exports = Word;



