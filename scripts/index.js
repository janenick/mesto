const popupSection = document.querySelector(".popup");

const profileInfo = document.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__btn-edit");
const addButton = profileInfo.querySelector(".profile__btn-add");
const profileName = profileInfo.querySelector(".profile__name");
const profileStatus = profileInfo.querySelector(".profile__status");

const popupProfileInfo = document.querySelector(".popup_profile");
const popupFormElement = popupProfileInfo.querySelector(".popup__container");
const saveButton = popupProfileInfo.querySelector(".popup__btn-save");
const closeButton = popupProfileInfo.querySelector(".popup__btn-close");
const popupName = popupProfileInfo.querySelector(".popup__input_type_name");
const popupStatus = popupProfileInfo.querySelector(".popup__input_type_status");

function togglePopup() {
/*const togglePopup = () => {*/
  popupSection.classList.toggle("popup_opened");
  let popupOpened = popupSection.classList.contains("popup_opened");
    if (popupOpened) {
    popupName.value = profileName.textContent;
    popupStatus.value = profileStatus.textContent;
  }
 }

const saveProfile = (event) => {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;

  togglePopup();
};

popupFormElement.addEventListener("submit", saveProfile);

editButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);