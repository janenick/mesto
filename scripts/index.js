const popupSection = document.querySelector(".popup");

const profileInfo = document.querySelector(".profile__info");
const editButton = profileInfo.querySelector(".profile__btn-edit");
const addButton = document.querySelector(".profile__btn-add");
const profileName = profileInfo.querySelector(".profile__name");
const profileStatus = profileInfo.querySelector(".profile__status");

const popupProfileInfo = document.querySelector(".popup_profile");
const popupFormElement = popupProfileInfo.querySelector(".popup__container");
const saveButton = popupProfileInfo.querySelector(".popup__btn-save");
const closeButton = popupProfileInfo.querySelector(".popup__btn-close");
const popupName = popupProfileInfo.querySelector(".popup__input_type_name");
const popupStatus = popupProfileInfo.querySelector(".popup__input_type_status");

const popupNewPlace = document.querySelector(".popup_new-place");
const popupFormElementNewPlace = popupNewPlace.querySelector(
  ".popup__container"
);
const saveButtonNewPlace = popupNewPlace.querySelector(".popup__btn-save");
const closeButtonNewPlace = popupNewPlace.querySelector(".popup__btn-close");
const popupNameNewPlace = popupNewPlace.querySelector(
  ".popup__input_type_new-place-name"
);
const popupImgNewPlace = popupNewPlace.querySelector(
  ".popup__input_type_new-place-img"
);

const elementsSection = document.querySelector(".elements");
const newCardTemplate = document.querySelector("#element-template").content;

const likeButton = document.querySelector(".element__btn-like");
const trashButton = document.querySelector(".element__btn-trash");

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function togglePopup(currentPopup) {
  /*const togglePopup = () => {*/
  currentPopup.classList.toggle("popup_opened");
  
}

const editPopupProfile = () => {
  togglePopup(popupProfileInfo);
  popupName.value = profileName.textContent;
  popupStatus.value = profileStatus.textContent;
};

const saveProfile = (event) => {
  event.preventDefault();
  profileName.textContent = popupName.value;
  profileStatus.textContent = popupStatus.value;

  togglePopup(popupProfileInfo);
};

const changeLike = (event) => {
  // в переменной eventTarget окажется элемент
  // button, на который мы кликнули

    const eventTarget = event.target;
  eventTarget.classList.toggle("element__btn-like_active");
};

const deleteCard = (event) => {
  console.log("удаляем карточку места");

  const eventTarget = event.target;
  const cardItem = eventTarget.closest(".element");
  cardItem.remove();
};

const addCard = (cardName, cardLink) => {
  const newCardElement = newCardTemplate.cloneNode(true);

  // наполняем содержимым
  newCardElement.querySelector(".element__title").textContent = cardName;
  newCardElement.querySelector(".element__img").src = cardLink;
  newCardElement.querySelector(".element__img").alt = cardName;

  //поставим сердечку обработчик клика, при котором в консоль выводится объект evt:
  const newCardLikeButton = newCardElement.querySelector(".element__btn-like");
  newCardLikeButton.addEventListener("click", () => changeLike(event));
  // добавим "корзину"
  const newCardDelButton = newCardElement.querySelector(".element__btn-trash");
  newCardDelButton.addEventListener("click", () => deleteCard(event));
  // отображаем на странице
  elementsSection.prepend(newCardElement);
};

const openPopupNewplace = () => {
  togglePopup(popupNewPlace);
  popupNameNewPlace.value = "Название";
  popupImgNewPlace.value = "Ссылка на картинку";
};

const saveNewPlace = (event) => {
  event.preventDefault();
  addCard(popupNameNewPlace.value, popupImgNewPlace.value);

  togglePopup(popupNewPlace);
};

const addCards = (arrCards) => {
  arrCards.forEach((card) => {
    addCard(card.name, card.link);
  });
};

editButton.addEventListener("click", editPopupProfile);
popupFormElement.addEventListener("submit", saveProfile);
closeButton.addEventListener("click", () => togglePopup(popupProfileInfo));

addButton.addEventListener("click", openPopupNewplace);
popupFormElementNewPlace.addEventListener("submit", saveNewPlace);
closeButtonNewPlace.addEventListener("click", () => togglePopup(popupNewPlace));

//likeButton.addEventListener("click", () => changeLike);
likeButton.addEventListener("click", changeLike);
trashButton.addEventListener("click", deleteCard);

addCards(initialCards);