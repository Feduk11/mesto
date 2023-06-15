import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup{
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
  }

  handleSubmit(submit) {
    this._handleSubmitForm = submit;
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm();
    });
    super.setEventListeners();
  }
}
