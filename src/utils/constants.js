const errorSelectors = {
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__input-error_visible'

};


const btnSelectors = {
  disabledBtnClass: 'popup__btn-save_disabled',
  BtnLikeActiveClass: 'element__btn-like_active',
  BtnTrashActiveClass: 'element__btn-trash_active',
  BtnLikeSelector: '.element__btn-like',
  BtnTrashSelector: '.element__btn-trash',
  LikeSumSelector: '.element__like-sum',
  CloseBtnSelector: '.popup__btn-close',
  SubmitBtnSelector: '.popup__btn-save'
};


const popupModifiers = {
  // попап профиля
  popupProfileSelector: '.popup_type_profile',
  // попап карточек
  popupNewPlaceSelector: '.popup_type_new-place',
  // попап большой картинки
  popupBigImgSelector: '.popup_type_img',
  // аватар
  popupAvatarSelector: '.popup_type_avatar',
  // попап подтверждения
  popupDelSubmitSelector: '.popup_type_delete-submit',
  // попап открыт
  popupVisibleClass: 'popup_opened',
};


const cssSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',

  // селекторы element
  elementTitleSelector: '.element__title',
  elementImgSelector: '.element__img',

  popupImgSelector: '.popup__img',
  popupCaptionSelector: '.popup__caption',

  // информация о пользователе
  profileNameSelector: '.profile__name',
  profileStatusSelector: '.profile__status',
  profileAvatarSelector: '.profile__avatar-box',

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

const popupAvatarInfo = document.querySelector(popupModifiers.popupAvatarSelector);
const popupAvatarForm = popupAvatarInfo.querySelector(cssSelectors.formSelector);
const saveButtonAvatar = popupAvatarInfo.querySelector(btnSelectors.SubmitBtnSelector);

const popupProfileInfo = document.querySelector(popupModifiers.popupProfileSelector);
const popupProfileForm = popupProfileInfo.querySelector(cssSelectors.formSelector);
const saveButton = popupProfileInfo.querySelector(btnSelectors.SubmitBtnSelector);
const popupName = popupProfileInfo.querySelector('.popup__input_type_name');
const popupStatus = popupProfileInfo.querySelector('.popup__input_type_status');

const popupNewPlace = document.querySelector(popupModifiers.popupNewPlaceSelector);
const popupNewPlaceForm = popupNewPlace.querySelector(cssSelectors.formSelector);
const saveButtonNewPlace = popupNewPlace.querySelector(btnSelectors.SubmitBtnSelector);


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
  popupName,
  popupStatus,
  // попап карточек
  popupNewPlaceForm,
  saveButtonNewPlace
};


// константы файла валидации
const validationParams = {
  formSelector: cssSelectors.formSelector,
  inputSelector: cssSelectors.inputSelector,
  submitButtonSelector: btnSelectors.SubmitBtnSelector,
  inactiveButtonClass: btnSelectors.disabledBtnClass,
  inputErrorClass: errorSelectors.inputErrorClass,
  errorClass: errorSelectors.errorVisibleClass
};


export const errorSuffix = '-error';


// для Api
const apiParams = {
  baseUrl: 'https://mesto.nomoreparties.co',
  cohortId: 'cohort-15',
  token: '8d0efc77-0d4b-4bf8-ae49-d7668927bf3c'
};


export { popupModifiers, btnSelectors, cssSelectors, inputNames, elements, validationParams, apiParams };
