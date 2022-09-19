const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const resetbtn = document.querySelector('.btn__reset');
let missed = 0;
const phrases = [
    'Time is money',
    'Knowledge is power',
    'Fortune favors the bold',
    'I think therefore I am',
    'Practice makes perfect'
];

resetbtn.addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
});

function getRandomPhraseAsArray(arr){
    const randomNumber = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomNumber];
    return randomPhrase;
}


