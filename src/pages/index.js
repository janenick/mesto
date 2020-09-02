// импорт из других файлов
import { initialCards } from '../utils/initial-cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/formValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
} from '../utils/constants.js';

import './index.css'; // импорт главного файла стилей

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
  (values) => {
    infoUser.setUserInfo({ name: values['name-input'], info: values['status-input'] });
  }
);

infoPopup.setEventListeners();

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card({
      data: item,
      handleCardClick: () => {
        imgPopup.openPopup(item);
      }
    }, '#element-template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, cardListSelector);

const addCardPopup = new PopupWithForm('.popup_type_new-place',
  '.popup__btn-close',
  '.popup__input_type_new-place-name',
  '.popup__input_type_new-place-img',
  '.popup__input',
  (values) => {
    cardList.renderItem({ name: values['new-place-name-input'], link: values['new-place-img-input'] });
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

cardList.renderItems();