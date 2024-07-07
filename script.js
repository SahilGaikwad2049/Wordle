console.log("code")

const pattern = /[a-z]/
let currentGuessCount = 1;
let currentGuess = document.querySelector('#guess' + currentGuessCount)
// let currentLetters = currentGuess.dataset.letters;

document.addEventListener("keydown", (e) => {
    console.log("keypress: "+e.key)

    let press = e.key;
    if(press.length == 1 && pattern.test(press)){
        console.log('isLetter');
        updateLetters(press)
    }
})

const updateLetters = (letter) => {
    console.log('currentGuessCount = ' + currentGuessCount)
    console.log('currentLetters = ' + currentGuess.dataset.letters)
    currentGuess.dataset.letters = currentGuess.dataset.letters + letter;
    currentGuess.innerHTML = currentGuess.dataset.letters
    console.log('updated currentLetters: ' + currentGuess.dataset.letters)
}