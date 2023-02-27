import { fetchLoader } from './fetchControl.js';

export const makeSearch = () => {
  const feautersForm = document.querySelector('.features__form');
  const inputSearch = document.querySelector('.features__input');

  feautersForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  inputSearch.addEventListener('change', (e) => {
    const searchValue = feautersForm.search.value;
    setTimeout(() => {
      const queryArray = fetchLoader(`goods/?search=${searchValue}`);
      queryArray.then(query => {
        if (!query.length) {
          const p = document.createElement('p');
          p.textContent = 'По Вашему запросу ничего не найдено';
          p.style.cssText = `
            color: #8f80b9;
            font-size: 20px
          `;
          document.querySelector('h1').after(p);
          setTimeout(() => {
            p.remove();
          }, 3000);
        }
      }, 300);
    });
  });
};
