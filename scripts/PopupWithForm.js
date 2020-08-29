import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupCloseBtnSelector, inputName, inputInfo, handleFormSubmit) {
    super(popupSelector, popupCloseBtnSelector);
    this._popupName = this._popupElement.querySelector(inputName);
    this._popupInfo = this._popupElement.querySelector(inputInfo);
    this._handleFormSubmit = handleFormSubmit;
    this._formSubmit = this._popupElement.querySelector('.popup__form');
  }

  _getInputValues() {

  }

  openPopup(data) {
    
    super.openPopup();
    this._popupName.value = data.name;
    this._popupInfo.value = data.info;
  }

  closePopup() {

    super.closePopup();
    this._formSubmit.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit({
        name: this._popupName.value,
        info: this._popupInfo.value
      });
      this.closePopup();
    });
  }
}