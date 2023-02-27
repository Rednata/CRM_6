import { getSumTable, getSumProperty } from './functionTable.js';

const tableBody = document.querySelector('.tbody');
const vendorCodeId = document.querySelector('.vendor-code__id');

const createRow = (item) => {
  const {
    id = vendorCodeId.textContent,
    title,
    price,
    category,
    count,
    units,
  } = item;

  const url = '../assets/pic.jpg';

  const row = document.createElement('tr');
  const sum = getSumProperty(price, count);

  item.sum = sum;

  row.insertAdjacentHTML('afterbegin',
      `<td id="product-id">${id}</td>
      <td>${title}</td>
      <td>${category}</td>
      <td>${units}</td>
      <td>${count}</td>
      <td>${price}</td>
      <td>${sum}</td>
      <td>
        <button class="td__btn td__btn_picture" data-pic='${url}'>
          <img src="assets/clarity_picture-line.svg" 
        </button>
      </td>
      <td>
      <button class="td__btn td__btn_edit">
        <img src="assets/icons_edit.svg" 
    </button>
      </td>
      <td>
        <button class="td__btn td__btn_cart">
          <img src="assets/cart.svg" 
          alt="Корзина для удаления товара" class="td__img">
        </button>
      </td>`);
  tableBody.append(row);
};

//  Сокращенный вариант:
// const renderGoods = (goods) => goods.forEach(createRow);

const renderGoods = (goods) => {
  const tbody = document.querySelector('.tbody');
  tbody.innerHTML = '';
  goods.forEach(item => {
    createRow(item);
  });
  getSumTable(goods);
};

const renderConfirmDeleteModal = () => {
  const div = document.createElement('div');
  div.style.cssText = `
    display: flex;
    gap: 20px;
    flex-direction: column;
    color: #ffffff;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100px;
    width: 320px;
    z-index: 100;
    background-color: #6e6893;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    `;
  div.textContent = 'Вы точно хотите удалить этот товар?';
  const btnWrap = document.createElement('div');
  btnWrap.style.cssText = `
    display: flex;
    gap: 30px;
  `;
  const btnYes = document.createElement('button');
  btnYes.textContent = 'Да';
  const btnNo = document.createElement('button');
  btnNo.textContent = 'Нет';
  btnYes.style.cssText = `
    height: 25px;
    width: 60px;
    border-radius: 10px;
    border: none;
  `;
  btnNo.style.cssText = `
    height: 25px;
    width: 60px;
    border-radius: 10px;
    border: none;
  `;
  btnWrap.append(btnYes, btnNo);
  div.append(btnWrap);
  document.body.append(div);
  return {div, btnYes, btnNo};
};

export {renderGoods, createRow, renderConfirmDeleteModal};


