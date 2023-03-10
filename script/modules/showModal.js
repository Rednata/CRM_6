import {loadStyle} from './loadStyle.js';
import { closeModal } from './functionForm.js';

const showModal = async (goodEdit) => {
  await loadStyle('./style/crm.css');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay');
  overlay.insertAdjacentHTML('afterbegin',
      `
      <div class="container-crm">
      <div class="error">
        <button class="close error__close">
          <span class="close__dush close__dush_first"></span>
          <span class="close__dush close__dush_second"></span>
        </button>
    
        <div class="error__title">      
          Что-то пошло не так
        </div>
      </div>
    
        <button class="close close__modal">
          <span class="close__dush close__dush_first"></span>
          <span class="close__dush close__dush_second"></span>
        </button>
        <form class="form" action="https://jsonplaceholder.typicode.com/posts" method="post">
          
          <div class="form__wrapper-title">
            <h1 class="form__title">Добавить товар</h1>
            <span class="form__id">ID: 
              <span class="vendor-code__id"></span>
            </span>
          </div>        
          <div class="form__inner">
            <ul class="form__list">
              <li class="item">
                <label class="item__label" for="title">Наименование</label>
                <input class="item__input" type="text" name="title" id="title" required>
              </li>
    
              <li class="item">
                <label class="item__label" for="category">Категория</label>
                <input class="item__input" type="text" name="category" id="category" list="category-list" required>
                <datalist id="category-list"></datalist>
              </li>
    
              <li class="item">
                <label class="item__label" for="units">Единицы измерения</label>
                <input class="item__input" type="text" name="units" id="units" required>
              </li>
    
              <li class="item discount">
                <fieldset class="discount__fieldset">
                  <label class="item__label" for="discount">Дисконт</label>                  
                  <div class="discount__inner">                                        
                    <input class="discount__checkbox" type="checkbox"  id="discount" name="discount">
                    <input type="text" class="discount__input" name="discount_descript" disabled>
                  </div>                  
                  </fieldset>                
              </li>
              
              <li class="item item_descript">
                <label class="item__label" for="descript">Описание</label>

                <textarea class="item__textarea" name="descript" id="descript" " required> </textarea>

              </li>
              
              <li class="item item_count">
                <label class="item__label" for="count">Количество</label>
                <input class="item__input item__input_count" type="number" name="count" id="count" required>
              </li>
              
              <li class="item">
                <label class="item__label" for="price">Цена</label>
                <input  class="item__input item__input_price" type="number" name="price" id="price" required>
              </li>            
            </ul>
            
            <div class="form__wrapper-label-img">
              <label for="file" class="form__label data-content="Добавить изображение">Добавить изображение
                <input type="file" class="form__input" name="file" id="file"  accept="image/*">
                <span class="form__label_span">Добавить изображение</span>
              </label>
              <div class="size__message">
                
              </div>
            </div>
            
          </div>  
    
          <div class="form__footer crm__footer">
            <p class="footer__sum">Итоговая стоимость: 
              <span class="footer__sum-currency">$ 
                <span class="footer__sum-cash"></span>
              </span></p>
          
            <button class="button footer__button" type="submit">Добавить товар</button>
          </div>
        </form>
        
      </div>
      `);

  if (goodEdit) {
    const {
      id,
      title,
      price,
      description,
      count,
      units,
      category,
      discount,
      image,
    } = goodEdit;

    overlay.querySelector('.vendor-code__id').textContent = id;
    overlay.querySelector('[name="title"]').value = title;
    overlay.querySelector('[name="category"]').value = category;
    overlay.querySelector('[name="units"]').value = units;
    overlay.querySelector('[name="descript"]').value = description;
    overlay.querySelector('[name="count"]').value = count;
    overlay.querySelector('[name="price"]').value = price;
    const sum = overlay.querySelector('.footer__sum-cash');
    sum.textContent = count * price;

    if (discount) {
      const discountCheckbox = overlay.querySelector('.discount__checkbox');

      discountCheckbox.classList.add('discount__checkbox_checked');
      const discountInput = overlay.querySelector('.discount__input');
      discountInput.disabled = false;

      overlay.querySelector('[name="discount_descript"]').value = discount;
    };
    if (image !== 'image/notimage.jpg') {
      const formLabelSpan = overlay.querySelector('.form__label_span');
      formLabelSpan.textContent = 'Изменить изображение';
      const formWrapperLabelImg = overlay.querySelector('.form__wrapper-label-img');       
      formWrapperLabelImg.className = 'form__addImg';
                  
        const previewImg = document.createElement('img');
        previewImg.classList.add('form__img');
        const src = 'https://determined-painted-hawthorn.glitch.me/' + image;
        previewImg.src = src;

      formWrapperLabelImg.append(previewImg)
      
    }
  }
  document.body.prepend(overlay);
  closeModal();
  return overlay.querySelector('.form');
};

export {showModal};
