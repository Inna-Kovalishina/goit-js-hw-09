const bodyEl = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

let timerId = null;

function onBtnStartClick() {
  timerId = setInterval(() => {
      bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000)

  btnStart.disabled = true;
  btnStop.disabled = false;
}


function onBtnStopClick() {
  clearInterval(timerId);

  btnStart.disabled = false;
  btnStop.disabled = true;
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}