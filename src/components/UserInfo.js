export default class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector }) {
    this._userNameElement = document.querySelector(profileTitleSelector);
    this._userAboutElement = document.querySelector(profileSubtitleSelector);
  }

  getUserInfo() {
    return {
      userName: this._userNameElement.textContent,
      userAbout: this._userAboutElement.textContent
    }
  }

  setUserInfo(userName, userAbout) {
    this._userNameElement.textContent = userName;
    this._userAboutElement.textContent = userAbout;
  }
}
