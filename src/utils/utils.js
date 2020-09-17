import { popupModifiers } from './constants.js';

export const isPopupOpened = (currentPopup) => {
  return currentPopup.classList.contains(popupModifiers.popupVisibleClass);
}


export const renderLoading = (isLoading, btnSubmit, btnText) => {
  if (isLoading) {
    btnSubmit.innerText = btnText;
  }
  else {
    btnSubmit.innerText = btnText;
  }
}


export const renderError = (err) => {
  console.log(err);
}