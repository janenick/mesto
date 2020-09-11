import { profileInfo } from '../utils/constants.js';

export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._name = profileInfo.querySelector(nameSelector);
    this._info = profileInfo.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);

  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
      avatar: this._avatar.src
    };
}

  setUserInfo({ ...data }) {
    debugger;
    if (data.name) { this._name.textContent = data.name };
    if (data.info) { this._info.textContent = data.info };
    debugger;
    if (data.avatar) { this._avatar.src = data.avatar };
  }

}
