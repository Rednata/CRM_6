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
          <img src="./assets/clarity_picture-line.svg" 
        </button>
      </td>
      <td>
      <button class="td__btn td__btn_edit">
        <img src="./assets/icons_edit.svg" 
    </button>
      </td>
      <td>
        <button class="td__btn td__btn_cart">
          <img src="./assets/cart.svg" 
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

export {renderGoods, createRow};


