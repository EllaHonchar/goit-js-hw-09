function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
//console.log(startBtn);
//console.log(stopBtn);
startBtn.addEventListener('click', () => {
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
}, 1000);
    stopBtn.disabled = false;
    startBtn.disabled = true;
});

stopBtn.addEventListener('click', () => {
    clearInterval(timerId);
    stopBtn.disabled = true;
    startBtn.disabled = false;
});


