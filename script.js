'use strict';

const gamePlaces = document.querySelectorAll('.place');
const cpuScoreText = document.querySelector('.score-cpu');
const playerScoreText = document.querySelector('.score-player');
const overlay = document.querySelector('.overlay');
const winner = document.querySelector('.winner');
const againBtn = document.querySelector('.again');
const resetBtn = document.querySelector('.reset');

// console.log(randomPick);

let gameArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let random;
let symbol = true;
let playing = true;
let playerScore = 0;
let cpuScore = 0;

// prettier-ignore
let score = 
    [
    [0],[0],[0],
    [0],[0],[0],
    [0],[0],[0]
    ]

const checkWinner = () => {
  if (
    (score[0] === 1 && score[1] === 1 && score[2] === 1) ||
    (score[3] === 1 && score[4] === 1 && score[5] === 1) ||
    (score[6] === 1 && score[7] === 1 && score[8] === 1) ||
    (score[0] === 1 && score[3] === 1 && score[6] === 1) ||
    (score[1] === 1 && score[4] === 1 && score[7] === 1) ||
    (score[2] === 1 && score[5] === 1 && score[8] === 1) ||
    (score[0] === 1 && score[4] === 1 && score[8] === 1) ||
    (score[2] === 1 && score[4] === 1 && score[7] === 1)
  ) {
    playing = false;
    showOverlay('Player');
    playerScore += 1;
    playerScoreText.textContent = playerScore;
  } else if (
    (score[0] === 2 && score[1] === 2 && score[2] === 2) ||
    (score[3] === 2 && score[4] === 2 && score[5] === 2) ||
    (score[6] === 2 && score[7] === 2 && score[8] === 2) ||
    (score[0] === 2 && score[3] === 2 && score[6] === 2) ||
    (score[1] === 2 && score[4] === 2 && score[7] === 2) ||
    (score[2] === 2 && score[5] === 2 && score[8] === 2) ||
    (score[0] === 2 && score[4] === 2 && score[8] === 2) ||
    (score[2] === 2 && score[4] === 2 && score[7] === 2)
  ) {
    playing = false;
    cpuScore += 1;
    cpuScoreText.textContent = cpuScore;
    showOverlay('CPU');
  }
  if (gameArr.length === 0 && playing === true) {
    playing = false;
    showOverlay();
  }
};
const randomNumber = function () {
  random = gameArr[Math.floor(Math.random() * gameArr.length)];
};
const showOverlay = (player = 'Nobody') => {
  overlay.classList.remove('hidden');
  winner.textContent = `${player} won!`;
};

const addSymbol = place => {
  const htmlX = `<span class="span span-x"><i class="fa-solid fa-xmark"></i></span>`;
  const htmlO = `<span class="span span-o"><i class="fa-solid fa-o"></i></span>`;
  if (symbol) {
    place.insertAdjacentHTML('beforeend', htmlX);
  } else {
    place.insertAdjacentHTML('beforeend', htmlO);
  }
};

const resetSymbol = () => {
  const span = document.querySelectorAll('.span');
  span.forEach(el => el.remove());
};

const removeValue = function (number) {
  const newArr = gameArr.filter(num => {
    return num !== number;
  });

  gameArr = newArr;
};

const cpu = function () {
  checkWinner();
  if (!playing) return;
  randomNumber();
  removeValue(random);
  const cpuPlace = gamePlaces.forEach(place => {
    if (+place.dataset.tab === random) addSymbol(place);
  });
  symbol = true;
  setTimeout(player, 500);
  score[random] = 2;
};

const player = function (e) {
  checkWinner();
  if (playing) {
    const playerNum = +e.target.dataset.tab;
    const gamePlace = e.target;
    removeValue(playerNum);
    addSymbol(gamePlace);
    symbol = false;
    setTimeout(cpu, 500);
    score[playerNum] = 1;
  }
};

const gameAgain = () => {
  gameArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  random;
  symbol = true;
  playing = true;
  score = [[0], [0], [0], [0], [0], [0], [0], [0], [0]];
  overlay.classList.add('hidden');
  resetSymbol();
};
const gameReset = () => {
  gameAgain();
  playerScore = 0;
  cpuScore = 0;
  playerScoreText.textContent = cpuScoreText.textContent = '0';
};

//Handlers:

againBtn.addEventListener('click', gameAgain);
resetBtn.addEventListener('click', gameReset);

gamePlaces.forEach(place => {
  place.addEventListener('click', player);
});