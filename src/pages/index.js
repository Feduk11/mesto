import './index.css';

import { initialCards, profileTitleSelector, profileSubtitleSelector, profileEditButton, profileAddButton, popupEditProfile, popupAddPlace, popupViewImage, placesContainer, validationConfig } from '../utils/constants.js';

import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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

const userInfo = new UserInfo({ profileTitleSelector, profileSubtitleSelector });

const handleSaveFormProfile = ({ 'user-name': userName, 'about': userAbout }) => {
  userInfo.setUserInfo(userName, userAbout);
  popupProfile.close();
};

const handleAddNewCard = ({ 'place-name': namePlace, 'link': urlPlace }) => {
  const card = { name: namePlace, link: urlPlace };
  cards.addItem(createCard(card));
  popupAddNewPlace.close();
};

const popupProfile = new PopupWithForm(popupEditProfile, handleSaveFormProfile);
popupProfile.setEventListeners();

const popupAddNewPlace = new PopupWithForm(popupAddPlace, handleAddNewCard);
popupAddNewPlace.setEventListeners();

const popupImg = new PopupWithImage(popupViewImage);
popupImg.setEventListeners();

const handleCardClick = (name, link) => {
  popupImg.open(name, link);
};

const createCard = (item) => {
  const card = new Card(item, '#place-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const cards = new Section({
  items: initialCards,
  renderer: (item) => {
    cards.addItem(createCard(item));
  }
}, placesContainer);

cards.renderItems();

const openProfilePopup = () => {
  const { userName, userAbout } = userInfo.getUserInfo();
  popupProfile.setInputValues({ 'user-name': userName, 'about': userAbout });
  formValidators['profileEdit'].resetValidation();
  popupProfile.open();
};

const openAddPlacePopup = () => {
  formValidators['addPlace'].resetValidation();
  popupAddNewPlace.open();
};

enableValidation(validationConfig);

profileEditButton.addEventListener('click', openProfilePopup);
profileAddButton.addEventListener('click', openAddPlacePopup);
