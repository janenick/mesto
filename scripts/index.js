// импорт из других файлов
import { initialCards } from './initial-cards.js';
import { Card } from './card.js';
import { resetPopupForm, toggleButtonStateOnForm } from './validate.js';
import {
  allPopups,
  //элементы секции profile
  editButton, addButton, profileName, profileStatus,
  //элементы попапа редактирования профиля
  popupProfileInfo, popupProfileForm, popupFormElement, saveButton, closeButton,
  popupName, popupStatus,
  //элементы попапа добавления карточки
  popupNewPlace, popupFormElementNewPlace, saveButtonNewPlace, closeButtonNewPlace,
  popupNameNewPlace, popupImgNewPlace,
  //элементы попапа "большой картинки"
  popupBigImg, closeButtonBigImg, cardBigImg, captionBigImg,
  //секция с карточками
  elementsSection
} from './constants.js';


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

export const showImage = (event) => {
  togglePopup(popupBigImg);
  const eventTarget = event.target;
  const cardItem = eventTarget.closest(".element");

  const cardImg = cardItem.querySelector(".element__img");

  cardBigImg.src = cardImg.src;
  captionBigImg.textContent = cardItem.querySelector(".element__title").textContent;
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

  addCard(renderCard(newCardData, ".element-template"));
  togglePopup(popupNewPlace);
}

const addCards = (arrCards) => {
  elementsSection.innerHTML = '';
  const cardSelector = ".element-template";
  arrCards.forEach((card) => {
    // отображаем на странице
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

