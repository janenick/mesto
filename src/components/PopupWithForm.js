import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupCloseBtnSelector, inputName, inputInfo, inputSelector, handlers) {
    super(popupSelector, popupCloseBtnSelector);
    this._popupName = this._popupElement.querySelector(inputName);
    this._popupInfo = this._popupElement.querySelector(inputInfo);
    this._handleFormSubmit = handlers.handleFormSubmit;
    this._formSubmit = this._popupElement.querySelector('.popup__form');
    this._inputSelector = inputSelector;
  }

  _getInputValues() {
    this._inputList = Array.from(this._formSubmit.querySelectorAll(this._inputSelector));
    this._formValue = {};
    this._inputList.forEach(inputItem => { this._formValue[inputItem.id] = inputItem.value });
    return this._formValue;
  }

  openPopup({ ...data }) {

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
      this._handleFormSubmit(this._getInputValues());
      this.closePopup();
    });
  }
}