const popupSection = document.querySelector(".popup");

const profileInfo = document.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__btn-edit");
const addButton = profileInfo.querySelector(".profile__btn-add");
const profileName = profileInfo.querySelector(".profile__name");
const profileStatus = profileInfo.querySelector(".profile__status");

const popupProfileInfo = document.querySelector(".popup_profile");
const popupformElement = popupProfileInfo.querySelector(".popup__container");
const saveButton = popupProfileInfo.querySelector(".popup__btn-save");
const closeButton = popupProfileInfo.querySelector(".popup__btn-close");
const popupName = popupProfileInfo.querySelector(".popup__input_type_name");
const popupStatus = popupProfileInfo.querySelector(".popup__input_type_status");

const editProfile = () => {
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;

  togglePopup(popupSection);
};

editButton.addEventListener("click", editProfile);

const closePopup = () => {
  togglePopup(popupSection);
};

closeButton.addEventListener("click", closePopup);

const togglePopup = (localPopup) => {
  localPopup.classList.toggle("popup_opened");
};

const saveProfile = (event) => {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;

  togglePopup(popupSection);
};

popupformElement.addEventListener("submit", saveProfile);
