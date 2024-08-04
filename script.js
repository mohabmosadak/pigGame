"use strict";

// Defining the buttons
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");

// Defining the dice
const dice = document.querySelector(".dice");

// Defining game variables
let currentScore,
  diceCurrent,
  currentPlayer = true;

// Defining the audios
const newAudio = new Audio("audio/new.mp3");
const rollAudio = new Audio("audio/dice.mp3");
const switchAudio = new Audio("audio/switch.mp3");
const winAudio = new Audio("audio/win.mp3");

// Event listeners for buttons

// Defining game players
let player = document.querySelector(`.player--${Number(!currentPlayer)}`);
let playerCurrent = document.querySelector(
  `#current--${Number(!currentPlayer)}`
);
let playerScore = document.querySelector(`#score--${Number(!currentPlayer)}`);

// Function to initialize the game
const initialize = function () {
  document.querySelector("#score--0").textContent = 0;
  document.querySelector("#score--1").textContent = 0;
  document.querySelector("#current--0").textContent = 0;
  document.querySelector("#current--1").textContent = 0;
  currentScore = 0;
  player.classList.remove("player--winner");
  player.classList.add("player--active");
  diceCurrent = Math.floor(Math.random() * 6) + 1;
  dice.src = `dice-${diceCurrent}.png`;
  dice.classList.contains("hidden") ? null : dice.classList.add("hidden");
  newAudio.play();
};

// initializing the game
initialize();

// Function to stop buttons
const stopButton = function (status) {
  rollBtn.disabled = status;
  holdBtn.disabled = status;
};

// Function to switch the players
const switchPlayer = function () {
  currentPlayer = currentPlayer ? false : true;
  player.classList.remove("player--active");
  player = document.querySelector(`.player--${Number(!currentPlayer)}`);
  player.classList.add("player--active");
  playerCurrent = document.querySelector(`#current--${Number(!currentPlayer)}`);
  playerScore = document.querySelector(`#score--${Number(!currentPlayer)}`);
  switchAudio.play();
};

// Function to roll the dice on click
rollBtn.addEventListener("click", function () {
  diceCurrent = Math.floor(Math.random() * 6) + 1;

  // Displaying the dice image
  dice.src = `dice-${diceCurrent}.png`;
  dice.classList.contains("hidden") ? dice.classList.remove("hidden") : null;

  // Checking if the dice roll is not 1
  if (diceCurrent !== 1) {
    // Updating the current score
    currentScore += diceCurrent;
    playerCurrent.textContent = currentScore;
    rollAudio.play();
  } else {
    playerCurrent.textContent = 0;
    currentScore = 0;
    switchPlayer();
  }
});

// Function to hold the current score
holdBtn.addEventListener("click", function () {
  playerScore.textContent = Number(playerScore.textContent) + currentScore;
  if (Number(playerScore.textContent) >= 100) {
    player.classList.remove("player--active");
    player.classList.add("player--winner");
    stopButton(1);
    winAudio.play();
  } else {
    currentScore = 0;
    playerCurrent.textContent = 0;
    switchPlayer();
  }
});

// Function to start a new game
newBtn.addEventListener("click", function () {
  initialize();
  currentPlayer = false;
  switchPlayer();
  stopButton(0);
});

// preventing the user from using devtools
window.addEventListener("keydown", e =>
  e.key === "F12" ||
  (e.ctrlKey && e.shiftKey && (e.key === "C" || e.key === "I"))
    ? e.preventDefault()
    : null
);
window.addEventListener("contextmenu", e => e.preventDefault());

// Checking for devtools and taking action if detected
let devtoolsOpen = false;
const threshold = 160;

setInterval(() => {
  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;

  if (widthThreshold || heightThreshold) {
    if (!devtoolsOpen) {
      devtoolsOpen = true;
      window.location.href =
        "https://www.youtube.com/watch?v=qcOtg1L2Jc4&autoplay=1&mute=1&loop=1";
    }
  } else {
    devtoolsOpen = false;
  }
}, 1000);
