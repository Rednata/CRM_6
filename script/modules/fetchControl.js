import { renderGoods } from './render.js';
import { changeForm, resetForm, submitForm } from './functionForm.js';
import { getSumTable } from './functionTable.js';
import { showModal } from './showModal.js';
import { previewImg } from './getImgFile.js';


const url = 'https://determined-painted-hawthorn.glitch.me/api/';

const fetchLoader = async (prefix, callback) => {
  const response = await fetch(`${url}${prefix}`);
  if (response.ok) {
    const goods = await response.json();
    if (callback) {
      callback(goods);
      return goods;
    } else {
      renderGoods(goods);
      getSumTable(goods);
      return goods;
    }
  } else {
    const cmsContainer = document.querySelector('.cms__title');
    const h2 = document.createElement('h2');
    h2.style.cssText = 'color: red; fontSize: 30px';
    h2.textContent = 'Ошибка сервера';
    cmsContainer.prepend(h2);
  }
};

const fetchSender = async (good, prefix) => {
  try {
    const response = await fetch(`${url}${prefix}`, {
      method: 'POST',
      body: JSON.stringify({
        title: good.title,
        description: good.descript,
        category: good.category,
        price: good.price,
        units: good.units,
        count: good.count,
        discount: good.discount_descript,
        image: good.image,
      }),
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    });

    if (response.ok) {
      resetForm();
      fetchLoader('goods');
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
  const response = await fetch(url + `${goodId}`);
  const good = await response.json();
  await showModal(good);
  // previewImg(good.image);
  changeForm();
  submitForm(goodId);
}

const fetchSenderEdit = async (good, goodId) => {  
  await fetch(url + `${goodId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: good.title,
      description: good.descript,
      price: good.price,
      category: good.category,
      units: good.units,
      count: good.count,
      discount: good.discount_descript,
      image: good.image,
    }),
    headers: {'Content-Type': 'application/json'},
  });

  resetForm();
  fetchLoader('goods');
  document.querySelector('.overlay').remove();
};

const fetchDelete = async (goodId) => {
  await fetch(url + `/${goodId}`, {
    method: 'DELETE'});
  fetchLoader('goods');
};


export {fetchLoader, fetchSender, fetchDelete, fetchSenderEdit, fetchLoaderEdit};
