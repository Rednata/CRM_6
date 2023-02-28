import { fetchLoader } from './fetchControl.js';

const createOptionsElements = (category) => {  
  const options = category.map(elem => {
    const option = document.createElement('option');
    option.value = elem;
    return option;
  });
  const datalist = document.getElementById('category-list');
  datalist.append(...options);
};

export const renderDatalist = () => {  
  fetchLoader('category', createOptionsElements);
};
