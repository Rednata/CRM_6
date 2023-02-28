import { fetchLoader } from './modules/fetchControl.js';
import { onfeaturesButtonClick } from './modules/controlModal.js';
import {makeSearch} from './modules/search.js';
import {
  deleteItem, onEditButtonClick, onViewPictureButtonClick,
  pasteCurrentRow, unPasteCurrentRow } from './modules/functionTable.js';

const init = () => {
  fetchLoader('goods');
  onfeaturesButtonClick();
  onViewPictureButtonClick();
  deleteItem();
  onEditButtonClick();
  pasteCurrentRow();
  unPasteCurrentRow();  
  makeSearch();
};

init();
