import { Howl } from 'howler';

const backgroundMusic = new Howl({
  src: ['https://example.com/background-music.mp3'],
  loop: true,
  volume: 0.5,
});

const correctSound = new Howl({
  src: ['https://example.com/correct-sound.mp3'],
});

const incorrectSound = new Howl({
  src: ['https://example.com/incorrect-sound.mp3'],
});

const timerSound = new Howl({
  src: ['https://example.com/timer-sound.mp3'],
  loop: true,
  volume: 0.3,
});

const celebrationSound = new Howl({
  src: ['https://example.com/celebration-sound.mp3'],
});

export const playBackgroundMusic = () => backgroundMusic.play();
export const stopBackgroundMusic = () => backgroundMusic.stop();
export const playCorrectSound = () => correctSound.play();
export const playIncorrectSound = () => incorrectSound.play();
export const playTimerSound = () => timerSound.play();
export const stopTimerSound = () => timerSound.stop();
export const playCelebrationSound = () => celebrationSound.play();