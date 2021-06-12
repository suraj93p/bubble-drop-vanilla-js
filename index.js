// Import stylesheets
import './style.css';

import { states } from './config';
import { createBubble, assignAnimationToBubble } from './bubble-factory';
import { computePlayArenaOffsets, createAnimationStyle } from './utils';

let bubbleGenerationInterval = 0;
let isPlayOn = false;
let score = 0;
let bubblesArray;

// App elements and derived values
const scoreElem = document.querySelector('#score');

const actionBtnElem = document.querySelector('#actionBtn');

const speedSliderElem = document.querySelector('#speedSlider');
const speedSliderLabelElem = document.querySelector('#sliderSpeed');
let sliderSpeed;

const playArenaElem = document.querySelector('#play-arena');
const appContainerElem = document.querySelector('#app-container');
const playArenaOffsets = computePlayArenaOffsets(
  playArenaElem,
  appContainerElem
);

// App methods
const setScore = score => {
  scoreElem.textContent = score;
};

const setButtonText = buttonText => {
  actionBtnElem.textContent = buttonText;
};

const getSliderSpeed = () => {
  sliderSpeed = speedSliderElem.value;
};

const setSliderSpeedLabel = () => {
  speedSliderLabelElem.innerText = sliderSpeed;
};

const handleSliderInput = () => {
  getSliderSpeed();
  setSliderSpeedLabel();
};

const handleSliderChange = () => {
  // stop developing old bubbles
  clearInterval(bubbleGenerationInterval);
  // start generating bubbles with new speed
  createBubbles();
};

const btnClick = e => {
  const stage = e.srcElement.innerText;
  if (states.START === stage) {
    // Start the game
    setButtonText(states.PAUSE);
    startGame();
  } else if (states.PAUSE === stage) {
    setButtonText(states.START);
    pauseGame();
  }
};

const startGame = () => {
  isPlayOn = true;
  // get all bubbles
  bubblesArray = document.querySelectorAll('.bubble');
  // resume previous bubbles animations if any
  bubblesArray.forEach(bubble => {
    bubble.style.animationPlayState = 'running';
  });
  // Start creating bubbles
  createBubbles();
};

const pauseGame = () => {
  isPlayOn = false;
  // get all bubbles
  bubblesArray = document.querySelectorAll('.bubble');
  // pause all animations
  bubblesArray.forEach(bubble => {
    bubble.style.animationPlayState = 'paused';
  });
  // stop generating bubbles for now
  clearInterval(bubbleGenerationInterval);
};

const createBubbles = () => {
  // Set Intervals for 1 sec
  // create bubble with random size
  bubbleGenerationInterval = setInterval(() => {
    createRandomSizedBubble();
  }, 1000);
};

const createRandomSizedBubble = () => {
  // Using factory function for creating bubbles
  const bubble = createBubble(playArenaOffsets);
  // Assign animations to bubble
  assignAnimationToBubble(bubble, playArenaOffsets, sliderSpeed);
  // Add click event listener to bubble
  bubble.addEventListener('click', handleBubbleClick);
  // Add animation end event listener to bubble
  bubble.addEventListener('animationend', handleBubbleAnimationEnd);
  // append bubble to play arena in DOM
  playArenaElem.appendChild(bubble);
};

const handleBubbleClick = event => {
  if (isPlayOn) {
    // add point to tally
    addPoints(event.target?.value);
    // destroy bubble
    destroyBubble(event.target);
  }
};

const handleBubbleAnimationEnd = event => {
  event.target?.remove();
};

const addPoints = value => {
  score += value;
  setScore(score);
};

const destroyBubble = target => {
  target?.remove();
};

const initApp = () => {
  setScore(0);
  setButtonText(states.START);
  getSliderSpeed();
  setSliderSpeedLabel();
  createAnimationStyle(playArenaOffsets);
  actionBtnElem.addEventListener('click', btnClick);
  speedSliderElem.addEventListener('input', handleSliderInput);
  speedSliderElem.addEventListener('change', handleSliderChange);
};

initApp();
