const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startBtn = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');
const letter = document.getElementsByClassName('letter');
const phrases = [
    'time is money',
    'knowledge is power',
    'fortune favors the bold',
    'i think therefore i am',
    'practice makes perfect',
    'genius is eternal patience',
    'stay hungry stay foolish'
];
let missed = 0;

function getRandomPhraseAsArray(arr){
    let randomNumber = Math.floor(Math.random() * arr.length);
    let randomPhrase = arr[randomNumber];
    return randomPhrase.split('');
}

function addPhraseToDisplay(arr){
    for (let i = 0; i < arr.length; i++) {
        const items = document.createElement('li');
        const ul = document.querySelector('ul');
        items.textContent = arr[i];
        ul.appendChild(items);
        if (arr[i] !== ' ') {
            items.className = 'letter';
        } else {
            items.className = 'space';
        }
    }
}

function checkLetter (btn) {    
    const buttonText = btn.textContent;
    let match = null;
    for (let i = 0; i < letter.length; i++) {
        let li = letter[i];
        if (li.textContent === buttonText) {
            li.classList.add('show');
            match = buttonText;
        }
    }
    return match;
}

function checkWin () {
    const show = document.getElementsByClassName('show');
    const headline = document.querySelector('.title');    

    if (letter.length === show.length) {
        const resetGame = document.createElement('button');
        resetGame.textContent = 'Reset Game';
        resetGame.className = 'reset_game';
        overlay.appendChild(resetGame);
        overlay.className = 'win';
        headline.textContent = 'Congratulations! You won!!';
        overlay.style.display = 'flex';
        startBtn.remove(); 

        resetGame.addEventListener('click', () => {
            const button = document.querySelectorAll('.keyrow button');
            const lis = document.querySelectorAll('ul li');
            const tries = document.querySelectorAll('.tries img');
            for (let i = 0; i < button.length; i++) {
                button[i].removeAttribute('class');
                button[i].disabled = false;
            }
            for (let i = 0; i < lis.length; i++) {
                lis[i].remove();
            }
            for (let i = 0; i < tries.length; i++) {
                tries[i].setAttribute('src', 'images/liveHeart.png')
            }
            phraseArray = getRandomPhraseAsArray(phrases);
            addPhraseToDisplay(phraseArray);
            overlay.style.display = 'none'; 
            missed = 0;
            resetGame.remove();
        });


    } else if (missed > 4) {
        const resetGame = document.createElement('button');
        resetGame.textContent = 'Reset Game';
        resetGame.className = 'reset_game';
        overlay.appendChild(resetGame);
        overlay.className = 'lose';
        headline.textContent = 'Sorry... You lost.';
        overlay.style.display = 'flex';
        startBtn.remove();

        resetGame.addEventListener('click', () => {
            const button = document.querySelectorAll('.keyrow button');
            const lis = document.querySelectorAll('ul li');
            const tries = document.querySelectorAll('.tries img');
            for (let i = 0; i < button.length; i++) {
                button[i].removeAttribute('class');
                button[i].disabled = false;
            }
            for (let i = 0; i < lis.length; i++) {
                lis[i].remove();
            }
            for (let i = 0; i < tries.length; i++) {
                tries[i].setAttribute('src', 'images/liveHeart.png')
            }
            phraseArray = getRandomPhraseAsArray(phrases);
            addPhraseToDisplay(phraseArray);
            overlay.style.display = 'none'; 
            missed = 0;
            resetGame.remove();
        });
    }
}

startBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

let phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        if (button.className !== 'chosen') {
             button.className = 'chosen';
             button.disabled = true;
        }
        const letterFound = checkLetter(button);
        if (letterFound === null) {
            missed += 1;
            let n = missed - 1;
            const ol = document.querySelector('ol');            
            const li = ol.children[n];
            li.firstElementChild.setAttribute('src', 'images/lostHeart.png')
        }
    }
    checkWin();
});


