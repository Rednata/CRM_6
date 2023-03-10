import { fetchDelete, fetchLoaderEdit, fetchLoader } from './fetchControl.js';
import { changeForm, submitForm, validForm } from './functionForm.js';
import { previewImg } from './getImgFile.js';
import { renderConfirmDeleteModal } from './render.js';
import { showModal } from './showModal.js';
import {renderDatalist} from './datalist.js';

const tableBody = document.querySelector('.tbody');
const subtitleCash = document.querySelector('.subtitle-cash');

const getSumProperty = (price, count) => price * count;
const getSumTable = (goods) => {
  const totalProductPrice = goods.reduce((acc, elem) => acc += elem.sum, 0);
  subtitleCash.textContent = totalProductPrice;
};

const openNewWin = (url, currentRow) => {
  const screenWidth = screen.width;
  const screenHeight = screen.height;
  const newWin = window.open(url, '', 'width=600,height=600');
  const browser = (newWin.navigator.userAgent).toLowerCase().slice(0, 5);
  if (browser === 'safari') {
    newWin.moveToObject((screenWidth / 2 - 300), (screenHeight / 2) - 300);
  } else {
    newWin.moveTo((screenWidth / 2 - 300), (screenHeight / 2) - 300);
  }
};

const confirmDelete = (target) => {
  const modalConfirmDelete = renderConfirmDeleteModal();
  const {div, btnYes, btnNo} = modalConfirmDelete;
  const row = target.closest('tr');
  btnYes.addEventListener('click', () => {
    const currentRowId = row.querySelector('#product-id').textContent;
    fetchDelete(currentRowId);
    row.remove();
    div.remove();
  });
  btnNo.addEventListener('click', () => {
    row.classList.remove('tr_black-active');
    div.remove();
  });
};

const deleteItem = () => {
  tableBody.addEventListener('click', ({ target }) => {
    if (target.closest('.td__btn_cart')) {
      target.closest('tr').classList.add('tr_black-active');
      confirmDelete(target);
    }
  });
};

const onViewPictureButtonClick = () => {
  tableBody.addEventListener('click', async ({ target }) => {
    if (target.closest('.td__btn_picture')) {
      const currentRow = target.closest('tr');
      const goodId = currentRow.firstChild.textContent;
      const getItem = await fetchLoader(`goods/${goodId}`, () => {});
      const url = 'https://determined-painted-hawthorn.glitch.me/' + getItem.image;

      openNewWin(url, currentRow);
    }
  });
};

const onEditButtonClick = () => {
  document.body.addEventListener('click', async ({target}) => {
    if (target.closest('.td__btn_edit')) {
      const currentRow = target.closest('tr');
      const goodId = currentRow.firstChild.textContent;
      const good = await fetchLoaderEdit(`goods/${goodId}`);

      await showModal(good);
      changeForm();
      previewImg();
      validForm();
      renderDatalist();
      submitForm(goodId);
    }
  });
};


export { getSumTable, deleteItem, onViewPictureButtonClick, 
  getSumProperty, onEditButtonClick };
