import { showModal } from './showModal.js';
import { changeForm, submitForm, validForm } from './functionForm.js';
import { previewImg } from './getImgFile.js';

const onfeaturesButtonClick = () => {
  const featuresButton = document.querySelector('.features__button');
  featuresButton.addEventListener('click', async () => {
    await showModal();
    changeForm();
    previewImg();
    validForm();
    submitForm();
  });

};

export {onfeaturesButtonClick};
