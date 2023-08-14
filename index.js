// ТЕСТОВОЕ ЗАДАНИЕ в компанию amoCRM
// Задание 1
// Напишите реализацию таймера.
// шаг анимации таймера 1 секунда;
// форматирование таймера строго – “hh:mm:ss”;
// в инпут можно вводить только числа.
// Например 01:12:59 - один час, 12 минут, 59 секунд.

const inputEl = document.querySelector('input')
const buttonEl = document.querySelector('button')
const timerEl = document.querySelector('span')

const SECONDS_IN_HOUR = 3600,
      SECONDS_IN_MINUTE = 60,
      INTERVAL_DELAY_MS = 1000,
      EXPECTED_TIME_UNITS = 3,
      TIME_IS_UP = 0;

const digitPairs = /\d{2}/g,
      digitsOnly = /\D/g;


const createTimerAnimator = () => {
  let intervalId;
  
  const formatTime = (hours, minutes, seconds) => {
      return `${hours.toString().padStart(2, '0')}: ${minutes.toString().padStart(2, '0')}
      :${seconds.toString().padStart(2, '0')}
      `
  }
  
  const getHoursMinutesSeconds = totalSeconds => [
      Math.floor(totalSeconds / SECONDS_IN_HOUR),
      Math.floor((totalSeconds % SECONDS_IN_HOUR) / SECONDS_IN_MINUTE),
      totalSeconds % SECONDS_IN_MINUTE
  ]
  
  return totalSeconds => {
    clearInterval(intervalId);
    let seconds = totalSeconds;
    
    const updateTimer = () => {
      seconds >= TIME_IS_UP
          ? (timerEl.textContent = formatTime(...getHoursMinutesSeconds(seconds--)))
          : clearInterval(intervalId)
    }
    updateTimer();
    intervalId = setInterval(updateTimer, INTERVAL_DELAY_MS)
  }
}
const animateTimer = createTimerAnimator();
const handleInput = () => {
  inputEl.value = inputEl.value.replace(digitsOnly, '');
}
const isValidInput = timeUnits => timeUnits && timeUnits.length === EXPECTED_TIME_UNITS;

const startTimer = () => {
  const timeUnits = inputEl.value.match(digitPairs);
  
  if (isValidInput(timeUnits)) {
    const [
        hours,
        minutes,
        seconds
    ] = timeUnits.map(part => parseInt(part || TIME_IS_UP))
    
    const totalSeconds = hours * SECONDS_IN_HOUR + minutes * SECONDS_IN_MINUTE + seconds
    
    animateTimer(totalSeconds);
  }

  inputEl.value = '';
}


inputEl.addEventListener('input', handleInput);
buttonEl.addEventListener('click', startTimer)


