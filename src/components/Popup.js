import { isPopupOpened } from '../utils/utils.js';

export default class Popup {
  constructor(popupSelector, popupCloseBtnSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(popupCloseBtnSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    
  }

  _addHandlerOnEscape() {
    document.addEventListener('keydown', this._handleEscClose);
  }

  _removeHandlerOnEscape() {
    document.removeEventListener('keydown', this._handleEscClose);
  }


  _handleEscClose(event) {
    if (event.key === "Escape" && isPopupOpened(this._popupElement)) {
      this.closePopup();
    }
  }
  
  _handleOverlayClose(evt) {
    if (evt.target !== this._popupElement) { return }
    this.closePopup();
  }

  openPopup() {
    this._addHandlerOnEscape();
    this._popupElement.classList.add('popup_opened');
    
  }

  closePopup() {
    this._removeHandlerOnEscape();
    this._popupElement.classList.remove('popup_opened');
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
      this.closePopup();
    });
    this._popupElement.addEventListener("mouseup", (evt) => { this._handleOverlayClose(evt)});
  }
}
