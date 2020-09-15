// импорт из других файлов
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
  popupAvatarForm, avatarBox, saveButtonAvatar,
  //элементы попапа редактирования профиля
  popupProfileForm, saveButton,
  //элементы попапа добавления карточки
  popupNewPlaceForm, saveButtonNewPlace,
  //объект настроек с классами формы
  validationParams,
  cardListSelector, //класс секции для вставки карточек
  //для класса Api
  baseUrl, cohortId, token
} from '../utils/constants.js';

import { renderLoading, renderError } from '../utils/utils.js';

import { popupProfileSelector } from '../utils/selectors.js';

import './index.css'; // импорт главного файла стилей

let myID;
const avatarFormValidator = new FormValidator(popupAvatarForm, validationParams);
const editFormValidator = new FormValidator(popupProfileForm, validationParams);
const newPlaceFormValidator = new FormValidator(popupNewPlaceForm, validationParams);

const api = new Api({
  baseUrl: baseUrl + '/v1/' + cohortId,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
});

const delSubmitPopup = new PopupConfirm('.popup_type_delete-submit');

const imgPopup = new PopupWithImage('.popup_type_img', '.popup__img', '.popup__caption');

const infoUser = new UserInfo({
  nameSelector: '.profile__name',
  infoSelector: '.profile__status',
  avatarSelector: '.profile__avatar-box'
});

const infoPopup = new PopupWithForm(popupProfileSelector,
  '.popup__input_type_name',
  '.popup__input_type_status',
  '.popup__input',
  {
    handleFormSubmit: (values) => {
      renderLoading(true, saveButton, 'Сохранение...');
      api.changeUserInfo({ name: values['name-input'], info: values['status-input'] })
        .then((res) => {
          infoUser.setUserInfo({ name: res.name, info: res.about });
        })
        .catch((err) => {
          renderError(`Ошибка: ${err}`);
        })
        .finally(() => {
          renderLoading(false, saveButton, 'Сохранить');
        });
    }
  }
);

const cardList = new Section(cardListSelector);

const createCard = (result, cardSelector) => {
  const card = new Card({
    myID: myID,
    data: result,
    handleCardClick: () => {
      imgPopup.openPopup(result);
    },
    handleLikeClick: (evt, id) => {
      api.putLike(id).then(res => {
        card.isLiked = true;
        card.renderLikes(res.likes.length, true);

      })
        .catch((err) => {
          renderError(`Ошибка: ${err}`);
        });
    },
    handleDislikeClick: (evt, id) => {
      api.deleteLike(id).then(res => {
        card.isLiked = false;
        card.renderLikes(res.likes.length, false);
      }).catch((err) => {
        renderError(`Ошибка: ${err}`);
      });

    },
    handleDeleteClick: (id) => {
      delSubmitPopup.setSubmitAction(() => {
        api.removeCard(id).then(res => {
          card.removeCard();
        })
          .catch((err) => {
            renderError(`Ошибка: ${err}`);
          });
      }
      );
      delSubmitPopup.openPopup();
    }

  }, cardSelector);
  return card;
} // const createCard()

const addCardPopup = new PopupWithForm(
  '.popup_type_new-place',
  '.popup__input_type_new-place-name',
  '.popup__input_type_new-place-img',
  '.popup__input',

  {
    handleFormSubmit: (values) => {
      renderLoading(true, saveButtonNewPlace, 'Сохранение...');
      api.addNewCard({ name: values['new-place-name-input'], link: values['new-place-img-input'] })
        .then((result) => {
          const card = createCard(result, '#element-template');
          const cardElement = card.generateCard();
          cardList.addItem(cardElement);
        })
        .catch((err) => {
          renderError(`Ошибка: ${err}`);
        })
        .finally(() => {
          renderLoading(false, saveButtonNewPlace, 'Сохранить');
        });
    }
  }
);

const avatarPopup = new PopupWithForm('.popup_type_avatar',
  '.popup__input_type_avatar',
  '.popup__input_type_avatar',
  '.popup__input',
  {
    handleFormSubmit: (values) => {
      renderLoading(true, saveButtonAvatar, 'Сохранение...');
      api.changeAvatar({ avatar: values['avatar-input'] })
        .then((result) => {
          infoUser.setUserInfo({ avatar: result.avatar });
        })
        .catch((err) => {
          renderError(`Ошибка: ${err}`);
        })
        .finally(() => {
          renderLoading(false, saveButtonAvatar, 'Сохранить');
        });


    }
  });

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

/*--> Получим информацию, сохраненную на сервере */

const infoUserFromServer = { name: 'нет инфо', info: 'нет инфо' };

api.getAppInfo().
  then(([InitialUserInfo, InitialCardList]) => {
  
    delSubmitPopup.setEventListeners();
    imgPopup.setEventListeners();
    avatarPopup.setEventListeners();
    infoPopup.setEventListeners();
    addCardPopup.setEventListeners();

    avatarFormValidator.enableValidation();
    editFormValidator.enableValidation();
    newPlaceFormValidator.enableValidation();

    avatarBox.addEventListener("click", openPopupAvatar);
    editButton.addEventListener("click", openPopupProfile);
    addButton.addEventListener("click", openPopupAdd);

    infoUserFromServer.name = InitialUserInfo.name;
    infoUserFromServer.info = InitialUserInfo.about;
    infoUserFromServer.avatar = InitialUserInfo.avatar;
    infoUserFromServer.userID = InitialUserInfo._id;

    myID = InitialUserInfo._id;

    // внесем инфо с сервера
    console.log(InitialCardList);
    infoUser.setUserInfo(InitialUserInfo);
    cardList.clear();
    InitialCardList.forEach((item) => {
      const card = createCard(item, '#element-template');
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    })

  })
  .catch((err) => {
    renderError(`Не удалось загрузить информацию с сервера. Ошибка: ${err}`);
  });


/*<-- Получим информацию, сохраненную на сервере*/