import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, popupCloseBtnSelector, popupImgSelector, popupCaptionSelector) {
    super(popupSelector, popupCloseBtnSelector);
    this._popupImg = this._popupElement.querySelector(popupImgSelector);
    this._popupCaption = this._popupElement.querySelector(popupCaptionSelector);
  }

  openPopup(data) {
    this._popupImg.src = data.link;
    this._popupImg.alt = data.name;
    this._popupCaption.textContent = data.name;
    super.openPopup();

  }

  closePopup() {
    super.closePopup();
  }
}