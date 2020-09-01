import { profileInfo } from '../utils/constants.js';

export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._name = profileInfo.querySelector(nameSelector);
    this._info = profileInfo.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent
    };
}

  setUserInfo({ ...data }) {
    this._name.textContent = data.name;
    this._info.textContent = data.info;
  }

}
