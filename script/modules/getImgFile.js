
export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', () => {
      resolve(reader.result);
    });
    reader.addEventListener('error', err => {
      reject(err);
    });
    reader.readAsDataURL(file);
  });

const previewImg = () => {
  const fileInput = document.querySelector('.form__input');
  const errorMessage = document.querySelector('.size__message');
  const formWrapperLabelImg = document.querySelector('.form__wrapper-label-img');

  fileInput.addEventListener('change', () => {
    errorMessage.innerHTML = '';

    if (document.querySelector('.form__img')) {
      document.querySelector('.form__img').remove();
    }

    if (fileInput.files.length > 0) {
      const sizeImg = fileInput.files[0].size;

      if (sizeImg < 1048576) {
        // formWrapperLabelImg.className = 'form__addImg';
        const previewImg = document.createElement('img');
        previewImg.classList.add('form__img');
        formWrapperLabelImg.append(previewImg);
        const src = URL.createObjectURL(fileInput.files[0]);
        previewImg.src = src;
      } else {
        errorMessage.textContent = 'Изображение не должно превышать размер 1 Мб';
        formWrapperLabelImg.classList.add('form__addImg_error');
      }
    }
  });
};

export {previewImg};
