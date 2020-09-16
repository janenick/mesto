const cssClasses = {
  disabledBtnClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__input-error_visible',
  popupVisibleClass: 'popup_opened',
  elementBtnLikeActiveClass: 'element__btn-like_active',
  elementBtnTrashActiveClass: 'element__btn-trash_active'
};


const cssSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  
  popupCloseBtnSelector: '.popup__btn-close',
  popupSubmitBtnSelector: '.popup__btn-save',
  popupContainerSelector: '.popup__container',
 
  // попап профиля
  popupProfileSelector: '.popup_type_profile',
  
  // попап карточек
  popupNewPlaceSelector: '.popup_type_new-place',

  // селекторы element
  elementTitleSelector: '.element__title',
  elementImgSelector: '.element__img',
  elementBtnLikeSelector: '.element__btn-like',
  elementBtnTrashSelector: '.element__btn-trash',
  elementLikeSumSelector: '.element__like-sum',

  // попап большой картинки
  popupBigImgSelector: '.popup_type_img',
  popupImgSelector: '.popup__img',
  popupCaptionSelector: '.popup__caption',

  // информация о пользователе
  profileNameSelector: '.profile__name',
  profileStatusSelector: '.profile__status',
  profileAvatarSelector: '.profile__avatar-box',

  // аватар
  popupAvatarSelector: '.popup_type_avatar',

  // попап подтверждения
  popupDelSubmitSelector: '.popup_type_delete-submit',

  cardListSelector: '.elements', // сюда вставляем карточки
  cardTemplateSelector: '#element-template'
};


const inputNames = {
  profileNameInput: 'name-input',
  profileStatusInput: 'status-input',
  profileNewPlaseNameInput: 'new-place-name-input',
  profileNewPlaseImgInput: 'new-place-img-input',
  avatarLinkInput: 'avatar-input'
};


const profileInfo = document.querySelector('.profile__info');
const avatarBox = document.querySelector('.profile__avatar-box');
const editButton = profileInfo.querySelector('.profile__btn-edit');
const addButton = document.querySelector('.profile__btn-add');
const profileName = profileInfo.querySelector('.profile__name');
const profileStatus = profileInfo.querySelector('.profile__status');

const popupAvatarInfo = document.querySelector(cssSelectors.popupAvatarSelector);
const popupAvatarForm = popupAvatarInfo.querySelector(cssSelectors.formSelector);
const saveButtonAvatar = popupAvatarInfo.querySelector(cssSelectors.popupSubmitBtnSelector);
const popupLinkAvatar   = popupAvatarInfo.querySelector('.popup__input_type_avatar');

const popupProfileInfo = document.querySelector(cssSelectors.popupProfileSelector);
const popupProfileForm = popupProfileInfo.querySelector(cssSelectors.formSelector);
const popupFormElement = popupProfileInfo.querySelector(cssSelectors.popupContainerSelector);
const saveButton = popupProfileInfo.querySelector(cssSelectors.popupSubmitBtnSelector);
const closeButton = popupProfileInfo.querySelector(cssSelectors.popupCloseBtnSelector);
const popupName = popupProfileInfo.querySelector('.popup__input_type_name');
const popupStatus = popupProfileInfo.querySelector('.popup__input_type_status');

const popupNewPlace = document.querySelector(cssSelectors.popupNewPlaceSelector);
const popupNewPlaceForm = popupNewPlace.querySelector(cssSelectors.formSelector);
const popupFormElementNewPlace = popupNewPlace.querySelector(cssSelectors.popupContainerSelector);
const saveButtonNewPlace = popupNewPlace.querySelector(cssSelectors.popupSubmitBtnSelector);
const closeButtonNewPlace = popupNewPlace.querySelector(cssSelectors.popupCloseBtnSelector);
const popupNameNewPlace = popupNewPlace.querySelector('.popup__input_type_new-place-name');
const popupImgNewPlace = popupNewPlace.querySelector('.popup__input_type_new-place-img');

const popupBigImg = document.querySelector(cssSelectors.popupBigImgSelector);
const closeButtonBigImg = popupBigImg.querySelector(cssSelectors.popupCloseBtnSelector);
const cardBigImg = popupBigImg.querySelector('.popup__img');
const captionBigImg = popupBigImg.querySelector('.popup__caption');

const elementsSection = document.querySelector(cssSelectors.cardListSelector);
const newCardTemplate = document.querySelector(cssSelectors.cardTemplateSelector).content;


const elements = {
  avatarBox,
  editButton,
  addButton,
  profileInfo,
  // попап аватара
  popupAvatarForm,
  saveButtonAvatar,
  // попап профиля
  popupProfileForm,
  saveButton,
  // попап карточек
  popupNewPlaceForm,
  saveButtonNewPlace
};

// константы файла валидации
const validationParams = {
  formSelector: cssSelectors.formSelector,
  inputSelector: cssSelectors.inputSelector,
  submitButtonSelector: cssSelectors.popupSubmitBtnSelector,
  inactiveButtonClass: cssClasses.disabledBtnClass,
  inputErrorClass: cssClasses.inputErrorClass,
  errorClass: cssClasses.errorVisibleClass
};

export const errorSuffix = '-error';

// для Api
const apiParams = {
baseUrl: 'https://mesto.nomoreparties.co',
cohortId: 'cohort-15',
token: '8d0efc77-0d4b-4bf8-ae49-d7668927bf3c'
}

export { cssClasses, cssSelectors, inputNames, elements, validationParams, apiParams };
export {
  avatarBox,
    editButton,
    addButton
};
