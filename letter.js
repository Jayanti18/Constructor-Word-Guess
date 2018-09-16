// letter.js takes a character as an argument and checks it against the underlying character.
let Letter = function(character) {
	this.character = character.toUpperCase();
	this.letterGuessedCorrectly = false;
	this.showCharacter = function() {
		if (this.letterGuessedCorrectly) {
			console.log(this.character);
		}
	}
}
module.exports = Letter