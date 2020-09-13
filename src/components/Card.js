
export class Card {
  constructor({ myID, ...cardData }, cardSelector) {

    this._cardSelector = cardSelector;
    this.myID = myID;
    this._data = cardData.data;

    this.handleCardClick = cardData.handleCardClick;
    this.handleLikeClick = cardData.handleLikeClick;
    this.handleDislikeClick = cardData.handleDislikeClick;
    this.handleDeleteClick = cardData.handleDeleteClick;
    this.generateCard = this.generateCard.bind(this);
    //this.likesCount = cardData.likes.length;
    this.isLiked = this.isLiked(myID, cardData.data);
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
      this.isLiked ? this.handleDislikeClick(evt, this._data._id) : this.handleLikeClick(evt, this._data._id);
    });
    // добавим "корзину"

    //this._element.querySelector('.element__btn-trash').addEventListener('click', this._handleDeleteCard);
    this._element.querySelector('.element__btn-trash').addEventListener('click', () => {
      this.handleDeleteClick(this._data._id);
    });

  }

  activateLike(data) {
    this._element.querySelector('.element__like-sum').textContent = data.likes.length;
    this._element.querySelector('.element__btn-like').classList.add("element__btn-like_active");
  }

  disactivateLike(data) {
    this._element.querySelector('.element__like-sum').textContent = data.likes.length;
    this._element.querySelector('.element__btn-like').classList.remove("element__btn-like_active");
  }

  correctLike() {
    this.isLiked ? this.activateLike(this._data) : this.disactivateLike(this._data);
  }

  renderLikes(likesCount, isLiked) {
    this._element.querySelector('.element__like-sum').textContent = likesCount;
    if (isLiked)  {
      this._element.querySelector('.element__btn-like').classList.add("element__btn-like_active");
    }
    else {
      this._element.querySelector('.element__btn-like').classList.remove("element__btn-like_active"); 
      };
  }

  removeCard() {
    this._element.remove();
  }

  isLiked(myID, cardData) {
    return cardData.likes.some((person) => person._id === myID);
  }

  _correctBtnDelete(userID, ownerID) {
    if (userID === ownerID) {
      this._element.querySelector('.element__btn-trash').classList.add("element__btn-trash_active");
    }
  }

  generateCard() {
    // Запишем разметку в приватное поле _element. 
    // Так у других элементов появится доступ к ней.
    this._element = this._getTemplate();

    //Добавим обработчики событий
    this._setEventListeners();

    // Добавим данные

    this._element.querySelector('.element__like-sum').textContent = this._data.likes.length;
    this._element.querySelector('.element__title').textContent = this._data.name;
    const cardImg = this._element.querySelector('.element__img');

    cardImg.src = this._data.link;
    cardImg.alt = this._data.name;

    //установим видимость кнопки только для вновь добавляемых карточек
    this._correctBtnDelete(this.myID, this._data.owner._id);
    
    //проставим количество лайков и состояние лайка для текущего пользователя
    this.renderLikes(this._data.likes.length, this.isLiked);

    // Вернём элемент наружу
    return this._element;
  }

}


/*
export class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._cardSelector = cardSelector;
    this.name = data.name;
    this.link = data.link;
    this.likes = data.likes;
    this.ownerId = data.owner._id;
    this.id = data._id;

    this._handleCardClick = handleCardClick;
    this._handleChangeLike = this._handleChangeLike.bind(this);
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
    this._element.querySelector('.element__img').addEventListener('click', this._handleCardClick);

    //поставим сердечку обработчик клика
    this._element.querySelector('.element__btn-like').addEventListener('click', this._handleChangeLike);

    // добавим "корзину"
    this._element.querySelector('.element__btn-trash').addEventListener('click', this._handleDeleteCard);

  }

  _handleChangeLike(event) {
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
*/