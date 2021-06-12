import {
  bubbleClassName,
  colors,
  bubbleSizeValues,
  animationName
} from './config';
import { randomLeftOffset } from './utils';

export const createBubble = playArenaOffsets => {
  // calculate random size
  const size = Math.floor(
    Math.random() * (bubbleSizeValues.max - bubbleSizeValues.min) +
      bubbleSizeValues.min
  );
  // create random bubble element
  const bubble = document.createElement('div');
  // assign dimensions and class
  bubble.style.width = size / 2 + 'px';
  bubble.style.height = size / 2 + 'px';
  bubble.className = bubbleClassName;
  // place bubble at random distance from left
  bubble.style.left =
    randomLeftOffset(playArenaOffsets, parseInt(bubble.style.width)) + 'px';
  // random background and border color
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  bubble.style.backgroundColor = randomColor;
  bubble.style.borderColor = randomColor;
  // set point value to bubble
  bubble.value = Math.ceil((bubbleSizeValues.max - size) / 10);

  return bubble;
};

export const assignAnimationToBubble = (
  bubble,
  playArenaOffsets,
  sliderSpeed
) => {
  bubble.style.animationName = animationName;
  bubble.style.animationDuration = playArenaOffsets.height / sliderSpeed + 's';
  bubble.style.animationTimingFunction = 'linear';
};
