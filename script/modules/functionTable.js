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

const openNewWin = (url) => {
  const screenWidth = screen.width;
  const screenHeight = screen.height;
  const newWin = window.open(url, '', 'width=600,height=600');
  newWin.moveTo((screenWidth / 2 - 300), (screenHeight / 2) - 300);
  return newWin;
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
      target.closest('tr').classList.add('tr_black-active');
      const goodId = currentRow.firstChild.textContent;
      const getItem = await fetchLoader(`goods/${goodId}`, () => {});
      const url = 'https://determined-painted-hawthorn.glitch.me/' + getItem.image;

      const newWinImg = openNewWin(url);
      console.dir(newWinImg);
      new Promise(resolve => {
        if (newWinImg.closed) {
          resolve();
        }
      })
          .then(() => {
            console.log('++++++');
            target.closest('tr').classList.remove('tr_black-active');
          });
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

const pasteCurrentRow = () => {
  tableBody.addEventListener('mouseover', ({target}) => {
    if (target.closest('tr')) {
      target.closest('tr').classList.add('tr_active');
    }
  });
};

const unPasteCurrentRow = () => {
  tableBody.addEventListener('mouseout', ({target}) => {
    if (target.closest('tr')) {
      target.closest('tr').classList.remove('tr_active');
    }
  });
};

export { getSumTable, deleteItem, onViewPictureButtonClick, 
  getSumProperty, onEditButtonClick, pasteCurrentRow, unPasteCurrentRow };
