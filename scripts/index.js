const allPopups = Array.from(document.querySelectorAll('.popup'));

const profileInfo = document.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__btn-edit");
const addButton = document.querySelector(".profile__btn-add");
const profileName = profileInfo.querySelector(".profile__name");
const profileStatus = profileInfo.querySelector(".profile__status");

//const popupProfileInfo = document.querySelector(".popup_type_profile");
const popupProfileForm = popupProfileInfo.querySelector(".popup__form");
const popupFormElement = popupProfileInfo.querySelector(".popup__container");
const saveButton = popupProfileInfo.querySelector(".popup__btn-save");
//const closeButton = popupProfileInfo.querySelector(".popup__btn-close");
const popupName = popupProfileInfo.querySelector(".popup__input_type_name");
const popupStatus = popupProfileInfo.querySelector(".popup__input_type_status");

//const popupNewPlace = document.querySelector(".popup_type_new-place");
const popupFormElementNewPlace = popupNewPlace.querySelector(".popup__container");
const saveButtonNewPlace = popupNewPlace.querySelector(".popup__btn-save");
//const closeButtonNewPlace = popupNewPlace.querySelector(".popup__btn-close");
const popupNameNewPlace = popupNewPlace.querySelector(".popup__input_type_new-place-name");
const popupImgNewPlace = popupNewPlace.querySelector(".popup__input_type_new-place-img");

//const popupBigImg = document.querySelector(".popup_type_img");
//const closeButtonBigImg = popupBigImg.querySelector(".popup__btn-close");
//const cardBigImg = popupBigImg.querySelector(".popup__img");
//const captionBigImg = popupBigImg.querySelector(".popup__caption");

const elementsSection = document.querySelector(".elements");
const newCardTemplate = document.querySelector("#element-template").content;

const isPopupOpened = (currentPopup) => {
  return currentPopup.classList.contains("popup_opened");
}

function togglePopup(currentPopup) {

  currentPopup.classList.toggle("popup_opened");
  if (isPopupOpened(currentPopup)) {
    addHandlerOnEscape();
  }
  else {
    removeHandlerOnEscape();

    // очистим поля заполнения
    resetPopupForm(currentPopup);
  }
}


const editPopupProfile = () => {
  togglePopup(popupProfileInfo);
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;

  // при открытии попапа установим доступность кнопки Сохранить
  toggleButtonStateOnForm(popupProfileForm, saveButton);

}

const saveProfile = (event) => {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;

  togglePopup(popupProfileInfo);
}

const changeLike = (event) => {
  // в переменной eventTarget окажется элемент
  // button, на который мы кликнули

  const eventTarget = event.target;
  eventTarget.classList.toggle("element__btn-like_active");
}

const deleteCard = (event) => {
  const eventTarget = event.target;
  const cardItem = eventTarget.closest(".element");
  cardItem.remove();
}

const showImage = (event) => {
  togglePopup(popupBigImg);
  const eventTarget = event.target;
  const cardItem = eventTarget.closest(".element");

  const cardImg = cardItem.querySelector(".element__img");

  cardBigImg.src = cardImg.src;
  captionBigImg.textContent = cardItem.querySelector(".element__title").textContent;
}

const createCard = (card) => {
  const newCardElement = newCardTemplate.cloneNode(true);
  // наполняем содержимым
  newCardElement.querySelector(".element__title").textContent = card.name;
  const cardImg = newCardElement.querySelector(".element__img");
  cardImg.src = card.link;
  cardImg.alt = card.name;

  cardImg.addEventListener("click", showImage);

  //поставим сердечку обработчик клика, при котором в консоль выводится объект evt:
  const newCardLikeButton = newCardElement.querySelector(".element__btn-like");
  newCardLikeButton.addEventListener("click", changeLike);

  // добавим "корзину"
  const newCardDelButton = newCardElement.querySelector(".element__btn-trash");
  newCardDelButton.addEventListener("click", deleteCard);

  return newCardElement;
}

const addCard = (card) => {
  elementsSection.prepend(card);
}


const renderCard = (item, cardSelector) => {
   
  const card = new Card(item, cardSelector);

  const cardElement = card.generateCard();
  return cardElement;

};


const openPopupNewPlace = () => {
  togglePopup(popupNewPlace);

  // при открытии попапа установим доступность кнопки Сохранить
  toggleButtonStateOnForm(popupNewPlace, saveButtonNewPlace);

}

const saveNewPlace = (event) => {
  event.preventDefault();
  const newCardData = {
    name: popupNameNewPlace.value,
    link: popupImgNewPlace.value,
  };

  //addCard(createCard(newCardData));
  addCard(renderCard(newCardData, ".element-template"));
  togglePopup(popupNewPlace);
}

const addCards = (arrCards) => {
  elementsSection.innerHTML = '';
  const cardSelector = ".element-template";
  arrCards.forEach((card) => {
    // отображаем на странице
    //addCard(createCard(card));
    addCard(renderCard(card, cardSelector));
  });
}

const addHandlerOnEscape = () => {
  document.addEventListener('keydown', closePopupOnEscapeHandler);
}

const removeHandlerOnEscape = () => {
  document.removeEventListener('keydown', closePopupOnEscapeHandler);
}


const closePopupOnEscapeHandler = (evt) => {

  if (evt.key === "Escape") {
    const popupElement = allPopups.find(function (popupItem) {
      return isPopupOpened(popupItem);
    });
    if (popupElement != undefined) {
      togglePopup(popupElement);
    }
  }
}

const togglePopupWithClick = (evt, currentPopup) => {
  const evtTarget = evt.target;
  if (evtTarget.classList.contains("popup_opened")) {

    togglePopup(currentPopup);
  }
}


editButton.addEventListener("click", editPopupProfile);
popupFormElement.addEventListener("submit", saveProfile);
closeButton.addEventListener("click", () => togglePopup(popupProfileInfo));

popupProfileInfo.addEventListener("mouseup", (evt) => togglePopupWithClick(evt, popupProfileInfo));
popupNewPlace.addEventListener("mouseup", (evt) => togglePopupWithClick(evt, popupNewPlace));
popupBigImg.addEventListener("mouseup", (evt) => togglePopupWithClick(evt, popupBigImg));

addButton.addEventListener("click", openPopupNewPlace);
popupFormElementNewPlace.addEventListener("submit", saveNewPlace);
closeButtonNewPlace.addEventListener("click", () => togglePopup(popupNewPlace));

closeButtonBigImg.addEventListener("click", () => togglePopup(popupBigImg));


addCards(initialCards);

export { addHandlerOnEscape, removeHandlerOnEscape};
  
  // импорт из других файлов
import { initialCards } from './initial-cards.js';
import { Card } from './Card.js';
import { resetPopupForm, toggleButtonStateOnForm } from './validate.js';
import { popupProfileInfo, popupNewPlace, popupBigImg } from './constants.js'; // попапы
import { closeButton, closeButtonNewPlace, closeButtonBigImg } from './constants.js'; // кнопки закрытия попапов
