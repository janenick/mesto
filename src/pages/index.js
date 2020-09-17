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
  cssSelectors,
  elements,
  inputNames,
  //объект настроек с классами формы
  validationParams,
  //для класса Api
  apiParams
} from '../utils/constants.js';

import { renderLoading, renderError } from '../utils/utils.js';
import './index.css'; // импорт главного файла стилей

const avatarFormValidator = new FormValidator(elements.popupAvatarForm, validationParams);
const editFormValidator = new FormValidator(elements.popupProfileForm, validationParams);
const newPlaceFormValidator = new FormValidator(elements.popupNewPlaceForm, validationParams);

const api = new Api({
  baseUrl: apiParams.baseUrl + '/v1/' + apiParams.cohortId,
  headers: {
    authorization: apiParams.token,
    'Content-Type': 'application/json'
  }
});

const delSubmitPopup = new PopupConfirm(cssSelectors.popupDelSubmitSelector);

const imgPopup = new PopupWithImage(cssSelectors.popupBigImgSelector);

const infoUser = new UserInfo({
  nameSelector: cssSelectors.profileNameSelector,
  infoSelector: cssSelectors.profileStatusSelector,
  avatarSelector: cssSelectors.profileAvatarSelector
});

const infoPopup = new PopupWithForm(cssSelectors.popupProfileSelector,
  {
    handleFormSubmit: (values) => {
      renderLoading(true, elements.saveButton, 'Сохранение...');
      api.changeUserInfo({ name: values[inputNames.profileNameInput], about: values[inputNames.profileStatusInput] })
        .then((res) => {
          infoUser.setUserInfo({ name: res.name, info: res.about });
        })
        .then(() => infoPopup.closePopup())
        .catch((err) => {
          renderError(`Ошибка: ${err}`);
        })
        .finally(() => {
          renderLoading(false, elements.saveButton, 'Сохранить');
        });
    }
  }
);


const avatarPopup = new PopupWithForm(cssSelectors.popupAvatarSelector,
  {
    handleFormSubmit: (values) => {
      renderLoading(true, elements.saveButtonAvatar, 'Сохранение...');
      api.changeAvatar({ avatar: values[inputNames.avatarLinkInput] })
        .then((result) => {
          infoUser.setUserInfo({ avatar: result.avatar });
        })
        .then(() => avatarPopup.closePopup())
        .catch((err) => {
          renderError(`Ошибка: ${err}`);
        })
        .finally(() => {
          renderLoading(false, elements.saveButtonAvatar, 'Сохранить');
        });
    }
  });

// функция открытия popup редактирования аватара
function openPopupAvatar() {
  avatarFormValidator.toggleButtonStateOnForm();
  avatarFormValidator.resetValidationErrors();
  avatarPopup.openPopup();
}

// функция открытия popup редактирования профиля
function openPopupProfile() {
  const profileInfo = infoUser.getUserInfo();
  elements.popupName.value = profileInfo.name;
  elements.popupStatus.value = profileInfo.info;
  editFormValidator.toggleButtonStateOnForm();
  editFormValidator.resetValidationErrors();
  infoPopup.openPopup();
}


// функция открытия popup добавления карточки
function openPopupAdd(popupAdd) {
  newPlaceFormValidator.toggleButtonStateOnForm();
  newPlaceFormValidator.resetValidationErrors();
  popupAdd.openPopup();
}


/*--> Получим информацию, сохраненную на сервере */
api.getAppInfo().
  then(([initialUserInfo, initialCardList]) => {

    // внесем инфо о пользователе с сервера
    infoUser.setUserInfo({
      name: initialUserInfo.name,
      info: initialUserInfo.about,
      avatar: initialUserInfo.avatar,
      userID: initialUserInfo._id
    });

    return initialCardList;
  })
  /*<-- Получим информацию, сохраненную на сервере*/
  .then((initialCardList) => {
    // функции работы с карточками
    const createCard = (cardData, cardSelector) => {
      const card = new Card({
        myID: infoUser.userID,
        data: cardData,
        handleCardClick: () => {
          imgPopup.openPopup(cardData);
        },
        handleLikeClick: (evt, id) => {
          api.putLike(id)
            .then(res => {
              card.updateLikes(res);
            })
            .catch((err) => {
              renderError(`Ошибка: ${err}`);
            });
        },
        handleDislikeClick: (evt, id) => {
          api.deleteLike(id)
            .then(res => {
              card.updateLikes(res);
            }).catch((err) => {
              renderError(`Ошибка: ${err}`);
            });
        },
        handleDeleteClick: (id) => {
          delSubmitPopup.setSubmitAction(() => {
            api.removeCard(id)
              .then(() => card.removeCard())
              .then(() => delSubmitPopup.closePopup())
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


    const cardList = new Section({
      items: initialCardList,
      renderer: (item) => {
        const card = createCard(item, cssSelectors.cardTemplateSelector);
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
      }
    }, cssSelectors.cardListSelector);

    cardList.renderItems();
    return cardList;

  })
  .then((cardList) => {
    const addCardPopup = new PopupWithForm(
      cssSelectors.popupNewPlaceSelector,
      {
        handleFormSubmit: (values) => {
          renderLoading(true, elements.saveButtonNewPlace, 'Сохранение...');
          api.addNewCard({ name: values[inputNames.profileNewPlaseNameInput], link: values[inputNames.profileNewPlaseImgInput] })
            .then((result) => {
              cardList.renderItem(result);
            })
            .then(() => addCardPopup.closePopup())
            .catch((err) => {
              renderError(`Ошибка: ${err}`);
            })
            .finally(() => {
              renderLoading(false, elements.saveButtonNewPlace, 'Сохранить');
            });
        }
      }
    );
        
    elements.avatarBox.addEventListener('click', openPopupAvatar);
    elements.editButton.addEventListener('click', openPopupProfile);
    elements.addButton.addEventListener('click', () => { openPopupAdd(addCardPopup) });
    
    delSubmitPopup.setEventListeners();
    imgPopup.setEventListeners();
    avatarPopup.setEventListeners();
    infoPopup.setEventListeners();
    addCardPopup.setEventListeners();

  })
  .finally(() => {
    avatarFormValidator.enableValidation();
    editFormValidator.enableValidation();
    newPlaceFormValidator.enableValidation();
  })
  .catch((err) => {
    renderError(`Не удалось загрузить информацию с сервера. Ошибка: ${err}`);
  });
