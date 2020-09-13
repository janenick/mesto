// импорт из других файлов
import { initialCards } from '../utils/initial-cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/formValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupConfirm from '../components/PopupConfirm.js';

import {
  //элементы секции profile
  editButton, addButton,
  // элементы попапа редактирования аватара
  popupAvatarForm, avatarBox,
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

let myID;
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

const DelSubmitPopup = new PopupConfirm('.popup_type_delete-submit',
  '.popup__btn-close',
  () => {
    console.log('удаляем карточку');
  });
DelSubmitPopup.setEventListeners();


const imgPopup = new PopupWithImage('.popup_type_img', '.popup__btn-close', '.popup__img', '.popup__caption');
imgPopup.setEventListeners();

const infoUser = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__status',
  avatarSelector: '.profile__avatar-box'
  //avatarSelector: '.profile__avatar-img' // аватар как img
});

const infoPopup = new PopupWithForm('.popup_type_profile',
  '.popup__btn-close',
  '.popup__input_type_name',
  '.popup__input_type_status',
  '.popup__input',
  {
    handleFormSubmit: (values) => {
      infoUser.setUserInfo({ name: values['name-input'], info: values['status-input'] });
      api.changeUserInfo({ name: values['name-input'], info: values['status-input'] });
    }
  }
);

infoPopup.setEventListeners();

/*const cardList = new Section({
  //items: initialCards, // передадим снаружи
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
}, cardListSelector);*/

const cardList = new Section(cardListSelector);

const createCard = (result, cardSelector) => {
  const card = new Card({
    myID: myID,
    data: result,
    handleCardClick: () => {
      imgPopup.openPopup(result);
    },
    handleLikeClick: (id) => {
      console.log('Вы нажали лайк');
    },
    handleDislikeLikeClick: (id) => {
      console.log('Вы нажали дизлайк');
    },
    handleDeleteClick: (id) => {
      DelSubmitPopup.setSubmitAction(() => {
        api.removeCard(id).then(res => {
          console.log('Delete', id);
          card.removeCard();

        }).catch(err => console.error(err));
      }
      );
      DelSubmitPopup.openPopup();
    }

  }, cardSelector);
  return card;
}
    
const addCardPopup = new PopupWithForm(
  '.popup_type_new-place',
  '.popup__btn-close',
  '.popup__input_type_new-place-name',
  '.popup__input_type_new-place-img',
  '.popup__input',

  /*(values) => {
    cardList.renderItem({ name: values['new-place-name-input'], link: values['new-place-img-input'] });
  }*/
  {
    handleFormSubmit: (values) => {
      api.addNewCard({ name: values['new-place-name-input'], link: values['new-place-img-input'] })
        .then((result) => {
          const card = createCard(result, '#element-template');
          const cardElement = card.generateCard();
          cardList.addItem(cardElement);
        })
    }
  }
);
addCardPopup.setEventListeners();


const avatarPopup = new PopupWithForm('.popup_type_avatar',
  '.popup__btn-close',
  '.popup__input_type_avatar',
  '.popup__input_type_avatar',
  '.popup__input',
  {
    handleFormSubmit: (values) => {
      api.changeAvatar({ avatar: values['avatar-input'] });
      infoUser.setUserInfo({ avatar: values['avatar-input'] });

    }
  });
avatarPopup.setEventListeners();

// функция открытия popup редактирования аватара
function openPopupAvatar() {
  avatarFormValidator.resetValidationErrors();
  const avatarInfo = infoUser.getUserInfo();
  avatarPopup.openPopup({
    name: avatarInfo.avatar,
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

//avatarEditButton.addEventListener("click", openPopupAvatar);
avatarBox.addEventListener("click", openPopupAvatar);
editButton.addEventListener("click", openPopupProfile);
addButton.addEventListener("click", openPopupAdd);

/*--> Получим информацию, сохраненную на сервере */

let infoUserFromServer = { name: 'нет инфо', info: 'нет инфо' };
api.getAllNeededData().then(argument => {

  infoUserFromServer.name = argument[0].name;
  infoUserFromServer.info = argument[0].about;
  infoUserFromServer.avatar = argument[0].avatar;
  infoUserFromServer.userID = argument[0]._id;

  myID = argument[0]._id;
   // внесем инфо с сервера

  infoUser.setUserInfo(infoUserFromServer);
  //console.log(argument[0]);

  const initialCardsInfo = argument[1];
  //console.log(initialCardsInfo);
  //cardList.renderItems(initialCardsInfo);
})
  .catch((err) => {
    console.log(`Ошибка: ${err}`);

  });

/*<-- Получим информацию, сохраненную на сервере*/

/*api.addNewCard({ name: 'Палатка', link: 'https://unsplash.com/photos/96_yHob2TsQ' })
  .then(data => {

  console.log('данные тест карточки', data);
});*/
//cardList.renderItems(); // вызываем внутри then