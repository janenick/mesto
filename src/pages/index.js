// импорт из других файлов
import { initialCards } from '../utils/initial-cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/formValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  //элементы секции profile
  avatarEditButton,
  editButton, addButton,
  // элементы попапа редактирования аватара
  popupAvatarForm,
  //элементы попапа редактирования профиля
  popupProfileForm,
  //элементы попапа добавления карточки
  popupNewPlaceForm,
  //объект настроек с классами формы
  validationParams,
  cardListSelector, //класс секции для вставки карточек
  //для класса Api
  baseUrl, cohortId, token
} from '../utils/constants.js';

import './index.css'; // импорт главного файла стилей

const avatarFormValidator = new FormValidator(popupAvatarForm, validationParams);
const editFormValidator = new FormValidator(popupProfileForm, validationParams);
const newPlaceFormValidator = new FormValidator(popupNewPlaceForm, validationParams);
avatarFormValidator.enableValidation();
editFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();

const api = new Api({
  baseUrl: baseUrl + '/v1/' + cohortId,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

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
  api,
  (values) => {
    infoUser.setUserInfo({ name: values['name-input'], info: values['status-input'] });
    api.changeUserInfo({ name: values['name-input'], info: values['status-input'] });
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


const avatarPopup = new PopupWithForm('.popup_type_avatar',
  '.popup__btn-close',
  '.popup__input_type_avatar',
  '.popup__input_type_avatar',
  '.popup__input',
  () => {
    console.log('avatarPopup');
  });
avatarPopup.setEventListeners();

// функция открытия popup редактирования аватара
function openPopupAvatar() {
  avatarFormValidator.resetValidationErrors();
  //const avatarInfo = infoUser.getUserInfo();
  avatarPopup.openPopup({
    name: '',
    info: ''
  });
}

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

avatarEditButton.addEventListener("click", openPopupAvatar);
editButton.addEventListener("click", openPopupProfile);
addButton.addEventListener("click", openPopupAdd);

/*--> Получим информацию, сохраненную на сервере */

let infoUserFromServer = { name: 'нет инфо', info: 'нет инфо' };
api.getAllNeededData().then(argument => {
  console.log('argument ', argument);

  console.log('инфо о пользователе с сервера ', argument[0]);

  infoUserFromServer.name = argument[0].name;
  infoUserFromServer.info = argument[0].about;
  // внесем инфо с сервера

  infoUser.setUserInfo(infoUserFromServer);
})
  .catch((err) => {
    console.log(`Ошибка: ${err}`);

  });

/*<-- Получим информацию, сохраненную на сервере*/

/*api.changeUserInfo().then(argument => {
  
  console.log('инфо о пользователе на сервер ', argument);

  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);

  });*/

cardList.renderItems();