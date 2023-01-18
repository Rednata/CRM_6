import { fetchDelete, fetchLoaderEdit } from './fetchControl.js';

const tableBody = document.querySelector('.tbody');
const subtitleCash = document.querySelector('.subtitle-cash');

const getSumProperty = (price, count) => price * count;
const getSumTable = (goods) => {
  const totalProductPrice = goods.reduce((acc, elem) => acc += elem.sum, 0);
  subtitleCash.textContent = totalProductPrice;
};

const deleteItem = () => {
  tableBody.addEventListener('click', ({ target }) => {
    if (target.closest('.td__btn_cart')) {
      const row = target.closest('tr');
      const currentRowId = row.querySelector('#product-id').textContent;
      fetchDelete(currentRowId);
      row.remove();
    }
  });
};

const openNewWin = (url) => {
  const screenWidth = screen.width;
  const screenHeight = screen.height;
  const newWin = window.open(url, '', 'width=600,height=600');

  newWin.moveTo((screenWidth / 2 - 300), (screenHeight / 2) - 300);
};

const onViewPictureButtonClick = () => {
  tableBody.addEventListener('click', ({ target }) => {
    if (target.closest('.td__btn_picture')) {
      const url = target.closest('.td__btn_picture').dataset.pic;
      openNewWin(url);
    }
  });
};

const onEditButtonClick = () => {
  document.body.addEventListener('click', ({target}) => {
    if (target.closest('.td__btn_edit')) {
      const currentRow = target.closest('tr');
      const goodId = currentRow.firstChild.textContent;
      fetchLoaderEdit(goodId);
    }
  });
};

export { getSumTable, deleteItem, onViewPictureButtonClick, getSumProperty, onEditButtonClick };
