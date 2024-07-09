// console.log("code")

const pattern = /[a-z]/;
let currentGuessCount = 1;
let currentGuess = document.querySelector('#guess' + currentGuessCount)

let soln = '';

let words = [
    'BINGE', 'FROZE', 'THUMP', 'DANCE', 'SHEER', 'BLEND', 'KNIFE', 'RIDER',
    'ZESTY', 'MOUND', 'JOLLY', 'WRING', 'CHEEK', 'ADORE', 'ROUTE', 'MOTEL',
    'ABBEY', 'GLEAM', 'LUMEN', 'FLOOD', 'RALLY', 'ABIDE', 'TOAST', 'CREEP',
    'TITLE', 'DRAIN', 'INNER', 'ELBOW', 'OPERA', 'IVORY', 'OASIS', 'KNOCK',
    'TIGER', 'ADAPT', 'FORGE', 'HASTE', 'DWELT', 'HOUND', 'PIANO', 'LEMON',
    'NOBLE', 'ZEBRA', 'POKER', 'LASER', 'RIDGE', 'TRIED', 'REALM', 'XENON',
    'YIELD', 'WHEAT', 'FLUTE', 'INDEX', 'MERRY', 'INBOX', 'ALOFT', 'JUMBO',
    'BRAVE', 'VIVID', 'SCOUT', 'GLOOM', 'APPLE', 'IRONY', 'RANCH', 'DROWN',
    'TAINT', 'WHARF', 'ULCER', 'PUNCH', 'STACK', 'WHALE', 'YOUTH', 'VOTER',
    'PLEAD', 'LEAPT', 'EXULT', 'FLOCK', 'CRUST', 'GRAPE', 'ETHIC', 'OUTDO',
    'QUAKE', 'CANDY', 'SCORE', 'QUILT', 'MIRTH', 'OVARY', 'ZONAL', 'CRAVE',
    'BRAWN', 'NOTCH', 'CABIN', 'WEARY', 'UNDER', 'LUNAR', 'SLEEK', 'HOVER',
    'MOURN', 'DELTA', 'LOYAL', 'WITTY', 'UNION', 'MOLAR', 'FLAME', 'GLOVE',
    'JUMPY', 'WRIST', 'EAGLE', 'TRACE', 'KNEEL', 'ELITE', 'UPPER', 'IMAGE',
    'PRIZE', 'TORCH', 'DRAMA', 'CRISP', 'CRATE', 'ROUGH', 'NERVE', 'LODGE',
    'QUERY', 'YACHT', 'JUDGE', 'JOKER', 'EAGER', 'MANGO', 'ORGAN', 'HOUSE',
    'SUGAR', 'NORTH', 'QUACK', 'IRATE', 'RIVER', 'UMBRA', 'PLUME', 'GRAND',
    'HINGE', 'STOIC', 'EVERY', 'GRASP', 'ANGRY', 'OCEAN', 'PROUD', 'VISIT',
    'VALID', 'NIFTY', 'CRAZY', 'TABLE', 'WEAVE', 'DRAPE', 'BAKER', 'JELLY',
    'ALERT', 'BLOOM', 'DWELL', 'DRIVE', 'VALET', 'PENNY', 'SHINE', 'QUOTA',
    'FANCY', 'KNACK', 'BRISK', 'KNEAD', 'FOAMY', 'THUMB', 'SHAPE', 'SNACK',
    'CRIED', 'LOWER', 'WHORE', 'SWEET', 'SIGMA', 'SHIFT', 'SHIRT', 'LEVEL',
    'ALPHA', 'GAMMA', 'CRANE', 'NAKED', 'EXUDE', 'LIVER', 'FRIED', 'CHESS',
    'FERRY', 'MARRY', 'BLESS', 'BLISS', 'FLICK', 'FROCK', 'BLARE', 'NINJA',
    'WRUNG', 'RIGHT', 'WRITE', 'WRONG', 'BALLS', 'BEACH', 'SHEEP', 'FROTH',
    'GLARE', 'FLAIR', 'BLACK', 'WHITE', 'GREEN', 'PEACH', 'LOVER', 'SEVEN',
    'EIGHT', 'ROUND', 'SOUND', 'COULD', 'WOULD', 'MOULD', 'THING', 'ALLEY',
    'ALIAS', 'ALIEN', 'BLOAT', 'GLOAT', 'FLOAT', 'SLOTH', 'PRESS', 'PRUNE',
    'FLEET', 'BRING', 'SLICE', 'SPLIT', 'COLOR', 'SOLAR', 'BOOBS', 'PUSSY',
    'PENIS', 'JEANS', 'GENES', 'SCENE', 'ODOUR', 'CATCH', 'MATCH', 'WATCH'
]

