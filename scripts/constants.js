export const allPopups = Array.from(document.querySelectorAll('.popup'));

export const profileInfo = document.querySelector(".profile__info");
export const editButton = profileInfo.querySelector(".profile__btn-edit");
export const addButton = document.querySelector(".profile__btn-add");
export const profileName = profileInfo.querySelector(".profile__name");
export const profileStatus = profileInfo.querySelector(".profile__status");

export const popupProfileInfo = document.querySelector(".popup_type_profile");
export const popupProfileForm = popupProfileInfo.querySelector(".popup__form");
export const popupFormElement = popupProfileInfo.querySelector(".popup__container");
export const saveButton = popupProfileInfo.querySelector(".popup__btn-save");
export const closeButton = popupProfileInfo.querySelector(".popup__btn-close");
export const popupName = popupProfileInfo.querySelector(".popup__input_type_name");
export const popupStatus = popupProfileInfo.querySelector(".popup__input_type_status");

export const popupNewPlace = document.querySelector(".popup_type_new-place");
export const popupFormElementNewPlace = popupNewPlace.querySelector(".popup__container");
export const saveButtonNewPlace = popupNewPlace.querySelector(".popup__btn-save");
export const closeButtonNewPlace = popupNewPlace.querySelector(".popup__btn-close");
export const popupNameNewPlace = popupNewPlace.querySelector(".popup__input_type_new-place-name");
export const popupImgNewPlace = popupNewPlace.querySelector(".popup__input_type_new-place-img");

export const popupBigImg = document.querySelector(".popup_type_img");
export const closeButtonBigImg = popupBigImg.querySelector(".popup__btn-close");
export const cardBigImg = popupBigImg.querySelector(".popup__img");
export const captionBigImg = popupBigImg.querySelector(".popup__caption");

export const elementsSection = document.querySelector(".elements");
export const newCardTemplate = document.querySelector("#element-template").content;
