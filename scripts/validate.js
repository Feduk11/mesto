//ВАЛИДАЦИЯ ФОРМ
const showInputError = (inputElement, errorElement, validationMessage, inputErrorClass, errorClass) => {
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (inputElement, errorElement, inputErrorClass, errorClass) => {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(inputElement, errorElement, inputErrorClass, errorClass);
  }
};

const setEventListeners = (formElement, { inputSelector, inputErrorClass, errorClass, submitButtonSelector, inactiveButtonClass }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonValidity(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (event) => {
      checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonValidity(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonValidity = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const enableValidation = ({ formSelector, ...config }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

enableValidation(validationConfig);