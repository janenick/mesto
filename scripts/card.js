//import { showImage } from './index.js';

export class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._cardSelector = cardSelector;
    this.name = data.name;
    this.link = data.link;
    this._handleCardClick = handleCardClick;
    this._handleСhangeLike = this._handleСhangeLike.bind(this);
    this._handleDeleteCard = this._handleDeleteCard.bind(this);
    this.generateCard = this.generateCard.bind(this);
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.children[0];
    this._element = cardTemplate.cloneNode(true);
    return this._element;

  }

  _setEventListeners() {
    //поставим обработчик "всплывающей картинки"
    //this._element.querySelector('.element__img').addEventListener('click', showImage);
    this._element.querySelector('.element__img').addEventListener('click', this._handleCardClick);

    //поставим сердечку обработчик клика
    this._element.querySelector('.element__btn-like').addEventListener('click', this._handleСhangeLike);

    // добавим "корзину"
    this._element.querySelector('.element__btn-trash').addEventListener('click', this._handleDeleteCard);

  }

  _handleСhangeLike(event) {
    // в переменной eventTarget окажется элемент
    // button, на который мы кликнули
    const eventTarget = event.target;
    eventTarget.classList.toggle("element__btn-like_active");

  }

  _handleDeleteCard() {

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
