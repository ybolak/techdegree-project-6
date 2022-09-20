const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const resetbtn = document.querySelector('.btn__reset');
let missed = 0;
const phrases = [
    'time is money',
    'knowledge is power',
    'fortune favors the bold',
    'i think therefore i am',
    'practice makes perfect'
];
const overlay = document.getElementById('overlay');

resetbtn.addEventListener('click', () => {
    overlay.style.display = 'none';
});

function getRandomPhraseAsArray(arr){
    const randomNumber = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomNumber];
    return randomPhrase.split('');
}

function addPhraseToDisplay(arr){
    for (let i = 0; i < arr.length; i++) {
        const items = document.createElement('li');
        const ul = document.querySelector('#phrase ul');
        items.textContent = arr[i];
        ul.appendChild(items);
        if (arr[i] !== ' ') {
            items.className = 'letter';
        } else {
            items.className = 'space';
        }
    }
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function checkLetter (btn) {
    const lis = document.getElementsByClassName('letter');
    const buttonText = btn.textContent;
    let match = null;
    for (let i = 0; i < lis.length; i++) {
        let li = lis[i];
        if (li.textContent === buttonText) {
            li.classList.add('show');
            match = buttonText;
        }
    }
    return match;
}

function checkWin () {
    const letter = document.getElementsByClassName('letter');
    const show = document.getElementsByClassName('show');
    console.log("letter is:", letter.length, "quote is", show.length);

    if (letter.length === show.length) {
        const headline = overlay.firstElementChild;
        overlay.className('win');
        headline.textContent = 'Congratulations! You won!!';
        overlay.style.display = 'flex';
    }
}

qwerty.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const button = e.target;
        if (button.className !== 'chosen') {
             button.className = 'chosen';
             button.disabled = true;
        }
        const letterFound = checkLetter(button);
        if (letterFound === null) {
            const ol = document.querySelector('#scoreboard ol');
            const lastItem = ol.lastElementChild;
            lastItem.remove();    
            missed += 1;
        }
    }
    checkWin();
});


