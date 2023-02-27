import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const { target } = event;
  const formElements = target.elements;
  const delay = +formElements.delay.value;
  const step = +formElements.step.value;
  const amount = +formElements.amount.value;

  Array.from({length: amount}).forEach(function(elem, i) {
    createPromise(i + 1, delay + step * i)
      .then(Notify.success)
      .catch(Notify.failure);
  })
  target.reset();
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        return resolve(`✅ Fulfilled promise ${position} in ${delay}ms`); 
      } else {
        return reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  })
}
