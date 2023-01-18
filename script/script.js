import { fetchLoader } from './modules/fetchControl.js';
import { onfeaturesButtonClick } from './modules/controlModal.js';
import { deleteItem, onEditButtonClick, onViewPictureButtonClick } from './modules/functionTable.js';

const init = () => {
  fetchLoader();
  onfeaturesButtonClick();
  onViewPictureButtonClick();
  deleteItem();
  onEditButtonClick();
};

init();
