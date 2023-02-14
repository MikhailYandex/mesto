export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._info.textContent,
      avatar: this._avatar.src
    }
  }

  setUserInfo(item) {
    this._name.textContent = item.name;
    this._info.textContent = item.about;
    this._avatar.src = item.avatar;
    this._id = item._id;
  }
}
