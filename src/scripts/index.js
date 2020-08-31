// импорт из других файлов
import { initialCards } from './initial-cards.js';
import { Card } from './card.js';
import { FormValidator } from './formValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

import {
  //элементы секции profile
  editButton, addButton,
  //элементы попапа редактирования профиля
  popupProfileForm,
  //элементы попапа добавления карточки
  popupNewPlaceForm,
   //объект настроек с классами формы
  validationParams,
  cardListSelector //класс секции для вставки карточек
} from './constants.js';

import '../pages/index.css'; // импорт главного файла стилей

const editFormValidator = new FormValidator(popupProfileForm, validationParams);
const newPlaceFormValidator = new FormValidator(popupNewPlaceForm, validationParams);
editFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();

const imgPopup = new PopupWithImage('.popup_type_img', '.popup__btn-close', '.popup__img', '.popup__caption');
imgPopup.setEventListeners();

const infoUser = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__status'
});

const infoPopup = new PopupWithForm('.popup_type_profile',
  '.popup__btn-close',
  '.popup__input_type_name',
  '.popup__input_type_status',
  '.popup__input',
  (name, info) => {
    infoUser.setUserInfo({ name: name, info: info });
  }
    );
infoPopup.setEventListeners();

const CardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        imgPopup.openPopup(item);
      }
    }, '#element-template');
    const cardElement = card.generateCard();
    CardList.addItem(cardElement);
  }
}, cardListSelector);

const addCardPopup = new PopupWithForm('.popup_type_new-place',
  '.popup__btn-close',
  '.popup__input_type_new-place-name',
  '.popup__input_type_new-place-img',
  '.popup__input',
  (name, info) => {
    CardList.renderItem({name: name, link: info});
  });
addCardPopup.setEventListeners();

// функция открытия popup редактирования профиля
function openPopupProfile() {
  editFormValidator.resetValidationErrors();
  const profileInfo = infoUser.getUserInfo();
  infoPopup.openPopup({
    name: profileInfo.name,
    info: profileInfo.info
  });
}

// функция открытия popup добавления карточки
function openPopupAdd() {
  newPlaceFormValidator.resetValidationErrors();
  addCardPopup.openPopup({
    name: '',
    info: ''
  });
}

editButton.addEventListener("click", openPopupProfile);
addButton.addEventListener("click", openPopupAdd);

CardList.renderItems();