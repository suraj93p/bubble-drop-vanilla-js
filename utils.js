import { animationName } from './config';

export const randomLeftOffset = (playArenaOffsets, bubbleStyleWidth) => {
  const randomPosInPlayArena = Math.random() * playArenaOffsets.width;
  const rightEdgeLimit = bubbleStyleWidth + playArenaOffsets.borderWidth;
  const rightOffset =
    randomPosInPlayArena + bubbleStyleWidth > playArenaOffsets.width
      ? rightEdgeLimit + playArenaOffsets.parentHeight
      : 0;

  return randomPosInPlayArena - rightOffset;
};

export const computePlayArenaOffsets = (playArenaElem, appContainerElem) => {
  return {
    leftOffset: playArenaElem.offsetLeft,
    topOffset: playArenaElem.offsetTop,
    borderWidth: parseInt(getComputedStyle(playArenaElem).borderWidth),
    width: playArenaElem.offsetWidth,
    height: playArenaElem.offsetHeight,
    parentHeight: parseInt(getComputedStyle(appContainerElem).borderWidth)
  };
};

export const createAnimationStyle = playArenaOffsets => {
  let styleSheet;
  if (!styleSheet) {
    styleSheet = document.createElement('style');
    document.head.appendChild(styleSheet);
  }
  styleSheet.sheet.insertRule(
    `
    @keyframes ${animationName} {
      0%   { top: 0;     }
      100% { top: ${playArenaOffsets.height}px; }
    }`
  );
};
