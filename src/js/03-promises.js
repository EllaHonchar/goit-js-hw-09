import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const { elements: { delay, step, amount }} = form;


function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setInterval(() => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay })
    } else {
      reject({ position, delay })
    }
  }, delay);
  })
  return promise;
}

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  for (let i = 1, delayTime = Number(delay.value);
    i <= Number(amount.value);
    i += 1, delayTime += Number(step.value)
  ) {
    createPromise(i, delayTime).then(onSuccess).catch(onError);
  }
};

function onSuccess ({ position, delay }) {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  };
function onError ({ position, delay }) {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  };