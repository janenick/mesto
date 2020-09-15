import { isPopupOpened } from '../utils/utils.js';
import { cssClasses, cssSelectors } from '../utils/constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(cssSelectors.popupCloseBtnSelector);
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
    this._popupElement.classList.add(cssClasses.popupVisibleClass);

  }

  closePopup() {
    this._removeHandlerOnEscape();
    this._popupElement.classList.remove(cssClasses.popupVisibleClass);
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
      this.closePopup();
    });
    this._popupElement.addEventListener("mouseup", (evt) => { this._handleOverlayClose(evt) });
  }
}
