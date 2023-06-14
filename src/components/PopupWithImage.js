import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupTitleImg = this._popup.querySelector('.popup__title-img');
    this._popupImg = this._popup.querySelector('.popup__img');
  }

  open(name, link) {
    this._popupTitleImg.textContent = name;
    this._popupImg.alt = `${name} (фото)`;
    this._popupImg.src = link;

    super.open();
  }
}
