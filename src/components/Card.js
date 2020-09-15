export class Card {
  constructor({ myID, ...cardData }, cardSelector) {

    this._cardSelector = cardSelector;
    this.myID = myID;
    this._data = cardData.data;

    this.handleCardClick = cardData.handleCardClick;
    this.handleLikeClick = cardData.handleLikeClick;
    this.handleDislikeClick = cardData.handleDislikeClick;
    this.handleDeleteClick = cardData.handleDeleteClick;
    this._isLiked = this._isLiked(myID, this._data);
    this._likes = this._data.likes.length;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._cardSelector).content.children[0];
    this._element = cardTemplate.cloneNode(true);
    return this._element;

  }


  _setEventListeners() {
    //поставим обработчик "всплывающей картинки"
    this._element.querySelector('.element__img').addEventListener('click', this.handleCardClick);

    //поставим сердечку обработчик клика
    this._element.querySelector('.element__btn-like').addEventListener('click', (evt) => {
      this._isLiked ? this.handleDislikeClick(evt, this._data._id) : this.handleLikeClick(evt, this._data._id);
    });

    // добавим "корзину"
    this._element.querySelector('.element__btn-trash').addEventListener('click', () => {
      this.handleDeleteClick(this._data._id);
    });
  }


  _renderLikes() {
    this._element.querySelector('.element__like-sum').textContent = this._likes;
  }


  _renderLikesBtn() {
    if (this._isLiked) {
      this._element.querySelector('.element__btn-like').classList.add('element__btn-like_active');
    }
    else {
      this._element.querySelector('.element__btn-like').classList.remove('element__btn-like_active');
    };
  }


  removeCard() {
    this._element.remove();
  }


  updateLikes(data) {
    this._isLiked = !this._isLiked;
    this._likes = data.likes.length;
    this._renderLikes();
    this._renderLikesBtn();
  }


  _isLiked(myID, cardData) {
    return cardData.likes.some((person) => person._id === myID);
  }


  _correctBtnDelete(userID, ownerID) {
    if (userID === ownerID) {
      this._element.querySelector('.element__btn-trash').classList.add('element__btn-trash_active');
    }
  }


  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    //Добавим обработчики событий
    this._setEventListeners();

    // Добавим данные
    this._element.querySelector('.element__like-sum').textContent = this._likes;
    this._element.querySelector('.element__title').textContent = this._data.name;
    const cardImg = this._element.querySelector('.element__img');

    cardImg.src = this._data.link;
    cardImg.alt = this._data.name;

    //установим видимость кнопки только для вновь добавляемых карточек
    this._correctBtnDelete(this.myID, this._data.owner._id);

    //проставим количество лайков и состояние лайка для текущего пользователя

    this._renderLikes();
    this._renderLikesBtn();

    // Вернём элемент наружу
    return this._element;
  }
}