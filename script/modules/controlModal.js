import { showModal } from './showModal.js';
import { changeForm, submitForm } from './functionForm.js';

const onfeaturesButtonClick = () => {
  const featuresButton = document.querySelector('.features__button');
  featuresButton.addEventListener('click', async () => {
    await showModal();
    changeForm();
    submitForm();
  });

};

export {onfeaturesButtonClick};
