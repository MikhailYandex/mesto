export default class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const profile = {};
    profile["name"] = this._name.textContent;
    profile["text"] = this._info.textContent;
    profile["avatar"] = this._avatar.src;
    return profile;
  }

  getUserId(){
   return this._id
  }

  setUserInfo({name, about, avatar, _id}) {
    this._name.textContent = name;
    this._info.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}
