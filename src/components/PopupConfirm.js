import Popup from './Popup.js';
import { cssSelectors } from '../utils/constants.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formSubmit = this._popupElement.querySelector(cssSelectors.formSelector);
  }


  setSubmitAction(submitAction) {
    this._handleFormSubmit = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._formSubmit.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit();
    });
  }
}