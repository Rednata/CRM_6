import { fetchSenderEdit, fetchSender } from './fetchControl.js';
import { toBase64 } from './getImgFile.js';

const isDiscountChecked = (target) => {
  const discountInput = document.querySelector('.discount__input');  
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

const getValidInputValue = (target, reg) => {
  target.addEventListener('input', () => {
    target.value = target.value.replace(reg, '');
  });
};

const getValidInputValueDescript = (target, reg) => {
  target.addEventListener('input', () => {
    const labelTextarea = document.querySelector('.item_descript>.item__label');
    target.value = target.value.replace(reg, '');
    if (target.value.length < 80) {
      target.classList.toggle('item__textarea_active');
      labelTextarea.textContent = 'Описание должно быть не менее 80 символов';
      labelTextarea.classList.add('item__label_active');
    } else {
      target.classList.toggle('item__textarea_active');
      labelTextarea.textContent = 'Описание';
      labelTextarea.classList.remove('item__label_active');
    }
  });
};

const validForm = () => {
  const form = document.querySelector('.form');
  const inputTitle = form.querySelector('#title');
  const inputCategory = form.querySelector('#category');
  const inputDescript = form.querySelector('#descript');
  const inputUnits = form.querySelector('#units');
  const inputCount = form.querySelector('#count');
  const inputPrice = form.querySelector('#price');
  const inputDiscount = form.querySelector('.discount__input');

  form.addEventListener('click', ({target}) => {
    if (target === inputDescript) {
      const reg = /[^А-ЯЁ ]/i;
      getValidInputValueDescript(target, reg);
    }

    if (target === inputTitle
      || target === inputCategory) {
      console.log('Идет валидация');
      const reg = /[^А-ЯЁ ]/i;
      getValidInputValue(target, reg);
    } else if (target === inputUnits) {
      const reg = /[^А-ЯЁ]/i;
      getValidInputValue(target, reg);
    } else if (target === inputCount
      || target === inputPrice
      || target === inputDiscount) {
      const reg = /[^0-9]/;
      getValidInputValue(target, reg);
    }
  });
};

const submitForm = (goodId) => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const target = e.target;
    const formData = new FormData(target);
    const newGood = Object.fromEntries(formData);

    if (newGood.file.size > 0) {
      newGood.image = await toBase64(newGood.file);
    }

    if (newGood.descript.length < 80) {
      const labelTextarea = document.querySelector('.item_descript>.item__label');
      labelTextarea.textContent = 'Описание должно быть не менее 80 символов';
      labelTextarea.classList.add('item__label_active');
    } else {
      if (goodId) {
        // console.log(newGood);
        fetchSenderEdit(newGood, goodId);
      } else {
        fetchSender(newGood, 'goods');
      }
      resetForm();
    }
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

export {changeForm, submitForm, resetForm, getModalSumZero, closeModal, validForm};