function chooseWord(){
    words = words.sort(()=>Math.random() - 0.5);
    soln = words[Math.floor(Math.random()*words.length)];
    console.log(soln);
}

chooseWord();

document.addEventListener("keydown", (e) => {
    // console.log("keypress: "+e.key)

    let press = e.key;
    if(press.length == 1 && pattern.test(press)){
        // console.log('isLetter');
        updateLetters(press.toUpperCase())
    } else if(e.key === 'Backspace' && currentGuess.dataset.letters != ""){
        deleteLetters()
    } else if(e.key === 'Enter' && currentGuess.dataset.letters.length == 5){

        for(let i = 0; i < 5; i++)
        {
            revealTile(i, compareLetters(i));
            
        }
        // console.log(checkWin());
        if(!checkWin()){
            currentGuessCount = currentGuessCount + 1;
            currentGuess = document.querySelector('#guess'+currentGuessCount);
        }
    }
});


function updateLetters(letter){
    let oldLetters = currentGuess.dataset.letters;
    let newLetters = oldLetters + letter;
    let currentTile = newLetters.length;
    currentGuess.dataset.letters = newLetters;

    updateTiles(currentTile,letter);
}

function updateTiles(tileNumber, letter){
    let currentTile = document.querySelector('#guess'+currentGuessCount+'tile'+tileNumber)
    currentTile.innerText = letter;
}

function deleteLetters(){
    let oldLetters = currentGuess.dataset.letters;
    // console.log(oldLetters)
    let newLetters = oldLetters.slice(0, -1)
    // console.log(newLetters)
    currentGuess.dataset.letters = currentGuess.dataset.letters.slice(0,-1);
    deleteTiles(oldLetters.length)
}

function deleteTiles(tileNumber){
    document.querySelector('#guess'+currentGuessCount+'tile'+tileNumber).innerText = "";
}

function compareLetters(position){
    let guessedLetter = currentGuess.dataset.letters.charAt(position)
    let solnLetter = soln.charAt(position)

    if(guessedLetter == solnLetter){
        // console.log("correct")
        return 'correct';
    } else {
        if(checkLetters(guessedLetter)){
            return 'present';
        }
        else{
            return 'absent';
        }
    }
}

function checkLetters(letter){
    return soln.includes(letter);
}

function revealTile(i, state){
    let tileNum = i + 1;
    let tile = document.querySelector('#guess'+currentGuessCount+'tile'+tileNum)

    // switch(status){
    //     case 'correct':
    //         tile.classList.add('correct');
    //         break;
    //     case 'present':
    //         tile.classList.add('present');
    //         break;
    //     case 'absent':
    //         tile.classList.add('absent');
    //         break;
    // }

    flipTile(tileNum, state)
    updateKeyboard(currentGuess.dataset.letters.charAt(i), state);
}

function checkWin(){
    if(soln == currentGuess.dataset.letters){
        return true;
    }
    else{
        return false;
    }
}

function flipTile(tileNum, state){
    let tile = document.querySelector('#guess'+currentGuessCount+'tile'+tileNum);
    tile.classList.add('flip-in')
    setTimeout(()=>{
        tile.classList.add(state)
    }, 250)
    setTimeout(()=>{
        tile.classList.remove('flip-in')
        tile.classList.add('flip-out')
    }, 250)
}

function updateKeyboard(letter, state){
    let key = document.querySelector(`.key[data-key="${letter.toLowerCase()}"]`)
    if(key)
    {
        // key.classList.remove('correct', 'present', 'absent');
        key.classList.add(state);
    }
}