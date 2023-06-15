export default class UserInfo {
  constructor({ profileTitleSelector, profileSubtitleSelector, profileAvatarSelector }) {
    this._userNameElement = document.querySelector(profileTitleSelector);
    this._userAboutElement = document.querySelector(profileSubtitleSelector);
    this._userAvatarElement = document.querySelector(profileAvatarSelector);
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

  setUserAvatar(userAvatar) {
    this._userAvatarElement.src = userAvatar;
  }
}
