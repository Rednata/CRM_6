import { fetchSenderEdit, fetchSender } from './fetchControl.js';

const isDiscountChecked = (target) => {
  const discountInput = document.querySelector('.discount__input');
  console.log('===============', discountInput);
  if (target.checked) {
    discountInput.disabled = false;
  } else {
    discountInput.disabled = true;
    discountInput.value = '';
  }
};

const getModalSum = (price, count) => {
  const form = document.querySelector('.form');
  form.querySelector('.footer__sum-cash').textContent = (price * count) || 0;
};

const getModalSumZero = () => {
  const form = document.querySelector('.form');
  form.querySelector('.footer__sum-cash').textContent = '';
};

const changeForm = () => {
  const form = document.querySelector('.form');
  const discountCheckbox = form.querySelector('.discount__checkbox');
  const itemInputCount = form.querySelector('.item__input_count');
  const itemInputPrice = form.querySelector('.item__input_price');
  form.addEventListener('change', ({ target }) => {
    if (target === discountCheckbox) {
      isDiscountChecked(target);
    }

    if (target === itemInputCount) {
      getModalSum(itemInputCount.value, itemInputPrice.value);
    }
    if (target === itemInputPrice) {
      getModalSum(itemInputPrice.value, itemInputCount.value);
    }
  });
};

const resetForm = () => {
  const form = document.querySelector('.form');  
  form.reset();
};

const submitForm = (goodId) => {
  const form = document.querySelector('.form');
  console.log(form);
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const target = e.target;
    const formData = new FormData(target);
    const newGood = Object.fromEntries(formData);
    console.log(newGood);
    if (goodId) {
      fetchSenderEdit(newGood, goodId)
    } else {
      fetchSender(newGood);
    }
    resetForm();
  });
};

const closeModal = () => {
  const overlay = document.querySelector('.overlay');
  overlay.addEventListener('click', ({target}) => {
    if (
      target.classList.contains('overlay') ||
      target.closest('.close__modal')) {
      overlay.remove()
    }
  });
};

export {changeForm, submitForm, resetForm, getModalSumZero, closeModal};
