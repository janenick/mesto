import Popup from './Popup.js';
import { cssSelectors } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handlers) {
    super(popupSelector);
    this._handleFormSubmit = handlers.handleFormSubmit;
    this._formSubmit = this._popupElement.querySelector(cssSelectors.formSelector);
    this._inputSelector = cssSelectors.inputSelector;
  }


  _getInputValues() {
    this._inputList = Array.from(this._formSubmit.querySelectorAll(this._inputSelector));
    this._formValue = {};
    this._inputList.forEach(inputItem => { this._formValue[inputItem.id] = inputItem.value });
    return this._formValue;
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
    });
  }
}