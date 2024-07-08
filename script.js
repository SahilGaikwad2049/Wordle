console.log("code")

const pattern = /[a-z]/;
let currentGuessCount = 1;
let currentGuess = document.querySelector('#guess' + currentGuessCount)
// let currentLetters = currentGuess.dataset.letters;

document.addEventListener("keydown", (e) => {
    console.log("keypress: "+e.key)

    let press = e.key;
    if(press.length == 1 && pattern.test(press)){
        console.log('isLetter');
        updateLetters(press.toUpperCase())
    } else if(e.key === 'Backspace'){
        deleteLetters()
    }
});

function updateLetters(letter){
    let oldLetters = currentGuess.dataset.letters;
    let newLetters = oldLetters + letter;
    let currentTile = newLetters.length;
    currentGuess.dataset.letters = newLetters;
    // console.log('currentTile = '+ currentTile)
    // console.log('currentGuessCount = ' + currentGuessCount)
    // console.log('currentLetters = ' + currentGuess.dataset.letters)
    // console.log('updated currentLetters: ' + currentGuess.dataset.letters)

    updateTiles(currentTile,letter);
}

function updateTiles(tileNumber, letter){
    // console.log('updateTiles('+ tileNumber + letter +')')
    let currentTile = document.querySelector('#tile'+ tileNumber)
    currentTile.innerText = letter;
}

function deleteLetters(){
    let oldLetters = currentGuess.dataset.letters;
    console.log(oldLetters)
    let newLetters = oldLetters.slice(0, -1)
    console.log(newLetters)
    currentGuess.dataset.letters = currentGuess.dataset.letters.slice(0,-1);
    deleteTiles(oldLetters.length)
}

function deleteTiles(tileNumber){
    document.querySelector('#tile'+ tileNumber).innerText = "";
}