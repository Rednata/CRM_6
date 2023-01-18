import { renderGoods } from './render.js';
import { changeForm, resetForm, submitForm } from './functionForm.js';
import { getSumTable } from './functionTable.js';
import { showModal } from './showModal.js';


const url = 'https://determined-painted-hawthorn.glitch.me/api/goods';

const fetchLoader = async () => {
  const response = await fetch(url);
  if (response.ok) {
    const goods = await response.json();
    renderGoods(goods);
    getSumTable(goods);
  } else {
    const cmsContainer = document.querySelector('.cms__title');
    const h2 = document.createElement('h2');
    h2.style.cssText = 'color: red; fontSize: 30px';
    h2.textContent = 'Ошибка сервера';
    cmsContainer.prepend(h2);
  }
};

const fetchSender = async (good) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        title: good.title,
        description: good.descript,
        category: good.category,
        price: good.price,
        units: good.units,
        count: good.count,
        discount: good.discount_descript,
      }),
      headers: {'Content-Type': 'application/json'},
    });

    if (response.ok) {
      resetForm();
      fetchLoader();
      document.querySelector('.overlay').remove();

      return;
    }

    const responseJSON = await response.json();
    throw new Error(`поле ${responseJSON.errors[0].field}: ${responseJSON.errors[0].message}`);
  }
  catch (err) {
    // textErrorInModal(err);
  }
};

const fetchLoaderEdit = async (goodId) => {
  const response = await fetch(url + `/${goodId}`);
  const good = await response.json();
  await showModal(good);
  changeForm();
  submitForm(goodId);

}

const fetchSenderEdit = async (good, goodId) => {
  await fetch(url + `/${goodId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: good.title,
      description: good.descript,
      price: good.price,
      category: good.category,
      units: good.units,
      count: good.count,
      discount: good.discount_descript,
    }),
    headers: {'Content-Type': 'application/json'},
  });

  resetForm();
  fetchLoader();
  document.querySelector('.overlay').remove();
};

const fetchDelete = async (goodId) => {
  await fetch(url + `/${goodId}`, {
    method: 'DELETE'});
  fetchLoader();
};


export {fetchLoader, fetchSender, fetchDelete, fetchSenderEdit, fetchLoaderEdit};
