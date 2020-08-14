//попапы
const popupProfileInfo = document.querySelector(".popup_type_profile");
const popupNewPlace = document.querySelector(".popup_type_new-place");
const popupBigImg = document.querySelector(".popup_type_img");

// кнопки закрытия попапов
const closeButton = popupProfileInfo.querySelector(".popup__btn-close");
const closeButtonNewPlace = popupNewPlace.querySelector(".popup__btn-close");
const closeButtonBigImg = popupBigImg.querySelector(".popup__btn-close");

// элементы попапа с всплывающей большой картинкой (popupBigImg)
const cardBigImg = popupBigImg.querySelector(".popup__img");
const captionBigImg = popupBigImg.querySelector(".popup__caption");

export { popupProfileInfo, popupNewPlace, popupBigImg }; // попапы
export { closeButton, closeButtonNewPlace, closeButtonBigImg }; // кнопки закрытия попапов
export { cardBigImg, captionBigImg }; // элементы попапа с всплывающей большой картинкой (popupBigImg)