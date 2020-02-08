const workMinutes = 20;
const breakMinutes = 5;
const gap = 60 * 1000;
const dingCount = 3;

let dingIndex;
let startButton;
let message;
let minutesLeft;
let currentMinutes;
let dinger;

function startWorking() {
  currentMinutes = workMinutes;
  minutesLeft.innerText = currentMinutes;
  message.innerText = 'You are working productively.';
  document.title = 'Working: ' + currentMinutes;
  startButton.style.visibility = 'hidden';
  setTimeout(tickWork, gap);
}

function startBreaking() {
  dingIndex = 0;
  dinger.play();
  currentMinutes = breakMinutes;
  minutesLeft.innerText = currentMinutes;
  document.title = 'Breaking: ' + currentMinutes;
  message.innerText = 'You are taking a healthy break.';
  setTimeout(tickBreak, gap); 
}

function tickWork() {
  --currentMinutes;
  minutesLeft.innerText = currentMinutes;
  document.title = 'Working: ' + currentMinutes;
  if (currentMinutes > 0) {
    setTimeout(tickWork, gap);
  } else {
    startBreaking();
  }
}

function tickBreak() {
  --currentMinutes;
  minutesLeft.innerText = currentMinutes;
  document.title = 'Breaking: ' + currentMinutes;
  if (currentMinutes > 0) {
    setTimeout(tickBreak, gap);
  } else {
    dingIndex = 0;
    dinger.play();
    message.innerText = 'You may resume working.';
    startButton.style.visibility = 'visible';
  }
}

function initialize() {
  startButton = document.getElementById('start-button');
  minutesLeft = document.getElementById('minutes-left');
  message = document.getElementById('message');
  dinger = document.getElementById('dinger');

  dinger.addEventListener('ended', () => {
    ++dingIndex; 
    if (dingIndex < dingCount) {
      dinger.play();
    }
  });

  startButton.addEventListener('click', startWorking);
}

window.addEventListener('load', initialize);
