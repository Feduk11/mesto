import { 
  popupList, 
  profileTitle, 
  profileSubtitle, 
  profileEditButton, 
  profileAddButton, 
  popupEditProfile, 
  formEditProfile, 
  inputName, 
  inputAbout, 
  popupAddPlace, 
  formAddPlace, 
  inputNamePlace, 
  inputUrlPlace, 
  placesContainer, 
  popupViewImage, 
  popupImg, 
  popupTitleImg, 
  validationConfig 
} from './Constants.js'

import Card from './Card.js';
import FormValidator from './FormValidator.js';
import initialCards from './Data.js';

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleClosePopupByEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleClosePopupByEsc);
};

const handleClosePopupByEsc = event => {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

const handleCardClick = (name, link) => {
  popupImg.src = link;
  popupImg.alt = `${name} (фото)`;
  popupTitleImg.textContent = name;
  openPopup(popupViewImage);
};

const handleSaveFormProfile = event => {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputAbout.value;
  closePopup(popupEditProfile);
};

const createCard = (item) => {
  const card = new Card(item, '#place-template', handleCardClick);
  return card.generateCard();
};

initialCards.forEach(card => placesContainer.append(createCard(card)));

const handleAddNewCard = event => {
  event.preventDefault();
  const form = event.target;
  const card = {
    name: inputNamePlace.value,
    link: inputUrlPlace.value,
  };
  placesContainer.prepend(createCard(card));
  form.reset();
  closePopup(popupAddPlace);
};

const openProfilePopup = () => {
  inputName.value = profileTitle.textContent;
  inputAbout.value = profileSubtitle.textContent;
  formValidators['profileEdit'].resetValidation();
  openPopup(popupEditProfile);
};

const openAddPlacePopup = () => {
  formAddPlace.reset();
  formValidators['addPlace'].resetValidation();
  openPopup(popupAddPlace);
};

popupList.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target.classList.contains('popup_opened') ||
        event.target.classList.contains('popup__close-button')) {
      closePopup(popup);
    }
  });
});

profileEditButton.addEventListener('click', openProfilePopup);
profileAddButton.addEventListener('click', openAddPlacePopup);

formEditProfile.addEventListener('submit', handleSaveFormProfile);
formAddPlace.addEventListener('submit', handleAddNewCard);
