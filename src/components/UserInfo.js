import { profileInfo } from '../utils/constants.js';

export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector, userID}) {
    this._name = profileInfo.querySelector(nameSelector);
    this._info = profileInfo.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
    this.userID = userID;

  }

  getUserInfo() {
    return {

      name: this._name.textContent,
      info: this._info.textContent,
      avatar: this._avatar.style.backgroundImage
      //avatar: this._avatar.src // аватар как img
    };
  }

  setUserInfo({ ...data }) {
    if (data.userID) { this.userID = data.userID };
    if (data.name) { this._name.textContent = data.name };
    if (data.info) { this._info.textContent = data.info };
    if (data.avatar) { this._avatar.style.backgroundImage = 'url(' + data.avatar + ')' };
    //if (data.avatar) { this._avatar.src = data.avatar }; // аватар как img
  }

}
