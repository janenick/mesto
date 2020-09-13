import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, popupCloseBtnSelector) {
    super(popupSelector, popupCloseBtnSelector);
    this._formSubmit = this._popupElement.querySelector('.popup__form');
  }


  setSubmitAction(submitAction) {
    this._handleFormSubmit = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit();
      this.closePopup();
    });
  }
}