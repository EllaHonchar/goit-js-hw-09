import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const inputDate = document.querySelector('#datetime-picker');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const options = {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,

        onClose(selectedDates) {

        if ( selectedDates[0] < new Date()) {
        
        Notify.failure('Please choose a date in the future.')

        startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }
  },
};
//console.log(inputDate)
//console.log(options.defaultDate())
flatpickr(inputDate, options);

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

  function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}

startBtn.addEventListener('click', () => {
    const timer = setInterval(() => {
      const diff = new Date(inputDate.value) - new Date();
     
      startBtn.disabled = true;
      if (diff >= 0) {
        const timeDown = convertMs(diff);
        days.textContent = addLeadingZero(timeDown.days);
        hours.textContent = addLeadingZero(timeDown.hours);
        minutes.textContent = addLeadingZero(timeDown.minutes);
        seconds.textContent = addLeadingZero(timeDown.seconds);
      } else {
        Notify.success('Sale Day Starts Now');
        clearInterval(timer);
      }
    }, 1000);
  });
  