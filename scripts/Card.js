import { showImage } from './index.js';
/*import { openPopup, closePopup } from './utils.js';
import { popupProfileInfo, popupNewPlace, popupBigImg } from './constants.js'; // попапы
import { closeButton, closeButtonNewPlace, closeButtonBigImg } from './constants.js'; // кнопки закрытия попапов
import { cardBigImg, captionBigImg } from './constants.js'; // элементы попапа с всплывающей большой картинкой (popupBigImg)
*/

export class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector;
    this.name = data.name;
    this.link = data.link;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.children[0];
    this._element = cardTemplate.cloneNode(true);
    return this._element;

  }

  _setEventListeners() {
    //поставим обработчик "всплывающей картинки"
    this._element.querySelector('.element__img').addEventListener('click', showImage);

    //поставим сердечку обработчик клика
    this._element.querySelector('.element__btn-like').addEventListener('click', this._handleСhangeLike);

    // добавим "корзину"
    this._element.querySelector('.element__btn-trash').addEventListener('click', this._handleDeleteCard);

    // обработчик закрытия попапа "всплывающей картинки"
    //closeButtonBigImg.addEventListener('click', this._handleCloseBigImage);

  }

 /* _handleShowBigImage = () => {

    cardBigImg.src = this.link;
    captionBigImg.textContent = this.name;
    openPopup(popupBigImg);
  }

  _handleCloseBigImage() {
    closePopup(popupBigImg);
  }
*/
  _handleСhangeLike (event) {
    // в переменной eventTarget окажется элемент
    // button, на который мы кликнули
    const eventTarget = event.target;
    eventTarget.classList.toggle("element__btn-like_active");

  }

  _handleDeleteCard = () => {

    this._element.remove();
  }

  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    // Добавим обработчики событий
    this._setEventListeners();

    // Добавим данные

    this._element.querySelector('.element__title').textContent = this.name;
    const cardImg = this._element.querySelector('.element__img');

    cardImg.src = this.link;
    cardImg.alt = this.name;

    // Вернём элемент наружу
    return this._element;
  }

}
