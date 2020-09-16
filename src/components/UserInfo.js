import { elements } from '../utils/constants.js';

export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector, userID }) {
    this._name = elements.profileInfo.querySelector(nameSelector);
    this._info = elements.profileInfo.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
    this.userID = userID;

  }

  getUserInfo() {
    return {

      name: this._name.textContent,
      info: this._info.textContent,
      avatar: this._avatar.style.backgroundImage

    };
  }

  setUserInfo({ ...data }) {
    if (data.userID) { this.userID = data.userID };
    if (data.name) { this._name.textContent = data.name };
    if (data.info) { this._info.textContent = data.info };
    if (data.avatar) { this._avatar.style.backgroundImage = 'url(' + data.avatar + ')' };
  }
}
