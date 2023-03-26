import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const timerContainerEl = document.querySelector('.timer');
timerContainerEl.style.display = 'flex';
timerContainerEl.style.gap =20 + 'px';

const timerFieldEl = document.querySelectorAll('.field');
timerFieldEl.forEach((element) => {
element.style.display = 'flex';
element.style.flexDirection = 'column';
element.style.justifyContent = 'center';
element.style.alignItems = 'center';

element.firstElementChild.style.fontSize = 30 + 'px';
element.firstElementChild.style.fontWeight = 500;

element.lastElementChild.style.textTransform = 'uppercase';
element.lastElementChild.style.fontSize = 12 + 'px';
})


const dataDaysEl = document.querySelector('[data-days]');
const dataHoursEl = document.querySelector('[data-hours]');
const dataMinutesEl = document.querySelector('[data-minutes]');
const dataSecondsEl = document.querySelector('[data-seconds]');

const btnStart = document.querySelector('[data-start]');
btnStart.disabled = true;
btnStart.addEventListener('click', onBtnStartClick);


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0].getTime());
      if (selectedDates[0].getTime() < new Date().getTime()) {
        Notify.failure('Please choose a date in the future', {position: 'center-top',} 
        );
          // alert('Please choose a date in the future');
          return; 
      }
      btnStart.disabled = false;
      return;
  },
};
const calendar = flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
      return value.toString().padStart(2, '0');
    }


function onBtnStartClick() {
  btnStart.disabled = true;
  
  const timerId = setInterval(() => {
    const selectedDate = calendar.selectedDates[0];
    const timeDifference = selectedDate.getTime() - Date.now();
    if (timeDifference <= 0) {
        clearInterval(timerId);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    dataDaysEl.textContent = addLeadingZero(days);
    dataHoursEl.textContent = addLeadingZero(hours);
    dataMinutesEl.textContent = addLeadingZero(minutes);
    dataSecondsEl.textContent = addLeadingZero(seconds);

  }, 1000)
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}




// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}








