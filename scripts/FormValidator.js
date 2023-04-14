export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._submitButtonElement = this._formElement.querySelector(this._config.submitButtonSelector);
  }

  _showInputError(inputElement, errorElement) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement, errorElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._config.errorClass);
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonValidity() {
    if (this._hasInvalidInput()) {
      this._submitButtonElement.classList.add(this._config.inactiveButtonClass);
      this._submitButtonElement.disabled = true;
    } else {
      this._submitButtonElement.classList.remove(this._config.inactiveButtonClass);
      this._submitButtonElement.disabled = false;
    }
  }

  resetValidation() {
    this._toggleButtonValidity();

    this._inputList.forEach((inputElement) => {
      const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
      this._hideInputError(inputElement, errorElement);
    });
  }

  _setEventListeners() {
    this._toggleButtonValidity();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonValidity();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
