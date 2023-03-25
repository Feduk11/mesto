const profileTitle = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__status');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_edit_profile');
const inputName = popupEditProfile.querySelector('.popup__input_text_name');
const inputStatus = popupEditProfile.querySelector('.popup__input_text_status');
const formEditProfile = popupEditProfile.querySelector('[name="profileForm"]');

const popupAddPlace = document.querySelector('.popup_edit_card');
const inputNamePlace = popupAddPlace.querySelector('.popup__input_text_place');
const inputUrlPlace = popupAddPlace.querySelector('.popup__input_text_src');
const formAddPlace = popupAddPlace.querySelector('[name="popupForm"]');

const popupViewImage = document.querySelector('.popup_edit_image');
const popupImg = popupViewImage.querySelector('.popup__image');
const popupTitleImg = popupViewImage.querySelector('.popup__image-text');

const popupList = Array.from(document.querySelectorAll('.popup'));

const elementTemplate = document.querySelector('#element').content;
const elementsContainer = document.querySelector('.elements');

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.addEventListener('keydown', closeEsc);
};

//key esc
const closeEsc = (event => {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
});

popupList.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});


// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const saveFormPlace = function (event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputStatus.value;
  closePopup(popupEditProfile);
};

// ОБРАБОТЧИК ЛАЙКА
const handleLikeButtonClick = event => {
  const target = event.target;
  target.classList.toggle('element__like_active');
};

// ОБРАБОТЧИК УДАЛЕНИЯ
const handleDeleteButtonClick = event => {
  const target = event.target;
  const listItem = target.closest('.element');
  listItem.remove();
};

// ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК И УВЕЛИЧЕНИЕ ФОТО
const createCard = card => {
  const placeElement = elementTemplate.querySelector('.element').cloneNode(true);
  const cardTitle = placeElement.querySelector('.element__title');
  const cardImage = placeElement.querySelector('.element__photo');
  const cardLike = placeElement.querySelector('.element__like');
  const cardDelete = placeElement.querySelector('.element__delete');

  cardTitle.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', `${card.name} (фото)`);

  cardLike.addEventListener('click', handleLikeButtonClick);
  cardDelete.addEventListener('click', handleDeleteButtonClick);

  cardImage.addEventListener('click', () => {
    openPopup(popupViewImage);
    popupImg.setAttribute('src', card.link);
    popupImg.setAttribute('alt', card.name);
    popupTitleImg.textContent = card.name;
  });

  return placeElement;
};

defaultCards.forEach((card) => {
  elementsContainer.append(createCard(card));
});

const addCard = event => {
  event.preventDefault();
  const form = event.target;
  const card = {
    name: inputNamePlace.value,
    link: inputUrlPlace.value,
  };
  elementsContainer.prepend(createCard(card));
  closePopup(popupAddPlace);
  form.reset();
};

profileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  inputName.value = profileTitle.textContent;
  inputStatus.value = profileSubtitle.textContent;
});

profileAddButton.addEventListener('click', () => {
  inputNamePlace.value = '';
  inputUrlPlace.value = '';
  openPopup(popupAddPlace);
});

formEditProfile.addEventListener('submit', saveFormPlace);
formAddPlace.addEventListener('submit', addCard);

//ВАЛИДАЦИЯ ФОРМ
const showInputError = (inputElement, errorElement, validationMessage, errorClass) => {
  errorElement.textContent = validationMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (inputElement, errorElement, errorClass) => {
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
};

const checkInputValidity = (formElement, inputElement, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, inputElement.validationMessage, errorClass);
  } else {
    hideInputError(inputElement, errorElement, errorClass);
  }
};

const setEventListeners = (formElement, { inputSelector, errorClass, submitButtonSelector, inactiveButtonClass }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonValidity(inputList, buttonElement, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (event) => {
      checkInputValidity(formElement, inputElement, errorClass);
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
  errorClass: 'popup__input-error_active',
}

enableValidation(validationConfig);